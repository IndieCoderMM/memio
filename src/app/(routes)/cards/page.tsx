import CardBoard from "@/features/cards/ui/board";
import CardControls from "@/features/cards/ui/controls";

const CardsPage = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="col-span-1 flex flex-col items-center p-4">
        <CardBoard />
      </div>
      <div className="col-span-1 flex flex-col items-center p-4">
        <CardControls />
      </div>
    </div>
  );
};

export default CardsPage;
