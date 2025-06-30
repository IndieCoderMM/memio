import Button from "@/components/blocks/button";
import { configStorage } from "@/features/core/utils/config-storage";
import { DicesIcon, MinusIcon, PlusIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useCardStore } from "../hooks/use-card-store";
import { generateRandomDeck } from "../utils/gen-random-deck";

const CardRandomizer = () => {
  const digits = useCardStore((s) => s.count);
  const mode = useCardStore((s) => s.mode);
  const setGeneratedCards = useCardStore((s) => s.setGeneratedCards);
  const setDigits = useCardStore((s) => s.setCount);
  const setActiveKey = useCardStore((s) => s.setActiveKey);
  const reset = useCardStore((s) => s.reset);

  useEffect(() => {
    const config = configStorage.getSetting("numbers");
    if (config?.totalDigits) {
      setDigits(config.totalDigits);
    }
  }, [setDigits]);

  const handleGenerateRandom = () => {
    if (digits <= 0) {
      alert("Digits must be greater than 0");
      return;
    }

    const num = generateRandomDeck(digits);
    if (mode !== "view") {
      reset();
    }
    setGeneratedCards(num);
    setActiveKey(null);
    configStorage.updateSetting("numbers", { totalDigits: digits });
  };

  const handlePieceChange = (step: number) => () => {
    let newDigits = (isNaN(digits) ? 0 : digits) + step;
    if (newDigits < 0) {
      newDigits = 0;
    }
    if (newDigits > 52) {
      newDigits = 52;
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
          aria-label="Remove Card"
          title="Remove Card"
          onClick={handlePieceChange(-1)}
        >
          <MinusIcon className="h-5 w-5" />
        </button>
        <div className="text-center">
          <input
            type="number"
            min={0}
            max={52}
            value={digits}
            onChange={onInputChange}
            onBlur={onInputBlur}
            className="text-text-main focus-within:ring-border block h-10 w-16 text-center font-mono text-xl font-semibold focus-within:ring-1 focus-within:outline-none"
          />
          <span className="text-text-muted block text-xs">Cards</span>
        </div>
        <button
          className="text-text-muted shadow-block cursor-pointer rounded-md bg-[#26252280] px-4 py-2 transition-colors hover:brightness-125"
          aria-label="Add Card"
          title="Add Card"
          onClick={handlePieceChange(1)}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <Button
        variant="secondary"
        onClick={handleGenerateRandom}
        className="flex items-center justify-center gap-2"
      >
        <DicesIcon className="h-6 w-6" />
        Randomize
      </Button>
    </div>
  );
};

export default CardRandomizer;
