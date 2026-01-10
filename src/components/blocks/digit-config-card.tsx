import { Button } from "@/components/ui/button";
import { DicesIcon, MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

const DigitConfigCard = ({
  label,
  value,
  onValueChange,
  onRandomize,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  onRandomize: () => void;
  min?: number;
  max?: number;
}) => {
  const handlePieceChange = (step: number) => () => {
    let newValue = (isNaN(value) ? 0 : value) + step;
    if (newValue < min) {
      newValue = min;
    }
    if (newValue > max) {
      newValue = max;
    }
    onValueChange(newValue);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    const newValue = Math.max(min, Math.min(max, parseInt(val, 10)));
    onValueChange(newValue);
  };

  const onInputBlur = () => {
    if (isNaN(value)) {
      onValueChange(min);
    }
  };

  return (
    <div className="bg-card border-border mb-4 flex w-full flex-col gap-2 rounded-sm border p-2">
      <h2 className="text-muted-foreground text-center text-sm font-semibold">
        {label}
      </h2>
      <div className="mb-4 flex w-full justify-center gap-2 rounded-sm">
        <Button
          aria-label="Decrease"
          title="Decrease"
          onClick={handlePieceChange(-1)}
          size="icon"
          variant="ghost"
        >
          <MinusIcon className="h-5 w-5" />
        </Button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={onInputChange}
          onBlur={onInputBlur}
          className="bg-background border-border focus-visible:ring-primary block h-9 w-full border text-center font-mono text-xl font-semibold focus-within:ring-1 focus-within:outline-none"
        />
        <Button
          aria-label="Increase"
          title="Increase"
          onClick={handlePieceChange(1)}
          size="icon"
          variant="ghost"
        >
          <PlusIcon className="h-5 w-5" />
        </Button>
      </div>
      <Button variant="secondary" onClick={onRandomize} className="w-full">
        <DicesIcon className="h-5 w-5" />
        <span className="inline-block w-[50%]">Randomize</span>
      </Button>
    </div>
  );
};

export default DigitConfigCard;
