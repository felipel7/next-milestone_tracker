import prisma from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';

const GoalsPage = async () => {
  const goals = await prisma.goal.findMany();

  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Goal</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {goals?.map(goal => (
            <Table.Row key={goal.id}>
              <Table.Cell>
                {goal.title}
                <p className="block md:hidden">{goal.status}</p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {goal.status}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {goal.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button>
        <Link href="/goals/new">New Goal</Link>
      </Button>
    </div>
  );
};

export default GoalsPage;
