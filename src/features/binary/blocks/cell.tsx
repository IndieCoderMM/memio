import AnimatedNumber from "@/components/blocks/animated-number";
import { cn } from "@/utils/tailwind";
import React from "react";

type CellProps = {
  value: string | undefined;
  readOnly?: boolean;
  animated?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  isCorrect?: boolean;
  cbRef?: (instance: HTMLInputElement | null) => void;
};

const Cell = ({
  value,
  readOnly,
  animated = false,
  onChange,
  error,
  isCorrect,
  cbRef,
}: CellProps) => {
  return (
    <div className="relative">
      {readOnly ? (
        <AnimatedNumber
          isStatic={!animated}
          className={cn(
            "border-border flex h-10 w-10 items-center justify-center rounded-sm border text-center font-mono text-2xl font-bold",
            error
              ? "border-accent-red"
              : isCorrect
                ? "border-accent-green"
                : "border-border",
          )}
          num={Number(value) ?? 0}
          max={1}
          duration={1000}
        />
      ) : (
        <input
          ref={cbRef}
          className={cn(
            "border-border bg-muted hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:ring-primary flex h-10 w-10 items-center justify-center rounded-sm border text-center font-mono text-2xl font-bold focus:outline-none focus-visible:ring-1",
            error
              ? "border-destructive"
              : isCorrect
                ? "border-accent-green"
                : "border-border",
          )}
          maxLength={1}
          type="number"
          value={value}
          readOnly={readOnly}
          min={0}
          max={1}
          onChange={onChange}
        />
      )}
      {error && (
        <span className="bg-destructive absolute -top-1 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full font-mono text-[10px] text-white">
          {error}
        </span>
      )}
    </div>
  );
};

export const EmptyCell = () => (
  <span className="border-border bg-card flex h-10 w-10 items-center justify-center rounded-sm border text-center font-mono text-2xl font-bold" />
);

export default Cell;
