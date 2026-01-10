"use client";

import ModeIndicator from "@/components/blocks/mode-indicator";
import { BrainIcon, FrownIcon, PartyPopperIcon, ScanEye } from "lucide-react";
import { useCardStore } from "../hooks/use-card-store";

const Status = () => {
  const mode = useCardStore((s) => s.mode);
  const errors = useCardStore((s) => s.errors);
  const activeKey = useCardStore((s) => s.activeKey);

  const errorCount = errors ? Object.keys(errors).length : 0;

  const getStatus = () => {
    if (mode === "edit")
      return {
        text: `Recall Mode`,
        icon: <BrainIcon />,
        color: "bg-teal-500/20 text-teal-700",
      };
    if (mode === "check") {
      return errorCount > 0
        ? {
            text: `${errorCount} Mistakes!`,
            icon: <FrownIcon />,
            color: "bg-accent-red/20 text-red-700",
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
      color: "bg-sky-700/20 text-sky-700",
    };
  };

  return <ModeIndicator mode={getStatus()} activeKey={activeKey} />;
};

export default Status;
