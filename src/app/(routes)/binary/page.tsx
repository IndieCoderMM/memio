import NumberBoard from "@/features/binary/ui/number-board";
import NumberControls from "@/features/binary/ui/number-controls";

const BinaryPage = () => {
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

export default BinaryPage;
