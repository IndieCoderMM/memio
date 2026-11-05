"use client";

import { Button } from "@/components/ui/button";
import { games } from "@/features/stats/utils/stats";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AccuracyChartProps = {
  records: SessionRecord[];
};

export default function AccuracyChart({ records }: AccuracyChartProps) {
  const [selectedType, setSelectedType] = useState<SessionRecord["type"]>(
    "chessboard",
  );

  const chartData = useMemo(
    () =>
      records
        .filter((record) => record.type === selectedType)
        .sort((left, right) => left.timestamp - right.timestamp)
        .map((record) => ({
          timestamp: new Date(record.timestamp).toLocaleDateString(),
          accuracy: record.accuracy * 100,
        })),
    [records, selectedType],
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground mr-2 text-sm">Game:</span>
        {games.map((game) => (
          <Button
            size="sm"
            variant={selectedType === game.type ? "default" : "outline"}
            key={game.type}
            onClick={() => setSelectedType(game.type)}
            aria-pressed={selectedType === game.type}
          >
            {game.label}
          </Button>
        ))}
      </div>
      {chartData.length === 0 ? (
        <p className="text-muted-foreground flex h-60 items-center justify-center text-sm">
          No saved {games.find((game) => game.type === selectedType)?.label}{" "}
          sessions to chart yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              labelStyle={{ color: "black" }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="Accuracy"
              stroke="#34d399"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
