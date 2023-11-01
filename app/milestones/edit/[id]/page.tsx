import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import MilestoneFormSkeleton from './loading';

const MilestoneForm = dynamic(
  () => import('@/app/milestones/_components/MilestoneForm'),
  {
    ssr: false,
    loading: () => <MilestoneFormSkeleton />,
  }
);

const EditMilestonePage = async ({ params }: { params: { id: string } }) => {
  const milestone = await prisma.milestone.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!milestone) notFound();

  return <MilestoneForm milestone={milestone} />;
};

export default EditMilestonePage;