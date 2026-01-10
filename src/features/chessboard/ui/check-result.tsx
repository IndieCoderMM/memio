import ResultCard from "@/components/blocks/result-card";
import { formatClock } from "@/utils/formaters";
import { LayoutGridIcon, LocateFixedIcon, TimerIcon } from "lucide-react";
import { useChessStore } from "../hooks/use-chess-store";

const CheckResult = () => {
  const board = useChessStore((state) => state.board);
  const scanDuration = useChessStore((state) => state.scanDuration);
  const recallDuration = useChessStore((state) => state.recallDuration);
  const errorSquares = useChessStore((state) => state.errorSquares);
  const setMode = useChessStore((state) => state.setMode);
  const setErrorSquares = useChessStore((state) => state.setErrorSquares);

  const totalPieces = Object.keys(board).length;

  const accuracy = totalPieces
    ? (totalPieces - errorSquares.length) / totalPieces
    : 0;

  const stats = [
    {
      icon: LayoutGridIcon,
      title: "Total Pieces",
      value: totalPieces,
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
        setMode("view");
        setErrorSquares([]);
      }}
    />
  );
};

export default CheckResult;
