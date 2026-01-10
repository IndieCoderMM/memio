"use client";

import ControlPanelLayout from "@/components/layouts/control-panel";
import { Button } from "@/components/ui/button";
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
    const duration = scanRef.current?.getDuration() || 0;
    setScanDuration(duration);
    handleRecall();
  };

  const onCheck = () => {
    if (!key) {
      toast.error("Please generate a board first.");
      return;
    }
    const duration = recallRef.current?.getDuration() || 0;
    setRecallDuration(duration);
    handleCheck(key, duration);
  };

  return (
    <ControlPanelLayout renderStatus={() => <BoardStatus />}>
      {mode === "edit" ? (
        <div className="flex h-full flex-col items-center justify-between gap-2 p-2 pb-4">
          <div className="grid w-full grid-cols-5">
            <div className="col-span-2 flex flex-col gap-2">
              <TimerClock key="Recall timer" ref={recallRef} />
            </div>
            <div className="col-span-full pt-4">
              <EditorBar />
            </div>
          </div>
          <div className="mt-auto flex w-full justify-end gap-4">
            <Button onClick={onCheck} className="min-w-[250px]" size="lg">
              <SearchCheckIcon className="h-6! w-6!" />
              Check
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col gap-2 p-2 pb-4">
          <div className="grid w-full grid-cols-5">
            <div className="col-span-2 flex flex-col gap-4">
              <TimerClock key="Scan timer" ref={scanRef} />
              <BoardRandomizer />
            </div>
            <div className="col-span-3 px-4">
              {mode === "check" ? <CheckResult /> : <BoardHistory />}
            </div>
          </div>
          <div className="mt-auto flex w-full items-center justify-end gap-4">
            {mode === "view" ? (
              <Button size="lg" onClick={onRecall} className="min-w-[250px]">
                <FlameIcon className="h-5! w-5!" />
                <span className="inline-block w-[40%]">Start Recall</span>
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </ControlPanelLayout>
  );
};

export default BoardControl;
