import DigitConfigCard from "@/components/blocks/digit-config-card";
import { Segmented } from "@/components/pouf/Segmented";
import { configStorage } from "@/features/core/utils/config-storage";
import { useEffect } from "react";
import { useNumberStore } from "../hooks/use-number-store";
import type { NumberSequenceSource } from "../types";
import {
  generatePiDigits,
  generateRandomNumber,
} from "../utils/generate-random-num";

const NumberRandomizer = () => {
  const digits = useNumberStore((s) => s.digits);
  const source = useNumberStore((s) => s.source);
  const mode = useNumberStore((s) => s.mode);
  const setGeneratedNumbers = useNumberStore((s) => s.setGeneratedNumbers);
  const setDigits = useNumberStore((s) => s.setDigits);
  const setSource = useNumberStore((s) => s.setSource);
  const setActiveKey = useNumberStore((s) => s.setActiveKey);
  const reset = useNumberStore((s) => s.reset);

  useEffect(() => {
    const config = configStorage.getSetting("numbers");
    if (config?.total) {
      setDigits(config.total);
    }
    if (config?.source) {
      setSource(config.source);
    }
  }, [setDigits, setSource]);

  const handleSourceChange = (nextSource: NumberSequenceSource) => {
    if (nextSource === source) return;

    setSource(nextSource);
    reset();
    setActiveKey(null);
    configStorage.updateSetting("numbers", { source: nextSource });
  };

  const handleGenerate = () => {
    if (digits <= 0) {
      alert("Digits must be greater than 0");
      return;
    }

    const num =
      source === "pi"
        ? generatePiDigits(digits)
        : generateRandomNumber(digits);
    if (mode !== "view") {
      reset();
    }
    setGeneratedNumbers(num, source);
    setActiveKey(null);
    configStorage.updateSetting("numbers", { total: digits, source });
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-(--s3)">
      <div className="flex w-full items-center justify-between gap-(--s2)">
        <span className="font-black text-ink">Sequence</span>
        <Segmented
          label="Sequence source"
          value={source}
          onChange={handleSourceChange}
          options={[
            { value: "random", label: "Random" },
            { value: "pi", label: "π" },
          ]}
        />
      </div>
      <DigitConfigCard
        label={source === "pi" ? "Digits after decimal" : "Total Digits"}
        value={digits}
        onValueChange={setDigits}
        onRandomize={handleGenerate}
        actionLabel="Generate"
      />
    </div>
  );
};

export default NumberRandomizer;
