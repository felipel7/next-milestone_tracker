import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditGoalButton from './EditGoalButton';
import GoalDetails from './GoalDetails';
import DeleteGoalButton from './DeleteGoalButton';

const GoalDetailsPage = async ({ params }: { params: { id: string } }) => {
  const goal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!goal) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <GoalDetails goal={goal} />
      </Box>
      <Flex direction="column" gap="4">
        <EditGoalButton goalId={goal.id} />
        <DeleteGoalButton goalId={goal.id} />
      </Flex>
    </Grid>
  );
};

export default GoalDetailsPage;
