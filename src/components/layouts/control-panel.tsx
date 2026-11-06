import type { PropsWithChildren } from "react";
import { Card } from "@/components/pouf/surface";

export default function ControlPanelLayout({ children }: PropsWithChildren) {
  return (
    <Card variant="flush">
      <div className="flex min-h-[540px] flex-col">
        <div className="flex min-w-0 flex-1 flex-col p-(--s4)">{children}</div>
      </div>
    </Card>
  );
}
