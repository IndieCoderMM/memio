import Board from "@/features/chessboard/components/board";
import BoardControl from "@/features/chessboard/components/board-control";
import BoardStatus from "@/features/chessboard/components/board-status";

const ChessboardPage = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-center p-4">
        <BoardStatus />
        <div>
          <Board />
        </div>
      </div>
      <div className="flex flex-col items-center p-4">
        <BoardControl />
      </div>
    </div>
  );
};

export default ChessboardPage;
