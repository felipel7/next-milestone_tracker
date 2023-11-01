import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import GoalFormSkeleton from './loading';

const GoalForm = dynamic(() => import('@/app/goals/_components/GoalForm'), {
  ssr: false,
  loading: () => <GoalFormSkeleton />,
});

const EditGoalPage = async ({ params }: { params: { id: string } }) => {
  const goal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!goal) notFound();

  return <GoalForm goal={goal} />;
};

export default EditGoalPage;
