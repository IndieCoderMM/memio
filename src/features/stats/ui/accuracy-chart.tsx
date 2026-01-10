"use client";
import { Button } from "@/components/ui/button";
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
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 flex items-center justify-start gap-2">
        <span className="mr-4">Games: </span>
        {types.map((type) => (
          <Button
            size="sm"
            key={type}
            onClick={() => setSelectedType(type)}
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              selectedType === type ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            {type}
          </Button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={240}>
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
