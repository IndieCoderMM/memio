import { formatClock } from "@/utils/formaters";
import { cn } from "@/utils/tailwind";
import { createScope, createTimer, Scope, Timer } from "animejs";
import { PauseIcon, PlayIcon, PowerIcon } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";

export type TimerClockRef = {
  getDuration: () => number;
};

const TimerClock = forwardRef<TimerClockRef>((_, ref) => {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);
  const timer = useRef<Timer | null>(null);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");

  useImperativeHandle(ref, () => ({
    getDuration: () => duration,
    stop: () => {
      if (timer.current) {
        timer.current.pause();
        setStatus("paused");
      }
    },
  }));

  const handlePlayPause = () => {
    if (!timer.current) return;

    if (!timer.current.paused) {
      timer.current.pause();
      setStatus("paused");
    } else {
      timer.current.play();
      setStatus("running");
    }
  };

  const handleReset = () => {
    timer.current?.reset();
    setDuration(0);
    setStatus("idle");
  };

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      timer.current = createTimer({
        duration: 1000,
        loop: true,
        autoplay: false,
        frameRate: 20,
        onUpdate: (self) => {
          setDuration(self.currentTime);
        },
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center rounded-md">
      <div
        ref={root}
        className="relative flex w-full items-center justify-center overflow-hidden rounded-sm border border-[#333] px-3 py-1"
      >
        <div className="bg-accent-yellow/40 shadow-accent-yellow absolute inset-0 shadow-inner brightness-50"></div>
        <span
          className={cn(
            "text-accent-yellow text-center text-3xl brightness-125",
          )}
        >
          {formatClock(duration, true)}
        </span>
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-2">
        <Button
          onClick={handlePlayPause}
          aria-label={status === "paused" ? "Start Clock" : "Pause Clock"}
          title={status === "paused" ? "Start Clock" : "Pause Clock"}
          className="w-full"
        >
          {status === "paused" ? (
            <>
              <PlayIcon className="h-5 w-5" />
              <span className="inline-block w-[50%]">Resume Timer</span>
            </>
          ) : status === "running" ? (
            <>
              <PauseIcon className="h-5 w-5" />
              <span className="inline-block w-[50%]">Pause Timer</span>
            </>
          ) : (
            <>
              <PlayIcon className="h-5 w-5" />
              <span className="inline-block w-[50%]">Start Timer</span>
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          aria-label="Reset"
          title="Reset Clock"
          className="w-full"
          variant="destructive"
        >
          <PowerIcon className="h-5 w-5" />
          <span className="inline-block w-[50%]">Reset Timer</span>
        </Button>
      </div>
    </div>
  );
});

TimerClock.displayName = "TimerClock";

export default TimerClock;
