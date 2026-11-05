"use client";

import { Badge, Blob } from "@/components/pouf/media";
import { Row } from "@/components/pouf/layout";
import { Text } from "@/components/pouf/text";
import type { Tone } from "@/components/pouf/tone";
import { Encoder } from "@/utils/Encoder";
import type { ReactElement } from "react";

export type Mode = {
  text: string;
  icon: ReactElement;
  tone: Tone;
};

export default function ModeIndicator({
  mode,
  activeKey,
}: {
  mode: Mode;
  activeKey: string | null;
}) {
  return (
    <Row gap={2} wrap={false}>
      <Blob icon={mode.icon} tone={mode.tone} size="sm" />
      <Text>{mode.text}</Text>
      {activeKey && (
        <Badge tone="blue">#{Encoder.encodeId(Number(activeKey))}</Badge>
      )}
    </Row>
  );
}
