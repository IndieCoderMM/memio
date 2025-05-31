"use client";

import { CheckCircle, Eye, Pencil, XCircle } from "lucide-react";
import { useChessStore } from "../hooks/use-chess-store";

const BoardStatus = () => {
  const mode = useChessStore((state) => state.mode);
  const boardKey = useChessStore((state) => state.boardKey);
  const errorSquares = useChessStore((state) => state.errorSquares);

  const errorCount = errorSquares.length;

  const getStatus = () => {
    if (mode === "edit")
      return {
        text: `Recalling Board #${boardKey}`,
        icon: <Pencil />,
        color: "bg-accent-green",
      };
    if (mode === "check") {
      return errorCount > 0
        ? {
            text: `Mistakes: ${errorCount}`,
            icon: <XCircle />,
            color: "bg-accent-red",
          }
        : {
            text: "Correct!",
            icon: <CheckCircle />,
            color: "bg-accent-yellow",
          };
    }
    return { text: "Viewing", icon: <Eye />, color: "bg-accent-blue" };
  };

  const { text, icon, color } = getStatus();

  return (
    <div
      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-white ${color} shadow-md`}
    >
      <div className="">{icon}</div>
      <h2 className="text-sm font-medium">{text}</h2>
    </div>
  );
};

export default BoardStatus;
