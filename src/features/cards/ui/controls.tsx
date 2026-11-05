"use client";

import ControlPanelLayout from "@/components/layouts/control-panel";
import { Button } from "@/components/ui/button";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import { saveRecord } from "@/features/core/utils/record-storage";
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
  const recallInFlightRef = useRef(false);
  const generated = useCardStore((s) => s.generated);
  const tried = useCardStore((s) => s.tried);
  const activeKey = useCardStore((s) => s.activeKey);
  const setMode = useCardStore((s) => s.setMode);
  const setScanDuration = useCardStore((s) => s.setScanDuration);
  const setRecallDuration = useCardStore((s) => s.setRecallDuration);
  const setActiveKey = useCardStore((s) => s.setActiveKey);
  const setErrors = useCardStore((s) => s.setErrors);
  const reset = useCardStore((s) => s.reset);

  const onRecall = async () => {
    if (recallInFlightRef.current) return;
    if (!generated) {
      toast.info("Please shuffle cards first");
      return;
    }

    recallInFlightRef.current = true;
    try {
      if (!activeKey) {
        let key: string;
        try {
          key = await saveDeck(generated);
        } catch {
          toast.error("Your deck could not be saved. Please try again.");
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
    <ControlPanelLayout renderStatus={() => <Status />}>
      <div className="grid flex-1 grid-cols-1 gap-(--s4) xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex min-w-0 flex-col gap-(--s3)">
          {mode === "edit" ? (
            <DeckBuilder />
          ) : (
            <>
              <TimerClock key="Scan timer" ref={scanRef} />
              <CardRandomizer />
            </>
          )}
        </div>
        <div className="min-w-0">
          {mode === "check" ? (
            <DeckCheckResult />
          ) : mode === "view" ? (
            <DeckHistory />
          ) : (
            <TimerClock key="Recall timer" ref={recallRef} />
          )}
        </div>
      </div>
      <div className="mt-auto flex w-full flex-wrap justify-end gap-(--s2) pt-(--s4)">
        {mode !== "edit" ? (
          <Button size="lg" onClick={onRecall} className="min-w-[150px] flex-1">
            <FlameIcon className="h-6! w-6!" />
            Recall
          </Button>
        ) : (
          <>
            <Button onClick={onReset} variant="destructive">
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
