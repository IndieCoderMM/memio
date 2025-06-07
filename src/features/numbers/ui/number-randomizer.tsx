import Button from "@/components/blocks/button";
import { DicesIcon, MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { useNumberStore } from "../hooks/use-number-store";
import { generateRandomNumber } from "../utils/generate-random-num";

const NumberRandomizer = () => {
  const digits = useNumberStore((s) => s.digits);
  const setGeneratedNumbers = useNumberStore((s) => s.setGeneratedNumbers);
  const setDigits = useNumberStore((s) => s.setDigits);

  const handleGenerateRandom = () => {
    if (digits <= 0) {
      alert("Digits must be greater than 0");
      return;
    }

    const num = generateRandomNumber(digits);
    setGeneratedNumbers(num);
  };

  const handlePieceChange = (step: number) => () => {
    let newDigits = (isNaN(digits) ? 0 : digits) + step;
    if (newDigits < 0) {
      newDigits = 0;
    }
    if (newDigits > 100) {
      newDigits = 100;
    }

    setDigits(newDigits);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const newDigits = Math.max(0, Math.min(100, parseInt(value, 10)));
    setDigits(newDigits);
  };

  const onInputBlur = () => {
    if (isNaN(digits)) {
      setDigits(0);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="bg-elevated shadow-block flex w-full items-center justify-center gap-2 rounded-sm p-2">
        <button
          className="text-text-muted shadow-block cursor-pointer rounded-md bg-[#26252280] px-4 py-2 transition-colors hover:brightness-125"
          aria-label="Remove Number"
          title="Remove Number"
          onClick={handlePieceChange(-1)}
        >
          <MinusIcon className="h-5 w-5" />
        </button>
        <div className="text-center">
          <input
            type="number"
            min={0}
            max={100}
            value={digits}
            onChange={onInputChange}
            onBlur={onInputBlur}
            className="text-text-main focus-within:ring-border block h-10 w-16 text-center font-mono text-xl font-semibold focus-within:ring-1 focus-within:outline-none"
          />
          <span className="text-text-muted block text-xs">Digits</span>
        </div>
        <button
          className="text-text-muted shadow-block cursor-pointer rounded-md bg-[#26252280] px-4 py-2 transition-colors hover:brightness-125"
          aria-label="Add Number"
          title="Add Number"
          onClick={handlePieceChange(1)}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <Button
        onClick={handleGenerateRandom}
        className="flex items-center justify-center gap-2"
      >
        <DicesIcon className="h-8 w-8" />
        Randomize
      </Button>
    </div>
  );
};

export default NumberRandomizer;
