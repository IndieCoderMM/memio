"use client";

import { useEffect, useRef } from "react";
import Cell, { EmptyCell } from "../blocks/cell";
import { useNumberStore } from "../hooks/use-number-store";

const NumberBoard = () => {
  const cells = useRef<Array<HTMLInputElement | null>>([]);
  const generated = useNumberStore((s) => s.generated);
  const errors = useNumberStore((s) => s.errorSquares);
  const tried = useNumberStore((s) => s.tried);
  const mode = useNumberStore((s) => s.mode);
  const setTriedNumbers = useNumberStore((s) => s.setTriedNumbers);

  const emptyCells = 100 - (generated?.length ?? 0);

  useEffect(() => {
    if (mode === "edit") {
      if (cells.current.length > 0) {
        cells.current[0]?.focus();
      }
    }
  }, [mode]);

  const handleChange =
    (index: number): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 1) {
        value = value[value.length - 1]; // Keep only the last digit
      }

      const newTried = tried ? [...tried] : Array(generated?.length).fill("");
      newTried[index] = value;
      setTriedNumbers(newTried);

      if (value && cells.current[index + 1]) {
        requestAnimationFrame(() => {
          cells.current[index + 1]?.focus();
        });
      } else if (value === "" && cells.current[index - 1]) {
        cells.current[index - 1]?.focus();
      }
    };

  return (
    <div className="grid grid-cols-10 place-items-center gap-1">
      {generated?.map((digit, index) => {
        const num = mode === "edit" ? tried?.[index] : digit;
        return (
          <Cell
            key={`${num}-${index}`}
            value={num}
            readOnly={mode !== "edit"}
            cbRef={(el) => (cells.current[index] = el)}
            onChange={handleChange(index)}
            error={
              errors?.[index] && mode === "check" ? errors[index] : undefined
            }
            isCorrect={mode === "check" && !errors?.[index]}
          />
        );
      })}
      {Array.from({ length: emptyCells }).map((_, i) => (
        <EmptyCell key={i} />
      ))}
    </div>
  );
};

export default NumberBoard;
