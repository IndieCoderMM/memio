import { GamePage } from "@/components/layouts/game-page";
import CardBoard from "@/features/cards/ui/board";
import CardControls from "@/features/cards/ui/controls";

export default function CardsPage() {
  return (
    <GamePage
      title="Cards"
      description="Study a shuffled deck, then recall its order."
      tone="orange"
      board={<CardBoard />}
      controls={<CardControls />}
    />
  );
}
