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
        />
      ) : (
        <input
          ref={cbRef}
          className={cn(
            "border-border flex h-10 w-10 items-center justify-center rounded-sm border text-center font-mono text-2xl font-bold",
            error
              ? "border-accent-red"
              : isCorrect
                ? "border-accent-green"
                : "border-border",
          )}
          maxLength={1}
          type="number"
          value={value}
          readOnly={readOnly}
          min={0}
          max={9}
          onChange={onChange}
        />
      )}
      {error && (
        <span className="bg-accent-red absolute -top-1 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white">
          {error}
        </span>
      )}
    </div>
  );
};

export const EmptyCell = () => (
  <span className="border-border bg-border flex h-10 w-10 items-center justify-center rounded-sm border text-center font-mono text-2xl font-bold" />
);

export default Cell;
