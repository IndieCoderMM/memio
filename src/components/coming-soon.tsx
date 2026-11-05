import { Badge, Blob } from "@/components/pouf/media";
import { Row, Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";

const ComingSoon = () => {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[760px] items-center px-(--s5) py-(--s8)">
      <Card>
        <Stack gap={4}>
          <Blob icon="lab" tone="mint" size="md" />
          <Stack gap={2}>
            <Eyebrow>In the works</Eyebrow>
            <Heading level={1}>Under development</Heading>
            <Text muted>
              We’re building more ways to train memory. Check back soon for the
              next part of Memio.
            </Text>
          </Stack>
          <Row>
            <Badge tone="mint">In progress</Badge>
          </Row>
          <Text size="sm" muted>
            © {new Date().getFullYear()} Memio Labs
          </Text>
        </Stack>
      </Card>
    </main>
  );
};

export default ComingSoon;
