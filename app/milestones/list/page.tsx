import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { Link, MilestoneStatusBadge } from '../../components';
import MilestoneActions from './MilestoneActions';

const MilestonePage = async () => {
  const milestones = await prisma.milestone.findMany();

  return (
    <div>
      <MilestoneActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Milestones</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {milestones?.map(milestone => (
            <Table.Row key={milestone.id}>
              <Table.Cell>
                <Link href={`/milestones/${milestone.id}`}>
                  {milestone.title}
                </Link>
                <p className="block md:hidden">{milestone.status}</p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <MilestoneStatusBadge status={milestone.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {milestone.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default MilestonePage;
