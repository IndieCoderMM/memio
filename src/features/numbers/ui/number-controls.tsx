"use client";

import ControlPanelLayout from "@/components/layouts/control-panel";
import { Button } from "@/components/ui/button";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import { saveRecord } from "@/features/core/utils/record-storage";
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
  const scanDuration = useNumberStore((s) => s.scanDuration);
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
    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
      setErrorSquares(errors);
      toast.error(`You made ${Object.keys(errors).length} mistakes!`);
    } else {
      setErrorSquares(null);
      toast.success(`You got all ${generated.length} numbers right!`);
    }

    setMode("check");
    const duration = recallRef.current?.getDuration() || 0;
    setRecallDuration(duration);

    // Save record
    const record: SessionRecord = {
      type: "number",
      total: generated.length,
      accuracy: (generated.length - errorCount) / generated.length,
      scan_ms: scanDuration,
      recall_ms: duration,
      timestamp: Date.now(),
    };
    saveRecord(record);
  };

  const onReset = () => {
    reset();
  };

  return (
    <ControlPanelLayout renderStatus={() => <NumberStatus />}>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid w-full grid-cols-5">
          {mode !== "edit" ? (
            <div className="col-span-2 flex flex-col gap-2 p-4">
              <TimerClock key="Scan timer" ref={scanRef} />
              <hr className="border-border/50 my-4 h-px w-full border" />
              <NumberRandomizer />
            </div>
          ) : (
            <div className="col-span-2 flex flex-col gap-2 p-4">
              <TimerClock key="Recall timer" ref={recallRef} />
            </div>
          )}

          <div className="col-span-3 p-4">
            {mode === "check" ? (
              <CheckResult />
            ) : mode === "view" ? (
              <NumberHistory />
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-auto flex w-full justify-center gap-4 p-4">
        {mode !== "edit" ? (
          <Button size="lg" onClick={onRecall} className="min-w-[250px]">
            <FlameIcon className="h-5 w-5" />
            Recall
          </Button>
        ) : (
          <>
            <Button
              onClick={onReset}
              variant="secondary"
              className="min-w-[250px]"
            >
              <ThumbsDownIcon className="h-5 w-5" />
              Give Up
            </Button>
            <Button onClick={onCheck} className="min-w-[250px]">
              <SearchCheckIcon className="h-5 w-5" />
              Check
            </Button>
          </>
        )}
      </div>
    </ControlPanelLayout>
  );
};

export default NumberControls;
