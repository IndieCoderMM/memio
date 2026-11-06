"use client";

import { GameDialog } from "@/components/layouts/game-dialog";
import ResultCard from "@/components/blocks/result-card";
import { formatClock } from "@/utils/formaters";
import {
  LayoutGridIcon,
  LocateFixedIcon,
  SearchCheckIcon,
  TimerIcon,
} from "lucide-react";
import { useNumberStore } from "../hooks/use-number-store";

const CheckResult = () => {
  const mode = useNumberStore((state) => state.mode);
  const errorSquares = useNumberStore((state) => state.errorSquares);
  const generated = useNumberStore((state) => state.generated);
  const scanDuration = useNumberStore((state) => state.scanDuration);
  const recallDuration = useNumberStore((state) => state.recallDuration);
  const reset = useNumberStore((state) => state.reset);

  const errors = Object.keys(errorSquares || {}).length;

  const accuracy = generated?.length
    ? (generated.length - errors) / generated.length
    : 0;

  const stats = [
    {
      icon: LayoutGridIcon,
      title: "Total Digits",
      value: generated?.length ?? 0,
    },
    {
      icon: LocateFixedIcon,
      title: "Accuracy",
      value: (accuracy * 100).toFixed(2),
    },
    {
      icon: TimerIcon,
      title: "Scan Time",
      value: formatClock(scanDuration, true),
    },
    {
      icon: TimerIcon,
      title: "Recall Time",
      value: formatClock(recallDuration, true),
    },
  ];

  if (mode !== "check") return null;

  return (
    <GameDialog
      icon={<SearchCheckIcon size={18} />}
      label="Open check results"
      title="Check result"
    >
      <ResultCard
        title="Check Result"
        stats={stats}
        onClose={() => {
          reset();
        }}
      />
    </GameDialog>
  );
};

export default CheckResult;
