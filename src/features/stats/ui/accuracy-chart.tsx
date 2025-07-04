"use client";
import { getSavedRecords } from "@/features/core/utils/record-storage";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const types: SessionRecord["type"][] = [
  "chessboard",
  "number",
  "binary",
  "cards",
] as const;

const AccuracyChart = () => {
  const [records, setRecords] = useState<Record<string, SessionRecord> | null>(
    null,
  );
  const [selectedType, setSelectedType] = useState("chessboard");

  useEffect(() => {
    const fetchRecords = () => {
      const savedRecords = getSavedRecords();
      setRecords(savedRecords);
    };

    fetchRecords();
  }, []);

  const chartData = useMemo(() => {
    if (!records) return [];

    return Object.values(records)
      .filter((d) => d.type === selectedType)
      .map((d) => ({
        timestamp: new Date(d.timestamp).toLocaleTimeString(),
        accuracy: d.accuracy * 100,
      }));
  }, [selectedType, records]);

  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <div className="mb-4">
        <h2 className="text-text-main text-lg font-semibold">Accuracy Chart</h2>
        <p className="text-text-muted text-sm">
          View your accuracy over time for different types of games.
        </p>
      </div>
      <div className="mb-2 flex justify-end gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              selectedType === type
                ? "bg-accent-green text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            labelStyle={{ color: "black" }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#34d399"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default AccuracyChart;
