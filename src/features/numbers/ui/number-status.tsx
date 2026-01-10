"use client";

import ModeIndicator from "@/components/blocks/mode-indicator";
import { BrainIcon, FrownIcon, PartyPopperIcon, ScanEye } from "lucide-react";
import { useNumberStore } from "../hooks/use-number-store";

const NumberStatus = () => {
  const mode = useNumberStore((state) => state.mode);
  const activeKey = useNumberStore((state) => state.activeKey);
  const errors = useNumberStore((state) => state.errorSquares);

  const errorCount = errors ? Object.keys(errors).length : 0;

  const getStatus = () => {
    if (mode === "edit")
      return {
        text: `Recall Mode`,
        icon: <BrainIcon />,
        color: "text-teal-300 bg-teal-500/40",
      };
    if (mode === "check") {
      return errorCount > 0
        ? {
            text: `${errorCount} Mistakes!`,
            icon: <FrownIcon />,
            color: "text-red-400 bg-accent-red/30",
          }
        : {
            text: "Correct!",
            icon: <PartyPopperIcon />,
            color: "text-yellow-300 bg-yellow-500/40",
          };
    }
    return {
      text: "Scan Mode",
      icon: <ScanEye />,
      color: "text-sky-300 bg-accent/40",
    };
  };

  return <ModeIndicator mode={getStatus()} activeKey={activeKey} />;
};

export default NumberStatus;
