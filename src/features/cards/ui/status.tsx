"use client";

import { Encoder } from "@/utils/Encoder";
import { cn } from "@/utils/tailwind";
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
        color: "bg-teal-700",
      };
    if (mode === "check") {
      return errorCount > 0
        ? {
            text: `${errorCount} Mistakes!`,
            icon: <FrownIcon />,
            color: "bg-accent-red",
          }
        : {
            text: "Correct!",
            icon: <PartyPopperIcon />,
            color: "bg-yellow-400/80",
          };
    }
    return { text: "Scan Mode", icon: <ScanEye />, color: "bg-sky-700" };
  };

  const { text, icon, color } = getStatus();

  return (
    <div className="flex w-full items-center justify-between px-2">
      <div className={`flex items-center gap-2`}>
        <div className={cn("rounded-sm p-2", color)}>{icon}</div>
        <h2 className="text-text-main text-base font-medium uppercase">
          {text}
        </h2>
      </div>
      {activeKey ? (
        <div className={`flex items-center gap-2 rounded-xl`}>
          <h2 className="font-mono text-sm font-medium">
            Deck {Encoder.encodeId(Number(activeKey))}
          </h2>
        </div>
      ) : null}
    </div>
  );
};

export default Status;
