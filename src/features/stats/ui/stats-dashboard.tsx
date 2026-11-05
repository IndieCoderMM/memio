"use client";

import { Badge, Blob } from "@/components/pouf/media";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Card, RowCard } from "@/components/pouf/surface";
import { Heading, Text } from "@/components/pouf/text";
import { Stat } from "@/components/pouf/readout";
import { useSessionRecords } from "@/features/stats/hooks/use-session-records";
import AccuracyChart from "@/features/stats/ui/accuracy-chart";
import {
  calculateSessionStats,
  formatRecallTime,
} from "@/features/stats/utils/stats";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";

const tick = { fill: "var(--muted)", fontSize: 12 };
const tooltipStyle = {
  backgroundColor: "var(--surface)",
  border: "none",
  borderRadius: "20px",
  boxShadow: "var(--pouf-card)",
  color: "var(--ink)",
};

export default function StatsDashboard() {
  const { records, isLoading, error } = useSessionRecords();
  const stats = useMemo(() => calculateSessionStats(records), [records]);

  if (isLoading) {
    return <Text muted>Loading saved sessions…</Text>;
  }

  if (error) {
    return (
      <Card variant="tight">
        <Text>{error}</Text>
      </Card>
    );
  }

  const gameData = stats.games
    .filter((game) => game.totalSessions > 0)
    .map((game) => ({
      game: game.label,
      sessions: game.totalSessions,
      accuracy:
        game.weightedAccuracy === null ? null : game.weightedAccuracy * 100,
    }));
  const hasWeeklyActivity = stats.weeklyActivity.some((day) => day.sessions > 0);

  return (
    <Stack gap={5}>
      {records.length === 0 && (
        <Card variant="tight">
          <Row gap={3} align="top">
            <Blob icon="info" tone="blue" size="sm" />
            <Stack gap={1}>
              <Heading level={3}>No saved sessions yet</Heading>
              <Text muted>
                Finish a memory game and your progress will appear here.
              </Text>
            </Stack>
          </Row>
        </Card>
      )}

      <Grid cols={4} gap={3}>
        <Stat
          label="Total sessions"
          value={stats.totalSessions.toLocaleString()}
          icon="history"
          tone="blue"
        />
        <Stat
          label="Item-weighted accuracy"
          value={
            stats.weightedAccuracy === null
              ? "—"
              : `${Math.round(stats.weightedAccuracy * 100)}%`
          }
          icon="target"
          tone="mint"
        />
        <Stat
          label="Fastest recall"
          value={
            stats.fastestRecall
              ? formatRecallTime(stats.fastestRecall.recallMs)
              : "—"
          }
          icon="clock"
          tone="purple"
          detail={stats.fastestRecall?.label}
        />
        <Stat
          label="Current streak"
          value={stats.currentStreak.toLocaleString()}
          icon="flame"
          tone="orange"
          detail={stats.currentStreak === 1 ? "day" : "days"}
        />
      </Grid>

      <Grid cols="sidebar" gap={4}>
        <ChartCard
          title="Accuracy history"
          description="Item accuracy by game and session date."
        >
          <AccuracyChart records={records} />
        </ChartCard>

        <ChartCard
          title="Game breakdown"
          description="Sessions and item-weighted accuracy by game."
        >
          {gameData.length === 0 ? (
            <EmptyChartState>No game sessions to break down yet.</EmptyChartState>
          ) : (
            <div className="h-[260px] min-w-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={gameData}>
                  <CartesianGrid stroke="rgba(113,96,155,0.2)" strokeDasharray="3 3" />
                  <XAxis dataKey="game" tick={tick} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="sessions" allowDecimals={false} tick={tick} axisLine={false} tickLine={false} />
                  <YAxis
                    yAxisId="accuracy"
                    orientation="right"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={tick}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name) => [
                      name === "accuracy" ? `${Number(value).toFixed(1)}%` : value,
                      name === "accuracy" ? "Accuracy" : "Sessions",
                    ]}
                  />
                  <Bar
                    yAxisId="sessions"
                    dataKey="sessions"
                    name="Sessions"
                    fill="var(--purple)"
                    radius={[12, 12, 0, 0]}
                  />
                  <Line
                    yAxisId="accuracy"
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy"
                    stroke="var(--mint)"
                    strokeWidth={3}
                    dot={{ fill: "var(--mint)", r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </Grid>

      <Grid cols="sidebar" gap={4}>
        <ChartCard
          title="This week"
          description="Sessions each day, Monday to Sunday."
        >
          {!hasWeeklyActivity ? (
            <EmptyChartState>No saved sessions this week yet.</EmptyChartState>
          ) : (
            <div className="h-[260px] min-w-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.weeklyActivity}>
                  <CartesianGrid stroke="rgba(113,96,155,0.2)" strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={tick} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={tick} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [value, "Sessions"]}
                    labelFormatter={(label, payload) =>
                      payload[0]?.payload.date ?? label
                    }
                  />
                  <Bar
                    dataKey="sessions"
                    name="Sessions"
                    fill="var(--orange)"
                    radius={[12, 12, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>

        <Card variant="tight">
          <Stack gap={3}>
            <Stack gap={1}>
              <Heading level={3}>Achievements</Heading>
              <Text size="sm" muted>
                Milestones earned from your practice history.
              </Text>
            </Stack>
            {stats.achievements.length === 0 ? (
              <EmptyChartState>
                Keep practicing to reach your first milestone.
              </EmptyChartState>
            ) : (
              <Stack gap={2}>
                {stats.achievements.map((achievement) => (
                  <RowCard key={achievement.id}>
                    <Row gap={3} align="top" wrap={false}>
                      <AchievementIcon id={achievement.id} />
                      <Stack gap={1}>
                        <Text>{achievement.name}</Text>
                        <Text size="sm" muted>{achievement.description}</Text>
                      </Stack>
                      <Badge tone="mint">Earned</Badge>
                    </Row>
                  </RowCard>
                ))}
              </Stack>
            )}
          </Stack>
        </Card>
      </Grid>
    </Stack>
  );
}

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card variant="tight">
      <Stack gap={3}>
        <Stack gap={1}>
          <Heading level={3}>{title}</Heading>
          <Text size="sm" muted>{description}</Text>
        </Stack>
        {children}
      </Stack>
    </Card>
  );
}

function EmptyChartState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-control bg-bg px-(--s4) text-center cushion-field">
      <Text size="sm" muted>{children}</Text>
    </div>
  );
}

function AchievementIcon({ id }: { id: string }) {
  if (id === "perfect-score") return <Blob icon="trophy" tone="yellow" size="sm" />;
  if (id === "speed-demon") return <Blob icon="live" tone="blue" size="sm" />;
  return <Blob icon="flame" tone="orange" size="sm" />;
}
