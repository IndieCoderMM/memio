import Board from "@/features/chessboard/ui/board";
import BoardControl from "@/features/chessboard/ui/board-control";

const ChessboardPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 flex items-center justify-center p-4">
        <div className="">
          <Board />
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center p-4">
        <BoardControl />
      </div>
    </div>
  );
};

export default ChessboardPage;
