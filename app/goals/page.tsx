import Link from '@/app/components/Link';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import GoalStatusBadge from '../components/GoalStatusBadge';
import GoalsActions from './GoalsActions';

const GoalsPage = async () => {
  const goals = await prisma.goal.findMany();

  return (
    <div>
      <GoalsActions />
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
                <Link href={`/goals/${goal.id}`}>{goal.title}</Link>
                <p className="block md:hidden">{goal.status}</p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <GoalStatusBadge status={goal.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {goal.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default GoalsPage;
