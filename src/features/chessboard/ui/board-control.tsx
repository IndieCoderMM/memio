"use client";

import ControlPanelLayout from "@/components/layouts/control-panel";
import { Button } from "@/components/ui/button";
import TimerClock, { TimerClockRef } from "@/components/widgets/timer-clock";
import { FlameIcon, SearchCheckIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";
import BoardRandomizer from "./board-randomizer";
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
    <ControlPanelLayout>
      <div className="flex flex-1 flex-col gap-(--s4)">
        <div className="flex min-w-0 flex-col gap-(--s3)">
          {mode === "edit" ? (
            <>
              <TimerClock key="Recall timer" ref={recallRef} />
              <EditorBar />
            </>
          ) : (
            <>
              <TimerClock key="Scan timer" ref={scanRef} />
              <BoardRandomizer />
            </>
          )}
        </div>
      </div>
      <div className="mt-auto flex w-full flex-wrap justify-end gap-(--s2) pt-(--s4)">
        {mode === "edit" ? (
          <Button onClick={onCheck} size="lg" className="min-w-[150px] flex-1">
            <SearchCheckIcon className="h-5 w-5" />
            Check
          </Button>
        ) : mode === "view" ? (
          <Button size="lg" onClick={onRecall} className="min-w-[150px] flex-1">
            <FlameIcon className="h-5 w-5" />
            Start Recall
          </Button>
        ) : null}
      </div>
    </ControlPanelLayout>
  );
};

export default BoardControl;
