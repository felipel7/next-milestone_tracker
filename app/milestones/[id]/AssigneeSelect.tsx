'use client';

import { Skeleton } from '@/app/components';
import { Milestone, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ milestone }: { milestone: Milestone }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  const assignMilestone = async (userId: string) => {
    try {
      await axios.patch(`/api/milestones/${milestone.id}`, {
        assignedToUserId: userId || null,
      });
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={milestone.assignedToUserId || ''}
        onValueChange={assignMilestone}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60s,
    retry: 3,
  });

export default AssigneeSelect;
