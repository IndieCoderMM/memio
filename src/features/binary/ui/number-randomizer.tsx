import DigitConfigCard from "@/components/blocks/digit-config-card";
import { configStorage } from "@/features/core/utils/config-storage";
import { useEffect } from "react";
import { useNumberStore } from "../hooks/use-number-store";
import { generateRandomBinary } from "../utils/generate-random-num";

const NumberRandomizer = () => {
  const digits = useNumberStore((s) => s.digits);
  const mode = useNumberStore((s) => s.mode);
  const setGeneratedNumbers = useNumberStore((s) => s.setGeneratedNumbers);
  const setDigits = useNumberStore((s) => s.setDigits);
  const setActiveKey = useNumberStore((s) => s.setActiveKey);
  const reset = useNumberStore((s) => s.reset);

  useEffect(() => {
    const config = configStorage.getSetting("numbers");
    if (config?.total) {
      setDigits(config.total);
    }
  }, [setDigits]);

  const handleGenerateRandom = () => {
    if (digits <= 0) {
      alert("Digits must be greater than 0");
      return;
    }

    const num = generateRandomBinary(digits);
    if (mode !== "view") {
      reset();
    }
    setGeneratedNumbers(num);
    setActiveKey(null);
    configStorage.updateSetting("numbers", { total: digits });
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <DigitConfigCard
        label="Total Digits"
        value={digits}
        onValueChange={setDigits}
        onRandomize={handleGenerateRandom}
      />
    </div>
  );
};

export default NumberRandomizer;
