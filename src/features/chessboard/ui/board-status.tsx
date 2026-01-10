"use client";

import ModeIndicator from "@/components/blocks/mode-indicator";
import { BrainIcon, FrownIcon, PartyPopperIcon, ScanEye } from "lucide-react";
import { useChessStore } from "../hooks/use-chess-store";

const BoardStatus = () => {
  const mode = useChessStore((state) => state.mode);
  const boardKey = useChessStore((state) => state.boardKey);
  const errorSquares = useChessStore((state) => state.errorSquares);

  const errorCount = errorSquares.length;

  const getStatus = () => {
    if (mode === "edit")
      return {
        text: `Recall Mode`,
        icon: <BrainIcon />,
        color: "bg-teal-400/20 text-teal-700",
      };
    if (mode === "check") {
      return errorCount > 0
        ? {
            text: `${errorCount} Mistakes!`,
            icon: <FrownIcon />,
            color: "bg-red-500/20 text-red-700",
          }
        : {
            text: "Correct!",
            icon: <PartyPopperIcon />,
            color: "bg-yellow-400/20 text-yellow-700",
          };
    }
    return {
      text: "Scan Mode",
      icon: <ScanEye />,
      color: "bg-sky-400/20 text-sky-700",
    };
  };

  return <ModeIndicator mode={getStatus()} activeKey={boardKey} />;
};

export default BoardStatus;
