import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Milestone, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Link, MilestoneStatusBadge } from '../../components';
import MilestoneActions from './MilestoneActions';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Milestone;
    page: string;
  };
}

const columns: { label: string; value: keyof Milestone; className?: string }[] =
  [
    { label: 'Milestone', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

const MilestonePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;
  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const milestones = await prisma.milestone.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const milestoneCount = await prisma.milestone.count({ where });

  return (
    <div>
      <MilestoneActions />
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
      <Pagination
        currentPage={page}
        itemCount={milestoneCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default MilestonePage;
