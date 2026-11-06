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
import { useCardStore } from "../hooks/use-card-store";

const DeckCheckResult = () => {
  const mode = useCardStore((state) => state.mode);
  const errorCards = useCardStore((state) => state.errors);
  const generated = useCardStore((state) => state.generated);
  const scanDuration = useCardStore((state) => state.scanDuration);
  const recallDuration = useCardStore((state) => state.recallDuration);
  const reset = useCardStore((state) => state.reset);

  const errors = Object.keys(errorCards || {}).length;

  const accuracy = generated?.length
    ? (generated.length - errors) / generated.length
    : 0;

  const stats = [
    {
      icon: LayoutGridIcon,
      title: "Total Cards",
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

export default DeckCheckResult;
