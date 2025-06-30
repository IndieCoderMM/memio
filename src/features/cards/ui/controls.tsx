"use client";

import Button from "@/components/blocks/button";
import ControlPanelLayout from "@/components/layouts/control-panel";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import CheckResult from "@/features/binary/ui/number-check-result";
import NumberHistory from "@/features/binary/ui/number-history";
import { FlameIcon, SearchCheckIcon, ThumbsDownIcon } from "lucide-react";
import { useRef } from "react";
import { useCardStore } from "../hooks/use-card-store";
import CardRandomizer from "./randomizer";
import Status from "./status";

const CardControls = () => {
  const mode = useCardStore((s) => s.mode);
  const scanRef = useRef<TimerClockRef>(null);
  const recallRef = useRef<TimerClockRef>(null);

  const onRecall = () => {};

  const onCheck = () => {};

  const onReset = () => {};

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

export default CardControls;
