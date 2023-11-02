import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import MilestoneActions from './MilestoneActions';
import MilestoneTable, { MilestoneQuery, columnsName } from './MilestoneTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: MilestoneQuery;
}

const MilestonePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnsName.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: 'asc',
      }
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
    <Flex direction="column" gap="3">
      <MilestoneActions />
      <MilestoneTable milestones={milestones} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        itemCount={milestoneCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default MilestonePage;
