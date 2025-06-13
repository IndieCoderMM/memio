import React, { PropsWithChildren } from "react";

type ControlPanelLayoutProps = PropsWithChildren<{
  renderStatus: () => React.ReactNode;
}>;

const ControlPanelLayout = ({
  renderStatus,
  children,
}: ControlPanelLayoutProps) => {
  return (
    <div className="bg-surface flex h-full w-full flex-col items-center justify-between">
      <div className="bg-elevated flex w-full items-center p-2">
        {renderStatus()}
      </div>
      <div className="flex w-full flex-1 flex-col">{children}</div>
    </div>
  );
};

export default ControlPanelLayout;
