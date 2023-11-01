import authOptions from '@/app/api/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import DeleteGoalButton from './DeleteGoalButton';
import EditGoalButton from './EditGoalButton';
import GoalDetails from './GoalDetails';

const GoalDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

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
      {session && (
        <Flex direction="column" gap="4">
          <EditGoalButton goalId={goal.id} />
          <DeleteGoalButton goalId={goal.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default GoalDetailsPage;
