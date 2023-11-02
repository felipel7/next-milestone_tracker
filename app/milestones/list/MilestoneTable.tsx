import { Link, MilestoneStatusBadge } from '@/app/components';
import { Milestone, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface MilestoneQuery {
  status: Status;
  orderBy: keyof Milestone;
  page: string;
}

interface Props {
  searchParams: MilestoneQuery;
  milestones: Milestone[];
}

const MilestoneTable = ({ searchParams, milestones }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
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
  );
};

const columns: { label: string; value: keyof Milestone; className?: string }[] =
  [
    { label: 'Milestone', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

export const columnsName = columns.map(column => column.value);

export default MilestoneTable;
