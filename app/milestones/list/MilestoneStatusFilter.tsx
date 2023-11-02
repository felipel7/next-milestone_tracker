'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Achieved', value: 'ACHIEVED' },
];

const MilestoneStatusFilter = () => {
  return (
    <Select.Root>
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
