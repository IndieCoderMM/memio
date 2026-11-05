"use client";

import { Badge } from "@/components/pouf/media";
import { Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import { useAppStore } from "@/lib/app-store";
import { useEffect, useState } from "react";

export default function Profile() {
  const displayName = useAppStore((state) => state.displayName);
  const setDisplayName = useAppStore((state) => state.setDisplayName);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <main className="mx-auto max-w-[820px] px-(--s5) py-(--s8) max-[620px]:px-(--s3)">
      <Stack gap={5}>
        <header>
          <Stack gap={2}>
            <Eyebrow>Your Memio space</Eyebrow>
            <Heading level={1}>Profile</Heading>
            <Text muted>Your preferences are saved in this browser.</Text>
          </Stack>
        </header>

        <Card>
          <Stack gap={5}>
            <Row justify="between" align="top">
              <Stack gap={1}>
                <Heading level={2}>Personal details</Heading>
                <Text muted>Choose the name shown with your practice.</Text>
              </Stack>
              <Badge tone="mint">Saved locally</Badge>
            </Row>

            <div className="flex flex-col gap-(--s2)">
              <label htmlFor="display-name" className="font-black text-ink">
                Display name
              </label>
              <input
                id="display-name"
                type="text"
                autoComplete="nickname"
                value={hasMounted ? displayName : ""}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
                className="w-full rounded-control bg-bg px-(--s4) py-(--s3) text-ink outline-none cushion-field focus:cushion-field-focus"
              />
              <Text size="sm" muted>
                This name stays on this device and can be changed at any time.
              </Text>
            </div>
          </Stack>
        </Card>
      </Stack>
    </main>
  );
}
