import prisma from '@/prisma/client';
import LatestsMilestones from './LatestsMilestones';
import MilestoneSummary from './MilestoneSummary';
import MilestoneChart from './MilestoneChart';

export default async function Home() {
  const open = await prisma.milestone.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.milestone.count({
    where: { status: 'IN_PROGRESS' },
  });
  const achieved = await prisma.milestone.count({
    where: { status: 'ACHIEVED' },
  });

  return (
    <section>
      <LatestsMilestones />
      <MilestoneSummary
        achieved={achieved}
        inProgress={inProgress}
        open={open}
      />
      <MilestoneChart achieved={achieved} inProgress={inProgress} open={open} />
    </section>
  );
}
