import DigitConfigCard from "@/components/blocks/digit-config-card";
import { configStorage } from "@/features/core/utils/config-storage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCardStore } from "../hooks/use-card-store";
import { generateRandomDeck } from "../utils/gen-random-deck";

const CardRandomizer = () => {
  const count = useCardStore((s) => s.count);
  const mode = useCardStore((s) => s.mode);
  const setGeneratedCards = useCardStore((s) => s.setGeneratedCards);
  const setCount = useCardStore((s) => s.setCount);
  const setActiveKey = useCardStore((s) => s.setActiveKey);
  const reset = useCardStore((s) => s.reset);

  useEffect(() => {
    const config = configStorage.getSetting("cards");
    if (config?.total) {
      setCount(config.total);
    }
  }, [setCount]);

  const handleGenerateRandom = () => {
    if (count <= 0) {
      toast.info("Digits must be greater than 0");
      return;
    }

    const num = generateRandomDeck(count);
    if (mode !== "view") {
      reset();
    }
    setGeneratedCards(num);
    setActiveKey(null);
    configStorage.updateSetting("cards", { total: count });
  };

  const onInputChange = (val: number) => {
    setCount(val);
  };

  return (
    <DigitConfigCard
      label="Total Cards"
      value={count}
      onValueChange={onInputChange}
      min={0}
      max={52}
      onRandomize={handleGenerateRandom}
    />
  );
};

export default CardRandomizer;
