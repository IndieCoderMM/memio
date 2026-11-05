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
import { saveBinary } from "../utils/storage";
import CheckResult from "./number-check-result";
import NumberHistory from "./number-history";
import NumberRandomizer from "./number-randomizer";
import NumberStatus from "./number-status";

const NumberControls = () => {
  const mode = useNumberStore((s) => s.mode);
  const activeKey = useNumberStore((s) => s.activeKey);
  const generated = useNumberStore((s) => s.generated);
  const scanDuration = useNumberStore((s) => s.scanDuration);
  const tried = useNumberStore((s) => s.tried);
  const scanRef = useRef<TimerClockRef>(null);
  const recallRef = useRef<TimerClockRef>(null);
  const recallInFlightRef = useRef(false);
  const setMode = useNumberStore((s) => s.setMode);
  const setErrorSquares = useNumberStore((s) => s.setErrorSquares);
  const setScanDuration = useNumberStore((s) => s.setScanDuration);
  const setRecallDuration = useNumberStore((s) => s.setRecallDuration);
  const setActiveKey = useNumberStore((s) => s.setActiveKey);
  const reset = useNumberStore((s) => s.reset);

  const onRecall = async () => {
    if (recallInFlightRef.current) return;
    if (!generated) {
      toast.info("Please generate numbers first");
      return;
    }

    recallInFlightRef.current = true;
    try {
      if (!activeKey) {
        let key: string;
        try {
          key = await saveBinary(generated.join(""));
        } catch {
          toast.error("Your binary sequence could not be saved. Please try again.");
          return;
        }
        setActiveKey(key);
      }

      setMode("edit");
      const duration = scanRef.current?.getDuration() || 0;
      setScanDuration(duration);
    } finally {
      recallInFlightRef.current = false;
    }
  };

  const onCheck = async () => {
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
      type: "binary",
      total: generated.length,
      accuracy: (generated.length - errorCount) / generated.length,
      scan_ms: scanDuration,
      recall_ms: duration,
      timestamp: Date.now(),
    };
    try {
      await saveRecord(record);
    } catch {
      toast.error("Your result could not be saved.");
    }
  };

  const onReset = () => {
    reset();
  };

  return (
    <ControlPanelLayout renderStatus={() => <NumberStatus />}>
      <div className="grid flex-1 grid-cols-1 gap-(--s4) xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex min-w-0 flex-col gap-(--s3)">
          {mode !== "edit" ? (
            <TimerClock key="Scan timer" ref={scanRef} />
          ) : (
            <TimerClock key="Recall timer" ref={recallRef} />
          )}
          {mode !== "edit" && <NumberRandomizer />}
        </div>
        <div className="min-w-0">
          {mode === "check" ? (
            <CheckResult />
          ) : mode === "view" ? (
            <NumberHistory />
          ) : (
            <p className="rounded-control bg-bg p-(--s4) text-muted cushion-field">
              Enter the binary sequence on the board, then check your recall.
            </p>
          )}
        </div>
      </div>
      <div className="mt-auto flex w-full flex-wrap justify-center gap-(--s2) pt-(--s4)">
        {mode !== "edit" ? (
          <Button size="lg" onClick={onRecall} className="min-w-[150px] flex-1">
            <FlameIcon className="h-6 w-6" />
            Recall
          </Button>
        ) : (
          <>
            <Button
              onClick={onReset}
              variant="destructive"
              className="min-w-[150px] flex-1"
            >
              <ThumbsDownIcon className="h-6 w-6" />
              Give Up
            </Button>
            <Button onClick={onCheck} className="min-w-[150px] flex-1">
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
