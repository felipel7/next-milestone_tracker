import { GoalStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

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
        <Heading>{goal.title}</Heading>
        <Flex gap="2" my="2">
          <GoalStatusBadge status={goal.status} />
        </Flex>

        <Text>{goal.createdAt.toDateString()}</Text>

        <Card className="prose" mt="4">
          <ReactMarkdown>{goal.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/goals/${goal.id}/edit`}>Editing Goal</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default GoalDetailsPage;
