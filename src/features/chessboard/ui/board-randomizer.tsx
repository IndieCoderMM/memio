import Button from "@/components/blocks/button";
import { configStorage } from "@/features/core/utils/config-storage";
import { DicesIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";

const BoardRandomizer = () => {
  const totalPieces = useChessStore((state) => state.totalPieces);
  const setTotalPieces = useChessStore((state) => state.setTotalPieces);
  const { handleRandomize } = useBoardControls();

  useEffect(() => {
    const config = configStorage.getSetting("chessboard");
    if (config?.totalPieces) {
      setTotalPieces(config.totalPieces);
    }
  }, [setTotalPieces]);

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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const newTotal = Math.max(1, Math.min(32, parseInt(value, 10)));
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
        <div className="flex flex-1 flex-col items-center justify-center">
          <input
            type="number"
            min={1}
            max={32}
            value={totalPieces}
            onChange={onInputChange}
            className="text-text-main focus-within:ring-border block h-10 w-16 text-center font-mono text-xl font-semibold focus-within:ring-1 focus-within:outline-none"
          />
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
        variant="secondary"
        onClick={() => handleRandomize(totalPieces)}
        className="flex items-center justify-center gap-2"
      >
        <DicesIcon className="h-6 w-6" />
        Randomize
      </Button>
    </div>
  );
};

export default BoardRandomizer;
