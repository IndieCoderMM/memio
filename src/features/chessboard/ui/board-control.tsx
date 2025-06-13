"use client";

import Button from "@/components/blocks/button";
import ControlPanelLayout from "@/components/layouts/control-panel";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import { FlameIcon, SearchCheckIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";
import BoardHistory from "./board-history";
import BoardRandomizer from "./board-randomizer";
import BoardStatus from "./board-status";
import CheckResult from "./check-result";
import EditorBar from "./editor-bar";

const BoardControl = () => {
  const scanRef = useRef<TimerClockRef>(null);
  const recallRef = useRef<TimerClockRef>(null);
  const mode = useChessStore((s) => s.mode);
  const key = useChessStore((state) => state.boardKey);
  const setScanDuration = useChessStore((state) => state.setScanDuration);
  const setRecallDuration = useChessStore((state) => state.setRecallDuration);
  const { handleRecall, handleCheck } = useBoardControls();

  const onRecall = () => {
    handleRecall();
    const duration = scanRef.current?.getDuration() || 0;
    setScanDuration(duration);
  };

  const onCheck = () => {
    if (!key) {
      toast.error("Please generate a board first.");
      return;
    }
    handleCheck(key);
    const duration = recallRef.current?.getDuration() || 0;
    setRecallDuration(duration);
  };

  return (
    <ControlPanelLayout renderStatus={() => <BoardStatus />}>
      {mode === "edit" ? (
        <div className="flex h-full flex-col items-center justify-between gap-2 p-4">
          <div className="self-start">
            <TimerClock key="Recall timer" ref={recallRef} />
          </div>
          <EditorBar />
          <div className="mt-auto flex w-full justify-end gap-4 px-4 pb-8">
            <Button onClick={onCheck} className="flex items-center gap-2">
              <SearchCheckIcon className="h-6 w-6" />
              Check
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col gap-2">
          <div className="grid w-full grid-cols-5">
            <div className="col-span-2 flex flex-col gap-2 p-2">
              <TimerClock key="Scan timer" ref={scanRef} />
              <BoardRandomizer />
            </div>
            <div className="col-span-3 p-2">
              {mode === "check" ? <CheckResult /> : <BoardHistory />}
            </div>
          </div>
          <div className="mt-auto flex w-full items-center justify-end gap-4 px-4 pb-8">
            {mode === "view" ? (
              <Button onClick={onRecall} className="flex items-center gap-2">
                <FlameIcon className="h-6 w-6" />
                Start Recall
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </ControlPanelLayout>
  );
};

export default BoardControl;
