"use client";

import { useChessStore } from "../hooks/use-chess-store";

const BoardStatus = () => {
  const mode = useChessStore((state) => state.mode);
  const boardKey = useChessStore((state) => state.boardKey);
  const errorSquares = useChessStore((state) => state.errorSquares);

  return (
    <div className="flex items-center">
      <h2>
        {mode === "edit"
          ? "Recalling Board #" + boardKey
          : mode === "check"
            ? errorSquares.length > 0
              ? "Mistakes: " + errorSquares.length
              : "Correct!"
            : "Viewing"}
      </h2>
    </div>
  );
};

export default BoardStatus;
