'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Achieved', value: 'ACHIEVED' },
];

const MilestoneStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={status => {
        const query = status ? `?status=${status}` : '';
        router.push('/milestones/list' + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Status..." />
      <Select.Content align="start" position="popper">
        {statuses.map(status => (
          <Select.Item key={status.label} value={status.value || ''}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default MilestoneStatusFilter;
