import { IconButton } from "@/components/pouf/Button";
import { Badge } from "@/components/pouf/media";
import { Row, Stack } from "@/components/pouf/layout";
import { Card, RowCard } from "@/components/pouf/surface";
import { Heading, Text } from "@/components/pouf/text";
import { fromDate } from "@/utils/day";
import { Encoder } from "@/utils/Encoder";
import { LoaderIcon, RotateCwIcon, Trash2Icon } from "lucide-react";

interface HistoryItemData {
  id: string;
  isActive: boolean;
}

interface HistoryListProps {
  title: string;
  items: HistoryItemData[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const HistoryList = ({
  title,
  items,
  onLoad,
  onDelete,
  onRefresh,
  refreshing,
}: HistoryListProps) => {
  return (
    <Card variant="tight">
      <Stack gap={3}>
        <Row justify="between">
          <Stack gap={1}>
            <Heading level={3}>{title}</Heading>
            <Text size="sm" muted>{items.length} saved</Text>
          </Stack>
          <IconButton
            icon={refreshing ? <LoaderIcon size={18} /> : <RotateCwIcon size={18} />}
            label="Refresh history"
            loading={refreshing}
            onClick={onRefresh}
            variant="quiet"
          />
        </Row>

        {items.length > 0 ? (
          <div className="flex max-h-[300px] flex-col gap-(--s2) overflow-y-auto pr-(--s2)">
            {items.map((item) => (
              <RowCard key={item.id}>
                <Row justify="between" wrap={false}>
                  <button
                    type="button"
                    onClick={() => onLoad(item.id)}
                    aria-label={`Load saved entry from ${fromDate(new Date(Number(item.id)))}`}
                    className="min-w-0 flex-1 cursor-pointer text-left text-ink"
                  >
                    <Stack gap={1}>
                      <Text mono>{Encoder.encodeId(Number(item.id))}</Text>
                      <Text size="sm" muted>
                        {fromDate(new Date(Number(item.id)))}
                      </Text>
                    </Stack>
                  </button>
                  <Row gap={2} wrap={false}>
                    {item.isActive && <Badge tone="mint">Current</Badge>}
                    <IconButton
                      icon={<Trash2Icon size={16} />}
                      label={`Delete saved entry ${Encoder.encodeId(Number(item.id))}`}
                      onClick={() => onDelete(item.id)}
                      variant="quiet"
                      size="sm"
                    />
                  </Row>
                </Row>
              </RowCard>
            ))}
          </div>
        ) : (
          <Text size="sm" muted>No saved entries yet.</Text>
        )}
      </Stack>
    </Card>
  );
};

export default HistoryList;
