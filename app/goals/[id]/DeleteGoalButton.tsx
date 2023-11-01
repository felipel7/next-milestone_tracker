import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

const DeleteGoalButton = ({ goalId }: { goalId: number }) => {
  return (
    <Button color="ruby">
      <TrashIcon />
      Delete Goal
    </Button>
  );
};

export default DeleteGoalButton;
