"use client";

import Button from "@/components/blocks/button";
import { MoveIcon, SearchIcon, ShuffleIcon } from "lucide-react";
import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";
import BoardStatus from "./board-status";
import EditorBar from "./editor-bar";

const BoardControl = () => {
  const mode = useChessStore((s) => s.mode);
  const key = useChessStore((state) => state.boardKey);
  const setActivePiece = useChessStore((state) => state.setActivePiece);
  const { handleRandomize, handleRecall, handleCheck } = useBoardControls();

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="bg-surface flex w-full items-center p-2">
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
        <div className="mt-auto flex w-full items-center gap-4 px-4 pb-8">
          <Button
            onClick={() => handleRandomize(16)}
            className="flex items-center gap-2"
          >
            <ShuffleIcon />
            Randomize Board
          </Button>
          <Button onClick={handleRecall} className="flex items-center gap-2">
            <MoveIcon />
            Recall
          </Button>
        </div>
      )}
    </div>
  );
};

export default BoardControl;
