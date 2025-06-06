import { formatClock } from "@/utils/formaters";
import { cn } from "@/utils/tailwind";
import {
  LayoutGridIcon,
  LocateFixedIcon,
  TimerIcon,
  XCircleIcon,
} from "lucide-react";
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

  return (
    <div className="bg-elevated flex flex-col justify-between rounded-sm">
      <div className="border-border mb-1 flex w-full items-center justify-between border-b px-2 py-2">
        <h2 className="text-md">
          <span className="text-text-muted">Check Result</span>
        </h2>
        <button
          onClick={() => {
            setMode("view");
            setErrorSquares([]);
          }}
          className="text-text-muted cursor-pointer underline transition-transform hover:brightness-125 active:rotate-180"
          aria-label="Refresh history"
          title="Refresh history"
        >
          <XCircleIcon className="inline h-5 w-5" />
        </button>
      </div>
      <div className="flex max-h-[300px] min-h-[250px] flex-col gap-2 overflow-y-auto rounded-sm p-2">
        <div className="text-text-muted flex items-center gap-1">
          <LayoutGridIcon className="h-6 w-6" />
          <span className="text-lg">
            Total Piece:{" "}
            <span className="text-text-main font-mono">{totalPieces}</span>
          </span>
        </div>
        <div className="text-text-muted flex items-center gap-1">
          <LocateFixedIcon className="h-6 w-6" />
          <span className="text-lg">
            Accuracy:{" "}
            <span
              className={cn(
                "text-text-main font-mono",
                accuracy < 0.3
                  ? "text-accent-red"
                  : accuracy < 0.7
                    ? "text-accent-yellow"
                    : "text-accent-green",
              )}
            >
              {(accuracy * 100).toFixed(2)}%
            </span>
          </span>
        </div>
        <div className="text-text-muted flex items-center gap-1">
          <TimerIcon className="h-6 w-6" />
          <span className="text-lg">
            Scan Time:{" "}
            <span className="text-text-main font-mono">
              {formatClock(scanDuration, true)}
            </span>
          </span>
        </div>
        <div className="text-text-muted flex items-center gap-1">
          <TimerIcon className="h-6 w-6" />
          <span className="text-lg">
            Recall Time:{" "}
            <span className="text-text-main font-mono">
              {formatClock(recallDuration, true)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckResult;
