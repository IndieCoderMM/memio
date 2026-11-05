"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <section className="border-border mx-auto mt-8 max-w-7xl border-t px-6 py-12">
      <div className="mb-6">
        <h2 className="text-foreground text-2xl font-bold">Your Progress</h2>
        <p className="text-muted-foreground mt-2">
          Summaries from your saved practice sessions.
        </p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground" role="status">
          Loading saved progress…
        </p>
      ) : error ? (
        <p className="text-destructive" role="alert">
          {error}
        </p>
      ) : records.length === 0 ? (
        <div className="bg-card border-border flex flex-col items-start gap-4 border p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-foreground font-semibold">
              Your progress starts with a practice session
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Finish a game to see your session count, fastest recall, and accuracy here.
            </p>
          </div>
          <Button asChild>
            <Link href="/numbers">Play Numbers</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProgressCard title="Total Sessions" value={stats.totalSessions.toLocaleString()} />
          <ProgressCard
            title="Fastest Recall"
            value={
              stats.fastestRecall
                ? formatRecallTime(stats.fastestRecall.recallMs)
                : "—"
            }
            detail={stats.fastestRecall?.label}
          />
          <ProgressCard
            title="Item-weighted Accuracy"
            value={
              stats.weightedAccuracy === null
                ? "—"
                : `${Math.round(stats.weightedAccuracy * 100)}%`
            }
          />
        </div>
      )}
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
