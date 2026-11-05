"use client";

import ModeIndicator, { type Mode } from "@/components/blocks/mode-indicator";
import { BrainIcon, FrownIcon, PartyPopperIcon, ScanEye } from "lucide-react";
import { useChessStore } from "../hooks/use-chess-store";

const BoardStatus = () => {
  const mode = useChessStore((state) => state.mode);
  const boardKey = useChessStore((state) => state.boardKey);
  const errorSquares = useChessStore((state) => state.errorSquares);

  const errorCount = errorSquares.length;

  const getStatus = (): Mode => {
    if (mode === "edit")
      return {
        text: `Recall Mode`,
        icon: <BrainIcon />,
        tone: "purple",
      };
    if (mode === "check") {
      return errorCount > 0
        ? {
            text: `${errorCount} Mistakes!`,
            icon: <FrownIcon />,
            tone: "down",
          }
        : {
            text: "Correct!",
            icon: <PartyPopperIcon />,
            tone: "up",
          };
    }
    return {
      text: "Scan Mode",
      icon: <ScanEye />,
      tone: "blue",
    };
  };

  return <ModeIndicator mode={getStatus()} activeKey={boardKey} />;
};

export default BoardStatus;
