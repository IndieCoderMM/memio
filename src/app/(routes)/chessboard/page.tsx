import Board from "@/features/chessboard/components/board";
import EditorBar from "@/features/chessboard/components/editor-bar";
import React from "react";

const ChessboardPage = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-center p-4">
        <h2>Chessboard</h2>
        <div>
          <Board />
        </div>
      </div>
      <div className="flex flex-col p-4 items-center">
        <h2>Controls</h2>
        <EditorBar />
      </div>
    </div>
  );
};

export default ChessboardPage;
