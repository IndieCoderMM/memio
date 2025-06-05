import Button from "@/components/blocks/button";
import { DicesIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";

const BoardRandomizer = () => {
  const totalPieces = useChessStore((state) => state.totalPieces);
  const setTotalPieces = useChessStore((state) => state.setTotalPieces);
  const { handleRandomize } = useBoardControls();

  const handlePieceChange = (step: number) => () => {
    let newTotal = totalPieces + step;
    if (newTotal < 1) {
      newTotal = 1;
    }
    if (newTotal > 32) {
      newTotal = 32;
    }

    setTotalPieces(newTotal);
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="bg-elevated shadow-block flex w-full items-center justify-center gap-2 rounded-sm p-2">
        <button
          className="text-text-muted shadow-block cursor-pointer rounded-md bg-[#26252280] px-4 py-2 transition-colors hover:brightness-125"
          aria-label="Remove Piece"
          title="Remove Piece"
          onClick={handlePieceChange(-1)}
        >
          <MinusIcon className="h-5 w-5" />
        </button>
        <div className="text-center">
          <span className="text-text-main block font-mono text-xl font-semibold">
            {totalPieces}
          </span>
          <span className="text-text-muted block text-xs">Total Pieces</span>
        </div>
        <button
          className="text-text-muted shadow-block cursor-pointer rounded-md bg-[#26252280] px-4 py-2 transition-colors hover:brightness-125"
          aria-label="Add Piece"
          title="Add Piece"
          onClick={handlePieceChange(1)}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <Button
        onClick={() => handleRandomize(totalPieces)}
        className="flex items-center gap-2"
      >
        <DicesIcon />
        Randomize
      </Button>
    </div>
  );
};

export default BoardRandomizer;
