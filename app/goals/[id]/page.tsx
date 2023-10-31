import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

const GoalDetailsPage = async ({ params }: { params: { id: string } }) => {
  const goal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!goal) notFound();

  return (
    <dl>
      <dt>Title</dt>
      <dd>{goal.title}</dd>
      <dt>Description</dt>
      <dd>{goal.description}</dd>
      <dt>Status</dt>
      <dd>{goal.status}</dd>
      <dt>created</dt>
      <dd>{goal.createdAt.toDateString()}</dd>
    </dl>
  );
};

export default GoalDetailsPage;
