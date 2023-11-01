import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditGoalButton from './EditGoalButton';
import GoalDetails from './GoalDetails';

const GoalDetailsPage = async ({ params }: { params: { id: string } }) => {
  const goal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!goal) notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <GoalDetails goal={goal} />
      </Box>
      <Box>
        <EditGoalButton goalId={goal.id} />
      </Box>
    </Grid>
  );
};

export default GoalDetailsPage;
