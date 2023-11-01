'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteGoalButton = ({ goalId }: { goalId: number }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.delete(`/api/goals/${goalId}`);
      router.push('/goals');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="ruby">
          <TrashIcon />
          Delete Goal
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure? This action cannot be undone.
        </AlertDialog.Description>

        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action onClick={handleClick}>
            <Button color="ruby">Delete Goal</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteGoalButton;
