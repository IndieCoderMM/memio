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
            "flex size-10 items-center justify-center rounded-[12px] bg-surface text-center font-mono text-2xl font-bold text-ink cushion-field",
            error
              ? "ring-2 ring-pink"
              : isCorrect
                ? "ring-2 ring-mint"
                : "",
          )}
          num={Number(value) ?? 0}
          max={1}
          duration={1000}
        />
      ) : (
        <input
          ref={cbRef}
          className={cn(
            "size-10 rounded-[12px] bg-bg text-center font-mono text-2xl font-bold text-ink outline-none cushion-field focus-visible:cushion-field-focus",
            error
              ? "ring-2 ring-pink"
              : isCorrect
                ? "ring-2 ring-mint"
                : "",
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
        <span
          role="img"
          aria-label={`Incorrect: ${error}`}
          className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-pink font-mono text-[10px] font-black text-[var(--on-accent)] cushion-control"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export const EmptyCell = () => (
  <span className="size-10 rounded-[12px] bg-bg cushion-field" aria-hidden="true" />
);

export default Cell;
