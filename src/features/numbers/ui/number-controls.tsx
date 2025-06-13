"use client";

import Button from "@/components/blocks/button";
import ControlPanelLayout from "@/components/layouts/control-panel";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import { CalculatorIcon } from "lucide-react";
import { useRef } from "react";
import { useNumberStore } from "../hooks/use-number-store";
import { diffNumbers } from "../utils/diff-numbers";
import CheckResult from "./number-check-result";
import NumberRandomizer from "./number-randomizer";
import NumberStatus from "./number-status";

const NumberControls = () => {
  const mode = useNumberStore((s) => s.mode);
  const generated = useNumberStore((s) => s.generated);
  const tried = useNumberStore((s) => s.tried);
  const scanRef = useRef<TimerClockRef>(null);
  const recallRef = useRef<TimerClockRef>(null);
  const setMode = useNumberStore((s) => s.setMode);
  const setErrorSquares = useNumberStore((s) => s.setErrorSquares);
  const setScanDuration = useNumberStore((s) => s.setScanDuration);
  const setRecallDuration = useNumberStore((s) => s.setRecallDuration);
  const reset = useNumberStore((s) => s.reset);

  const onRecall = () => {
    if (!generated) {
      alert("Please generate numbers first.");
      return;
    }

    setMode("edit");
    const duration = scanRef.current?.getDuration() || 0;
    setScanDuration(duration);
  };

  const onCheck = () => {
    if (!generated || !tried) {
      alert("Please enter numbers first.");
      return;
    }

    const errors = diffNumbers(generated, tried);
    if (Object.keys(errors).length > 0) {
      setErrorSquares(errors);
    } else {
      setErrorSquares(null);
    }

    setMode("check");
    const duration = recallRef.current?.getDuration() || 0;
    setRecallDuration(duration);
  };

  const onReset = () => {
    reset();
  };

  return (
    <ControlPanelLayout renderStatus={() => <NumberStatus />}>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid w-full grid-cols-5 place-items-start items-start">
          {mode !== "edit" ? (
            <div className="col-span-2 flex flex-col gap-2 p-2">
              <TimerClock key="Scan timer" ref={scanRef} />

              <NumberRandomizer />
            </div>
          ) : (
            <div className="col-span-2 flex flex-col gap-2 p-2">
              <TimerClock key="Recall timer" ref={recallRef} />
            </div>
          )}
          <div className="col-span-3 p-2">
            {mode === "check" ? <CheckResult /> : null}
          </div>
        </div>
      </div>
      <div className="mt-auto flex w-full justify-end gap-4 p-4">
        {mode !== "edit" ? (
          <Button
            onClick={onRecall}
            className="flex items-center justify-center gap-2"
          >
            <CalculatorIcon className="h-8 w-8" />
            Recall
          </Button>
        ) : (
          <>
            <Button
              onClick={onReset}
              variant="secondary"
              className="flex items-center justify-center gap-2"
            >
              <CalculatorIcon className="h-8 w-8" />
              Reset
            </Button>
            <Button
              onClick={onCheck}
              className="flex items-center justify-center gap-2"
            >
              <CalculatorIcon className="h-8 w-8" />
              Check
            </Button>
          </>
        )}
      </div>
    </ControlPanelLayout>
  );
};

export default NumberControls;
