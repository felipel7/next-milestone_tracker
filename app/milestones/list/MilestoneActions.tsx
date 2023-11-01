import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const MilestoneActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/milestones/new">New Milestone</Link>
      </Button>
    </div>
  );
};

export default MilestoneActions;
