"use client";

import { buttonClasses } from "@/components/pouf/Button";
import { Grid, Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { useSessionRecords } from "@/features/stats/hooks/use-session-records";
import {
  calculateSessionStats,
  formatRecallTime,
} from "@/features/stats/utils/stats";
import Link from "next/link";
import { useMemo } from "react";

export default function HomeProgress() {
  const { records, isLoading, error } = useSessionRecords();
  const stats = useMemo(() => calculateSessionStats(records), [records]);

  return (
    <section aria-label="Your progress">
      <Stack gap={4}>
        <Stack gap={1}>
          <Eyebrow>Your progress</Eyebrow>
          <Heading level={2}>Practice, tracked</Heading>
          <Text muted>Summaries from your saved practice sessions.</Text>
        </Stack>

        {isLoading ? (
          <Text muted>Loading saved progress…</Text>
        ) : error ? (
          <div role="alert">
            <Text>{error}</Text>
          </div>
        ) : records.length === 0 ? (
          <Card>
            <Row justify="between" align="top">
              <Stack gap={1}>
                <Heading level={3}>Your first session starts here</Heading>
                <Text muted>
                  Finish a game to see your session count, fastest recall, and
                  accuracy.
                </Text>
              </Stack>
              <Link
                href="/numbers"
                className={`${buttonClasses({ size: "sm" })} no-underline`}
              >
                Play Numbers
              </Link>
            </Row>
          </Card>
        ) : (
          <Grid cols={3} gap={4}>
            <ProgressCard
              title="Total sessions"
              value={stats.totalSessions.toLocaleString()}
            />
            <ProgressCard
              title="Fastest recall"
              value={
                stats.fastestRecall
                  ? formatRecallTime(stats.fastestRecall.recallMs)
                  : "—"
              }
              detail={stats.fastestRecall?.label}
            />
            <ProgressCard
              title="Item-weighted accuracy"
              value={
                stats.weightedAccuracy === null
                  ? "—"
                  : `${Math.round(stats.weightedAccuracy * 100)}%`
              }
            />
          </Grid>
        )}
      </Stack>
    </section>
  );
}

function ProgressCard({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail?: string;
}) {
  return (
    <Card variant="tight">
      <Stack gap={1}>
        <Text size="sm" muted>
          {title}
        </Text>
        <Heading level={2}>{value}</Heading>
        {detail && <Text size="sm" muted>{detail}</Text>}
      </Stack>
    </Card>
  );
}
