import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { MilestoneStatusBadge } from './components';

const LatestsMilestones = async () => {
  const milestones = await prisma.milestone.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latests Milestones
      </Heading>
      <Table.Root>
        <Table.Body>
          {milestones?.map(milestone => (
            <Table.Row key={milestone.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/milestones/${milestone.id}`}>
                      {milestone.title}
                    </Link>
                    <MilestoneStatusBadge status={milestone.status} />
                  </Flex>
                  {milestone.assignedToUser && (
                    <Avatar
                      fallback="?"
                      src={milestone.assignedToUser.image!}
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestsMilestones;
