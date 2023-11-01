import { MilestoneStatusBadge } from '@/app/components';
import { Milestone } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const MilestoneDetails = ({ milestone }: { milestone: Milestone }) => {
  return (
    <>
      <Heading>{milestone.title}</Heading>
      <Flex gap="2" my="2">
        <MilestoneStatusBadge status={milestone.status} />
      </Flex>

      <Text>{milestone.createdAt.toDateString()}</Text>

      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{milestone.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default MilestoneDetails;
