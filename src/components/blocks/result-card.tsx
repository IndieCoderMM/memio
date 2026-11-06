import { IconButton } from "@/components/pouf/Button";
import { Blob } from "@/components/pouf/media";
import { Row, Stack } from "@/components/pouf/layout";
import { Card, RowCard } from "@/components/pouf/surface";
import { Heading, Text } from "@/components/pouf/text";
import { useCloseGameDialog } from "@/components/layouts/game-dialog";
import type { LucideIcon } from "lucide-react";
import { XIcon } from "lucide-react";

const ResultCard = ({
  title,
  stats,
  onClose,
}: {
  title: string;
  stats: { icon: LucideIcon; title: string; value: number | string }[];
  onClose: () => void;
}) => {
  const closeDialog = useCloseGameDialog();
  const handleClose = () => {
    onClose();
    closeDialog();
  };

  return (
    <Card variant="tight">
      <Stack gap={3}>
        <Row justify="between">
          <Heading level={3}>{title}</Heading>
          <IconButton
            icon={<XIcon size={18} />}
            label="Close result"
            onClick={handleClose}
            variant="quiet"
          />
        </Row>
        <Stack gap={2}>
          {stats.map((stat) => (
            <RowCard key={stat.title}>
              <Row justify="between" wrap={false}>
                <Row gap={2} wrap={false}>
                  <Blob
                    icon={<stat.icon size={16} />}
                    tone="blue"
                    size="sm"
                  />
                  <Text size="sm" muted>{stat.title}</Text>
                </Row>
                <Text num>{stat.value}</Text>
              </Row>
            </RowCard>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ResultCard;
