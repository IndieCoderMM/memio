"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSessionRecords } from "@/features/stats/hooks/use-session-records";
import AccuracyChart from "@/features/stats/ui/accuracy-chart";
import {
  calculateSessionStats,
  formatRecallTime,
} from "@/features/stats/utils/stats";
import { Flame, Trophy, Zap } from "lucide-react";
import { useMemo } from "react";
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

export default function StatsDashboard() {
  const { records, isLoading, error } = useSessionRecords();
  const stats = useMemo(() => calculateSessionStats(records), [records]);

  if (isLoading) {
    return (
      <p className="text-muted-foreground" role="status">
        Loading saved sessions…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-destructive" role="alert">
        {error}
      </p>
    );
  }

  const gameData = stats.games
    .filter((game) => game.totalSessions > 0)
    .map((game) => ({
      game: game.label,
      sessions: game.totalSessions,
      accuracy: game.weightedAccuracy === null ? null : game.weightedAccuracy * 100,
    }));
  const hasWeeklyActivity = stats.weeklyActivity.some((day) => day.sessions > 0);

  return (
    <div className="space-y-8">
      {records.length === 0 ? (
        <div className="bg-card border-border border p-5">
          <h2 className="text-foreground font-semibold">
            No saved sessions yet
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Finish a memory game and your progress will appear here.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Sessions"
          value={stats.totalSessions.toLocaleString()}
        />
        <SummaryCard
          title="Item-weighted Accuracy"
          value={
            stats.weightedAccuracy === null
              ? "—"
              : `${Math.round(stats.weightedAccuracy * 100)}%`
          }
        />
        <SummaryCard
          title="Fastest Recall"
          value={
            stats.fastestRecall
              ? formatRecallTime(stats.fastestRecall.recallMs)
              : "—"
          }
          detail={stats.fastestRecall?.label}
        />
        <SummaryCard
          title="Current Streak"
          value={stats.currentStreak.toLocaleString()}
          detail={stats.currentStreak === 1 ? "day" : "days"}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Accuracy History</CardTitle>
            <CardDescription>Item accuracy by game and session date</CardDescription>
          </CardHeader>
          <CardContent>
            <AccuracyChart records={records} />
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Game Breakdown</CardTitle>
            <CardDescription>Sessions and item-weighted accuracy by game</CardDescription>
          </CardHeader>
          <CardContent>
            {gameData.length === 0 ? (
              <EmptyChartState>No game sessions to break down yet.</EmptyChartState>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={gameData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="game" />
                  <YAxis yAxisId="sessions" allowDecimals={false} />
                  <YAxis
                    yAxisId="accuracy"
                    orientation="right"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "accuracy"
                        ? `${Number(value).toFixed(1)}%`
                        : value,
                      name === "accuracy" ? "Accuracy" : "Sessions",
                    ]}
                  />
                  <Bar
                    yAxisId="sessions"
                    dataKey="sessions"
                    name="Sessions"
                    fill="#8b5cf6"
                  />
                  <Line
                    yAxisId="accuracy"
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy"
                    stroke="#34d399"
                    strokeWidth={3}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>This Week</CardTitle>
            <CardDescription>Sessions each day, Monday to Sunday</CardDescription>
          </CardHeader>
          <CardContent>
            {!hasWeeklyActivity ? (
              <EmptyChartState>No saved sessions this week yet.</EmptyChartState>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={stats.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    formatter={(value) => [value, "Sessions"]}
                    labelFormatter={(label, payload) =>
                      payload[0]?.payload.date ?? label
                    }
                  />
                  <Bar dataKey="sessions" name="Sessions" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Milestones earned from your practice history</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.achievements.length === 0 ? (
              <p className="text-muted-foreground flex min-h-40 items-center justify-center text-center text-sm">
                No achievements earned yet. Keep practicing to reach a milestone.
              </p>
            ) : (
              <div className="space-y-3">
                {stats.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-primary/10 border-primary/20 flex items-center gap-3 border p-3"
                  >
                    <AchievementIcon id={achievement.id} />
                    <div>
                      <p className="text-foreground text-sm font-semibold">
                        {achievement.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail?: string;
}) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-foreground text-3xl font-bold">{value}</div>
        {detail ? (
          <p className="text-muted-foreground mt-1 text-xs">{detail}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function EmptyChartState({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground flex h-[260px] items-center justify-center text-center text-sm">
      {children}
    </p>
  );
}

function AchievementIcon({ id }: { id: string }) {
  if (id === "perfect-score") return <Trophy className="text-primary size-5" />;
  if (id === "speed-demon") return <Zap className="text-primary size-5" />;
  return <Flame className="text-primary size-5" />;
}
