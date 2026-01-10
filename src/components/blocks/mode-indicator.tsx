"use client";

import { Encoder } from "@/utils/Encoder";
import { cn } from "@/utils/tailwind";

type Mode = {
  text: string;
  icon: React.ReactNode;
  color: string;
};

const ModeIndicator = ({
  mode,
  activeKey,
}: {
  mode: Mode;
  activeKey: string | null;
}) => {
  const { text, icon, color } = mode;

  return (
    <div className="flex w-full items-center justify-between px-2">
      <div className={`flex items-center gap-2`}>
        <div className={cn("rounded-sm p-2", color)}>{icon}</div>
        <h2 className="text-base font-bold capitalize">{text}</h2>
        {activeKey ? (
          <span className="font-mono text-sm font-medium">
            [{Encoder.encodeId(Number(activeKey))}]
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ModeIndicator;
