import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import GoalForm from '../../_components/GoalForm';

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
