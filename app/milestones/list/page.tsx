import { AddNewMilestoneSuggestion, Link } from '@/app/components';
import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex, Text } from '@radix-ui/themes';
import MilestoneActions from './MilestoneActions';
import MilestoneTable, { MilestoneQuery, columnsName } from './MilestoneTable';

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

  const totalMilestones = await prisma.milestone.count();
  if (totalMilestones === 0) return <AddNewMilestoneSuggestion />;

  const milestoneCount = await prisma.milestone.count({ where });
  const noResultsWithFilters = milestoneCount === 0;

  return (
    <Flex direction="column" gap="3">
      <MilestoneActions />
      {noResultsWithFilters ? (
        <NoResultsMessage />
      ) : (
        <MilestoneTable milestones={milestones} searchParams={searchParams} />
      )}
      <Pagination
        currentPage={page}
        itemCount={milestoneCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

const NoResultsMessage = () => (
  <Flex align="center" gap="3" py="3">
    <Text>No results found for the current search.</Text>
    <Link href="/milestones/list">Clear filters</Link>
  </Flex>
);

export const dynamic = 'force-dynamic';

export default MilestonePage;
