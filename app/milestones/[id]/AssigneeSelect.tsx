'use client';

import { Skeleton } from '@/app/components';
import { Milestone, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = ({ milestone }: { milestone: Milestone }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60s,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root
      defaultValue={milestone.assignedToUserId || ''}
      onValueChange={userId => {
        axios.patch(`/api/milestones/${milestone.id}`, {
          assignedToUserId: userId || null,
        });
      }}
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
  );
};

export default AssigneeSelect;
