import { buttonClasses } from "@/components/pouf/Button";
import { cn } from "@/utils/tailwind";

type PieceButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  color?: "white" | "black";
  isActive?: boolean;
};

const PieceButton = ({
  onClick,
  color = "white",
  isActive = false,
  children,
}: PieceButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        buttonClasses({
          size: "sm",
          tone: isActive ? "purple" : color === "black" ? "blue" : "mint",
          variant: isActive ? "solid" : "quiet",
        }),
        "min-w-0 px-2",
      )}
    >
      {children}
    </button>
  );
};

export default PieceButton;
