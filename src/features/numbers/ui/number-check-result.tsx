import ResultCard from "@/components/blocks/result-card";
import { formatClock } from "@/utils/formaters";
import { LayoutGridIcon, LocateFixedIcon, TimerIcon } from "lucide-react";
import { useNumberStore } from "../hooks/use-number-store";

const CheckResult = () => {
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

  return (
    <ResultCard
      title="Check Result"
      stats={stats}
      onClose={() => {
        reset();
      }}
    />
  );
};

export default CheckResult;
