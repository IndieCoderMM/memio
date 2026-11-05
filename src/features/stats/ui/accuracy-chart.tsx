"use client";

import { buttonClasses } from "@/components/pouf/Button";
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

const tick = { fill: "var(--muted)", fontSize: 12 };
const tooltipStyle = {
  backgroundColor: "var(--surface)",
  border: "none",
  borderRadius: "16px",
  boxShadow: "var(--pouf-card)",
  color: "var(--ink)",
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
  const selectedGame = games.find((game) => game.type === selectedType);

  return (
    <div className="w-full min-w-0">
      <div className="mb-(--s4) flex flex-wrap items-center gap-(--s2)">
        <span className="mr-(--s1) text-[13px] font-bold text-muted">Game</span>
        {games.map((game) => {
          const selected = selectedType === game.type;
          return (
            <button
              key={game.type}
              type="button"
              className={buttonClasses({
                size: "sm",
                tone: selected ? "purple" : "blue",
                variant: selected ? "solid" : "quiet",
              })}
              onClick={() => setSelectedType(game.type)}
              aria-pressed={selected}
            >
              {game.label}
            </button>
          );
        })}
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[240px] items-center justify-center rounded-control bg-bg px-(--s4) text-center cushion-field">
          <span className="text-[13px] font-bold text-muted">
            No saved {selectedGame?.label} sessions to chart yet.
          </span>
        </div>
      ) : (
        <div className="h-[240px] min-w-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke="rgba(113,96,155,0.2)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="timestamp"
                tick={tick}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={tick}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [`${Number(value).toFixed(1)}%`, "Accuracy"]}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                name="Accuracy"
                stroke="var(--mint)"
                strokeWidth={3}
                dot={{ fill: "var(--mint)", r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
