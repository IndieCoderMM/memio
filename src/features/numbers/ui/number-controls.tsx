"use client";

import Button from "@/components/blocks/button";
import { CalculatorIcon } from "lucide-react";
import { useNumberStore } from "../hooks/use-number-store";
import { diffNumbers } from "../utils/diff-numbers";
import CheckResult from "./number-check-result";
import NumberRandomizer from "./number-randomizer";
import NumberStatus from "./number-status";

const NumberControls = () => {
  const mode = useNumberStore((s) => s.mode);
  const generated = useNumberStore((s) => s.generated);
  const tried = useNumberStore((s) => s.tried);
  const setMode = useNumberStore((s) => s.setMode);
  const setErrorSquares = useNumberStore((s) => s.setErrorSquares);

  const handleRecall = () => {
    setMode("edit");
  };

  const handleCheck = () => {
    if (!generated || !tried) {
      alert("Please generate numbers first.");
      return;
    }

    const errors = diffNumbers(generated, tried);
    if (Object.keys(errors).length > 0) {
      setErrorSquares(errors);
    } else {
      setErrorSquares(null);
    }

    setMode("check");
  };

  return (
    <div className="bg-surface flex h-full w-full flex-col items-center">
      <div className="bg-elevated flex w-full items-center p-2">
        <NumberStatus />
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid w-full grid-cols-5">
          <div className="col-span-2 flex flex-col gap-2 p-2">
            <NumberRandomizer />
          </div>
          <div className="col-span-3 p-2">
            {mode === "check" ? <CheckResult /> : null}
          </div>
        </div>
      </div>
      <div className="mt-auto flex w-full justify-end p-4">
        {mode !== "edit" ? (
          <Button
            onClick={handleRecall}
            className="flex items-center justify-center gap-2"
          >
            <CalculatorIcon className="h-8 w-8" />
            Recall
          </Button>
        ) : (
          <Button
            onClick={handleCheck}
            className="flex items-center justify-center gap-2"
          >
            <CalculatorIcon className="h-8 w-8" />
            Check
          </Button>
        )}
      </div>
    </div>
  );
};

export default NumberControls;
