import NumberBoard from "@/features/numbers/ui/number-board";
import NumberControls from "@/features/numbers/ui/number-controls";

const NumberPage = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="col-span-1 flex flex-col items-center p-4">
        <NumberBoard />
      </div>
      <div className="col-span-1 flex flex-col items-center p-4">
        <NumberControls />
      </div>
    </div>
  );
};

export default NumberPage;
