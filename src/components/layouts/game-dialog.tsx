"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { IconButton } from "@/components/pouf/Button";
import { Stack } from "@/components/pouf/layout";
import { XIcon } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";

const CloseGameDialogContext = createContext<() => void>(() => {});

export function useCloseGameDialog() {
  return useContext(CloseGameDialogContext);
}

interface GameDialogProps {
  icon: ReactNode;
  label: string;
  title: string;
  children: ReactNode;
}

export function GameDialog({ icon, label, title, children }: GameDialogProps) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton
          icon={icon}
          label={label}
          title={label}
          size="sm"
          variant="quiet"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="pouf-overlay" />
        <Dialog.Content
          className="pouf-dialog pouf-dialog--lg"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Stack gap={3}>
            <div className="pouf-dialog__head justify-end">
              <Dialog.Close asChild>
                <IconButton
                  icon={<XIcon size={18} />}
                  label={`Close ${title.toLowerCase()}`}
                  variant="quiet"
                  size="sm"
                />
              </Dialog.Close>
            </div>
            <div className="pouf-dialog__body">
              <CloseGameDialogContext.Provider value={closeDialog}>
                {children}
              </CloseGameDialogContext.Provider>
            </div>
          </Stack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
