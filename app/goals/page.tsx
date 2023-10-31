import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const GoalsPage = () => {
  return (
    <div>
      <Button>
        <Link href="/goals/new">New Goal</Link>
      </Button>
    </div>
  );
};

export default GoalsPage;
