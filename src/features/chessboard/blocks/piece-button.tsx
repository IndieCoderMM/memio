import { cn } from "@/utils/tailwind";

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
      className={cn(
        "px-4 py-2 font-semibold",
        color === "black"
          ? "bg-elevated text-neutral-100 hover:bg-gray-500"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300",
        variant === "left"
          ? "rounded-l"
          : variant === "right"
            ? "rounded-r"
            : "",
        isActive ? "bg-accent-blue" : "",
      )}
    >
      {children}
    </button>
  );
};

export default PieceButton;
