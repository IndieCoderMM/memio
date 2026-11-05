import { Button, IconButton } from "@/components/pouf/Button";
import { Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Text } from "@/components/pouf/text";
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
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    onValueChange(newValue);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    const next = Math.max(min, Math.min(max, parseInt(value, 10)));
    onValueChange(next);
  };

  const onInputBlur = () => {
    if (isNaN(value)) onValueChange(min);
  };

  return (
    <Card variant="tight">
      <Stack gap={3}>
        <Row justify="between">
          <label htmlFor="game-count" className="font-black text-ink">
            {label}
          </label>
          <Text size="sm" muted>
            {min}–{max}
          </Text>
        </Row>
        <Row gap={2} wrap={false}>
          <IconButton
            icon={<MinusIcon size={18} />}
            label={`Decrease ${label.toLowerCase()}`}
            onClick={handlePieceChange(-1)}
            variant="quiet"
          />
          <input
            id="game-count"
            aria-label={label}
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={onInputChange}
            onBlur={onInputBlur}
            className="min-w-0 flex-1 rounded-control bg-bg px-(--s3) py-(--s2) text-center font-pouf text-[22px] font-black text-ink outline-none cushion-field focus:cushion-field-focus"
          />
          <IconButton
            icon={<PlusIcon size={18} />}
            label={`Increase ${label.toLowerCase()}`}
            onClick={handlePieceChange(1)}
            variant="quiet"
          />
        </Row>
        <Button tone="mint" block onClick={onRandomize}>
          <DicesIcon size={18} />
          Randomize
        </Button>
      </Stack>
    </Card>
  );
};

export default DigitConfigCard;
