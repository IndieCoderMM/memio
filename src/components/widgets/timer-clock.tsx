import { formatClock } from "@/utils/formaters";
import { createScope, createTimer, Scope, Timer } from "animejs";
import { PauseIcon, PlayIcon, PowerIcon } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/pouf/Button";

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
    <div className="w-full max-w-sm">
      <div
        ref={root}
        className="flex min-h-20 w-full items-center justify-center rounded-control bg-yellow px-(--s4) py-(--s3) text-[32px] font-black tracking-[1px] text-ink cushion-control"
      >
        {formatClock(duration, true)}
      </div>
      <div className="mt-(--s3) flex w-full flex-col gap-(--s2)">
        <Button
          onClick={handlePlayPause}
          aria-label={
            status === "running"
              ? "Pause clock"
              : status === "paused"
                ? "Resume clock"
                : "Start clock"
          }
          title={
            status === "running"
              ? "Pause clock"
              : status === "paused"
                ? "Resume clock"
                : "Start clock"
          }
          block
          tone="purple"
        >
          {status === "paused" ? (
            <>
              <PlayIcon className="h-5 w-5" />
              <span>Resume timer</span>
            </>
          ) : status === "running" ? (
            <>
              <PauseIcon className="h-5 w-5" />
              <span>Pause timer</span>
            </>
          ) : (
            <>
              <PlayIcon className="h-5 w-5" />
              <span>Start timer</span>
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          aria-label="Reset"
          title="Reset Clock"
          block
          tone="pink"
        >
          <PowerIcon className="h-5 w-5" />
          <span>Reset timer</span>
        </Button>
      </div>
    </div>
  );
});

TimerClock.displayName = "TimerClock";

export default TimerClock;
