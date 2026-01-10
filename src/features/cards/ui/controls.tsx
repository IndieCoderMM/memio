"use client";

import ControlPanelLayout from "@/components/layouts/control-panel";
import { Button } from "@/components/ui/button";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import { saveRecord } from "@/features/core/utils/record-storage";
import { cn } from "@/utils/tailwind";
import { FlameIcon, SearchCheckIcon, ThumbsDownIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useCardStore } from "../hooks/use-card-store";
import { diffDecks } from "../utils/diff-decks";
import { saveDeck } from "../utils/storage";
import DeckBuilder from "./deck-builder";
import DeckHistory from "./history";
import CardRandomizer from "./randomizer";
import DeckCheckResult from "./result";
import Status from "./status";

const CardControls = () => {
  const mode = useCardStore((s) => s.mode);
  const scanDuration = useCardStore((s) => s.scanDuration);
  const scanRef = useRef<TimerClockRef>(null);
  const recallRef = useRef<TimerClockRef>(null);
  const generated = useCardStore((s) => s.generated);
  const tried = useCardStore((s) => s.tried);
  const activeKey = useCardStore((s) => s.activeKey);
  const setMode = useCardStore((s) => s.setMode);
  const setScanDuration = useCardStore((s) => s.setScanDuration);
  const setRecallDuration = useCardStore((s) => s.setRecallDuration);
  const setActiveKey = useCardStore((s) => s.setActiveKey);
  const setErrors = useCardStore((s) => s.setErrors);
  const reset = useCardStore((s) => s.reset);

  const onRecall = () => {
    if (!generated) {
      toast.info("Please shuffle cards first");
      return;
    }

    if (!activeKey) {
      const key = saveDeck(generated);
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
          ? "Please fill in memorized cards"
          : "Please shuffle cards first.",
      );
      return;
    }

    const errors = diffDecks(generated, tried);
    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
      setErrors(errors);
      toast.error(`You made ${Object.keys(errors).length} mistakes!`);
    } else {
      setErrors(null);
      toast.success(`You got all ${generated.length} cards right!`);
    }

    setMode("check");
    const duration = recallRef.current?.getDuration() || 0;
    setRecallDuration(duration);

    // Save record
    const record: SessionRecord = {
      type: "cards",
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
    <ControlPanelLayout renderStatus={() => <Status />}>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid w-full grid-cols-5">
          {mode !== "edit" ? (
            <div className="col-span-2 flex flex-col gap-2 p-2">
              <TimerClock key="Scan timer" ref={scanRef} />
              <CardRandomizer />
            </div>
          ) : (
            <div
              className={cn("col-span-2 flex flex-col gap-2 p-2", {
                "col-span-3": mode === "edit",
              })}
            >
              <DeckBuilder />
            </div>
          )}
          <div
            className={cn("col-span-3 p-2", {
              "col-span-2": mode === "edit",
            })}
          >
            {mode === "check" ? (
              <DeckCheckResult />
            ) : mode === "view" ? (
              <DeckHistory />
            ) : (
              <TimerClock key="Recall timer" ref={recallRef} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto flex w-full justify-end gap-4 p-4">
        {mode !== "edit" ? (
          <Button size="lg" onClick={onRecall} className="min-w-[250px]">
            <FlameIcon className="h-6! w-6!" />
            Recall
          </Button>
        ) : (
          <>
            <Button onClick={onReset} variant="secondary">
              <ThumbsDownIcon className="h-6 w-6" />
              Give Up
            </Button>
            <Button onClick={onCheck}>
              <SearchCheckIcon className="h-6 w-6" />
              Check
            </Button>
          </>
        )}
      </div>
    </ControlPanelLayout>
  );
};

export default CardControls;
