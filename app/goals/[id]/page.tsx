import GoalStatusBadge from '@/app/components/GoalStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
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
    <div>
      <Heading>{goal.title}</Heading>
      <Flex gap="2" my="2">
        <GoalStatusBadge status={goal.status} />
      </Flex>

      <Text>{goal.createdAt.toDateString()}</Text>

      <Card className="prose" mt="4">
        <ReactMarkdown>{goal.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default GoalDetailsPage;
