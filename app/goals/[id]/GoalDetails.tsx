import { GoalStatusBadge } from '@/app/components';
import { Goal } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const GoalDetails = ({ goal }: { goal: Goal }) => {
  return (
    <>
      <Heading>{goal.title}</Heading>
      <Flex gap="2" my="2">
        <GoalStatusBadge status={goal.status} />
      </Flex>

      <Text>{goal.createdAt.toDateString()}</Text>

      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{goal.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default GoalDetails;
