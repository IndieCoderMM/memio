"use client";

import ModeIndicator, { type Mode } from "@/components/blocks/mode-indicator";
import { BrainIcon, FrownIcon, PartyPopperIcon, ScanEye } from "lucide-react";
import { useCardStore } from "../hooks/use-card-store";

const Status = () => {
  const mode = useCardStore((s) => s.mode);
  const errors = useCardStore((s) => s.errors);
  const activeKey = useCardStore((s) => s.activeKey);

  const errorCount = errors ? Object.keys(errors).length : 0;

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

  return <ModeIndicator mode={getStatus()} activeKey={activeKey} />;
};

export default Status;
