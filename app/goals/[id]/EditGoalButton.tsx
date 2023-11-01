import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditGoalButton = ({ goalId }: { goalId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/goals/${goalId}/edit`}>Editing Goal</Link>
    </Button>
  );
};

export default EditGoalButton;
