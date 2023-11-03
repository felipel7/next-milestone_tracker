import authOptions from '@/app/api/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteMilestoneButton from './DeleteMilestoneButton';
import EditMilestoneButton from './EditMilestoneButton';
import MilestoneDetails from './MilestoneDetails';
import StatusSelect from './StatusSelect';

const fetchMilestone = cache((milestoneId: number) =>
  prisma.milestone.findUnique({
    where: {
      id: milestoneId,
    },
  })
);

const MilestoneDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const milestone = await fetchMilestone(parseInt(params.id));

  if (!milestone) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <MilestoneDetails milestone={milestone} />
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect milestone={milestone} />
          <StatusSelect milestone={milestone} />
          <EditMilestoneButton milestoneId={milestone.id} />
          <DeleteMilestoneButton milestoneId={milestone.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const milestone = await fetchMilestone(parseInt(params.id));

  return {
    title: `Milestone - ${milestone?.title}`,
    description: `Details of the milestone: ${milestone?.title}`,
  };
}

export default MilestoneDetailsPage;
