"use client";

import Button from "@/components/blocks/button";
import ControlPanelLayout from "@/components/layouts/control-panel";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import { FlameIcon, SearchCheckIcon, ThumbsDownIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNumberStore } from "../hooks/use-number-store";
import { diffNumbers } from "../utils/diff-numbers";
import { saveNum } from "../utils/storage";
import CheckResult from "./number-check-result";
import NumberHistory from "./number-history";
import NumberRandomizer from "./number-randomizer";
import NumberStatus from "./number-status";

const NumberControls = () => {
  const mode = useNumberStore((s) => s.mode);
  const activeKey = useNumberStore((s) => s.activeKey);
  const generated = useNumberStore((s) => s.generated);
  const tried = useNumberStore((s) => s.tried);
  const scanRef = useRef<TimerClockRef>(null);
  const recallRef = useRef<TimerClockRef>(null);
  const setMode = useNumberStore((s) => s.setMode);
  const setErrorSquares = useNumberStore((s) => s.setErrorSquares);
  const setScanDuration = useNumberStore((s) => s.setScanDuration);
  const setRecallDuration = useNumberStore((s) => s.setRecallDuration);
  const setActiveKey = useNumberStore((s) => s.setActiveKey);
  const reset = useNumberStore((s) => s.reset);

  const onRecall = () => {
    if (!generated) {
      toast.info("Please generate numbers first");
      return;
    }

    if (!activeKey) {
      const key = saveNum(generated.join(""));
      setActiveKey(key);
    }

    setMode("edit");
    const duration = scanRef.current?.getDuration() || 0;
    setScanDuration(duration);
  };

  const onCheck = () => {
    if (!generated || !tried) {
      toast.error(
        generated
          ? "Please fill in memorized numbers"
          : "Please generate numbers first.",
      );
      return;
    }

    const errors = diffNumbers(generated, tried);
    if (Object.keys(errors).length > 0) {
      setErrorSquares(errors);
      toast.error(`You made ${Object.keys(errors).length} mistakes!`);
    } else {
      setErrorSquares(null);
      toast.success(`You got all ${generated.length} numbers right!`);
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
        <div className="grid w-full grid-cols-5">
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
            {mode === "check" ? (
              <CheckResult />
            ) : mode === "view" ? (
              <NumberHistory />
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-auto flex w-full justify-end gap-4 p-4">
        {mode !== "edit" ? (
          <Button
            onClick={onRecall}
            className="flex items-center justify-center gap-2"
          >
            <FlameIcon className="h-6 w-6" />
            Recall
          </Button>
        ) : (
          <>
            <Button
              onClick={onReset}
              variant="secondary"
              className="flex items-center justify-center gap-2"
            >
              <ThumbsDownIcon className="h-6 w-6" />
              Give Up
            </Button>
            <Button
              onClick={onCheck}
              className="flex items-center justify-center gap-2"
            >
              <SearchCheckIcon className="h-6 w-6" />
              Check
            </Button>
          </>
        )}
      </div>
    </ControlPanelLayout>
  );
};

export default NumberControls;
