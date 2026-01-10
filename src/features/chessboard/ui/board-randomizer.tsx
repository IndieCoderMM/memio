import DigitConfigCard from "@/components/blocks/digit-config-card";
import { configStorage } from "@/features/core/utils/config-storage";
import { useEffect } from "react";
import { useBoardControls } from "../hooks/use-board-controls";
import { useChessStore } from "../hooks/use-chess-store";

const BoardRandomizer = () => {
  const totalPieces = useChessStore((state) => state.totalPieces);
  const setTotalPieces = useChessStore((state) => state.setTotalPieces);
  const { handleRandomize } = useBoardControls();

  useEffect(() => {
    const config = configStorage.getSetting("chessboard");
    if (config?.total) {
      setTotalPieces(config.total);
    }
  }, [setTotalPieces]);

  const onInputChange = (value: number) => {
    setTotalPieces(value);
  };

  return (
    <DigitConfigCard
      label="Total Pieces"
      value={totalPieces}
      onValueChange={onInputChange}
      min={1}
      max={32}
      onRandomize={() => handleRandomize(totalPieces)}
    />
  );
};

export default BoardRandomizer;
