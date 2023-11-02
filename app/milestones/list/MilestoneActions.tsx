import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import MilestoneStatusFilter from './MilestoneStatusFilter';

const MilestoneActions = () => {
  return (
    <Flex justify="between">
      <MilestoneStatusFilter />
      <Button>
        <Link href="/milestones/new">New Milestone</Link>
      </Button>
    </Flex>
  );
};

export default MilestoneActions;
