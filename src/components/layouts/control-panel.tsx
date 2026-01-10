import React, { PropsWithChildren } from "react";

type ControlPanelLayoutProps = PropsWithChildren<{
  renderStatus: () => React.ReactNode;
}>;

const ControlPanelLayout = ({
  renderStatus,
  children,
}: ControlPanelLayoutProps) => {
  return (
    <div className="bg-card border-border flex h-full w-full flex-col items-center justify-between border">
      <div className="bg-muted/50 border-border flex w-full items-center border-b p-2">
        {renderStatus()}
      </div>
      <div className="flex w-full flex-1 flex-col">{children}</div>
    </div>
  );
};

export default ControlPanelLayout;
