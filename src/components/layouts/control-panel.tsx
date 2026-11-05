import type { PropsWithChildren, ReactNode } from "react";
import { Card } from "@/components/pouf/surface";

type ControlPanelLayoutProps = PropsWithChildren<{
  renderStatus: () => ReactNode;
}>;

export default function ControlPanelLayout({
  renderStatus,
  children,
}: ControlPanelLayoutProps) {
  return (
    <Card variant="flush">
      <div className="flex min-h-[540px] flex-col">
        <div className="mx-(--s4) mt-(--s4) flex min-h-16 items-center rounded-control bg-bg px-(--s4) py-(--s3) cushion-field">
          {renderStatus()}
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-(--s4)">
          {children}
        </div>
      </div>
    </Card>
  );
}
