"use client";

import { Encoder } from "@/utils/Encoder";
import { cn } from "@/utils/tailwind";
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
            Num {Encoder.encodeId(Number(activeKey))}
          </h2>
        </div>
      ) : null}
    </div>
  );
};

export default NumberStatus;
