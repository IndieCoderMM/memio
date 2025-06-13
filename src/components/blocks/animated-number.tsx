"use client";
import { cn } from "@/utils/tailwind";
import { animate } from "animejs";
import { useEffect, useRef } from "react";

const AnimatedNumber = ({
  num,
  isStatic = false,
  className,
}: {
  num: number;
  isStatic?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isStatic) {
      if (ref.current) {
        ref.current.textContent = num.toString();
      }
      return;
    }

    const animation = animate(
      { num: 0 },
      {
        num: num,
        round: 1,
        duration: 1000,
        onUpdate: (anim) => {
          const currentNum = Math.round((anim.targets[0] as any).num);
          if (ref.current) {
            ref.current.textContent = currentNum.toString();
          }
        },
      },
    );

    return () => {
      animation.revert();
    };
  }, [num, isStatic]);

  return (
    <span ref={ref} className={cn(className)}>
      0
    </span>
  );
};

export default AnimatedNumber;
