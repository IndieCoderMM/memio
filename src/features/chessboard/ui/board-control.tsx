"use client";

import Button from "@/components/blocks/button";
import { CastleIcon, SearchIcon } from "lucide-react";
import TimerClock from "../blocks/timer-clock";
import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";
import BoardHistory from "./board-history";
import BoardRandomizer from "./board-randomizer";
import BoardStatus from "./board-status";
import EditorBar from "./editor-bar";

const BoardControl = () => {
  const mode = useChessStore((s) => s.mode);
  const key = useChessStore((state) => state.boardKey);
  const setActivePiece = useChessStore((state) => state.setActivePiece);
  const { handleRecall, handleCheck } = useBoardControls();

  return (
    <div className="bg-surface flex h-full w-full flex-col items-center justify-between">
      <div className="bg-elevated flex w-full items-center p-2">
        <BoardStatus />
      </div>
      {mode === "edit" ? (
        <div className="flex flex-col gap-2">
          <EditorBar />
          <div className="mt-auto flex w-full justify-between gap-4 px-4 pb-8">
            <Button onClick={() => setActivePiece(null)}>
              Clear Selection
            </Button>
            <Button
              onClick={() => handleCheck(key ?? "")}
              className="flex items-center gap-2"
            >
              <SearchIcon />
              Check
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col gap-2">
          <div className="grid w-full grid-cols-5">
            <div className="col-span-2 flex flex-col gap-2 p-2">
              <TimerClock />
              <BoardRandomizer />
            </div>
            <div className="col-span-3 p-2">
              <BoardHistory />
            </div>
          </div>
          <div className="mt-auto flex w-full items-center justify-end gap-4 px-4 pb-8">
            <Button onClick={handleRecall} className="flex items-center gap-2">
              <CastleIcon />
              Start Recalling
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardControl;
