import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const GoalsActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/goals/new">New Goal</Link>
      </Button>
    </div>
  );
};

export default GoalsActions;
