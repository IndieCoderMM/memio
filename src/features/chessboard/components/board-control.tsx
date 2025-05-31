"use client";

import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";
import PieceButton from "../ui/piece-button";
import EditorBar from "./editor-bar";

const BoardControl = () => {
  const mode = useChessStore((s) => s.mode);
  const key = useChessStore((state) => state.boardKey);
  const { handleRandomize, handleRecall, handleCheck } = useBoardControls();

  return (
    <div>
      {mode === "edit" ? (
        <>
          <EditorBar />
          <PieceButton onClick={() => handleCheck(key ?? "")}>
            Check
          </PieceButton>
        </>
      ) : (
        <div className="flex flex-col">
          <PieceButton onClick={() => handleRandomize(16)}>
            Randomize Board
          </PieceButton>
          <PieceButton onClick={handleRecall}>Recall</PieceButton>
        </div>
      )}
    </div>
  );
};

export default BoardControl;
