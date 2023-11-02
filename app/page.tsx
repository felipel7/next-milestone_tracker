import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import LatestsMilestones from './LatestsMilestones';
import MilestoneChart from './MilestoneChart';
import MilestoneSummary from './MilestoneSummary';

export default async function Home() {
  const open = await prisma.milestone.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.milestone.count({
    where: { status: 'IN_PROGRESS' },
  });
  const achieved = await prisma.milestone.count({
    where: { status: 'ACHIEVED' },
  });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <MilestoneSummary
          achieved={achieved}
          inProgress={inProgress}
          open={open}
        />
        <MilestoneChart
          achieved={achieved}
          inProgress={inProgress}
          open={open}
        />
      </Flex>
      <LatestsMilestones />
    </Grid>
  );
}
