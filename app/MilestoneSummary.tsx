import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  achieved: number;
}

const MilestoneSummary = ({ open, inProgress, achieved }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Milestones', value: open, status: 'OPEN' },
    {
      label: 'In-progress Milestones',
      value: inProgress,
      status: 'IN_PROGRESS',
    },
    { label: 'Achieved Milestones', value: achieved, status: 'ACHIEVED' },
  ];

  return (
    <Flex gap="4">
      {containers.map(container => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/milestones/list?status${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default MilestoneSummary;
