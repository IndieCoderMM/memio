import { GamePage } from "@/components/layouts/game-page";
import NumberBoard from "@/features/numbers/ui/number-board";
import NumberControls from "@/features/numbers/ui/number-controls";

export default function NumberPage() {
  return (
    <GamePage
      title="Numbers"
      description="Memorize a sequence, then recall it one digit at a time."
      tone="blue"
      board={<NumberBoard />}
      controls={<NumberControls />}
    />
  );
}
