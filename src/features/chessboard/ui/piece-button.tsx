type PieceButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  color?: "white" | "black";
  variant?: "left" | "right" | "middle";
  isActive?: boolean;
};

const PieceButton = ({
  onClick,
  color = "white",
  variant = "middle",
  isActive = false,
  children,
}: PieceButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${color === "black" ? "bg-gray-800 text-neutral-100 hover:bg-gray-500" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} ${isActive ? "bg-yellow-400" : ""} px-4 py-2 font-semibold ${variant === "left" ? "rounded-l" : variant === "right" ? "rounded-r" : ""}`}
    >
      {children}
    </button>
  );
};

export default PieceButton;
