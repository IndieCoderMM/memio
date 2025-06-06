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
        "border-surface shadow-block cursor-pointer border px-4 py-2 font-mono font-medium",
        color === "black"
          ? "bg-elevated text-neutral-100 hover:bg-gray-500"
          : "border-border bg-gray-200 text-gray-800 hover:bg-gray-300",
        variant === "left"
          ? "rounded-l"
          : variant === "right"
            ? "rounded-r"
            : "",
        isActive ? "bg-accent-blue/80 text-white" : "",
      )}
    >
      {children}
    </button>
  );
};

export default PieceButton;
