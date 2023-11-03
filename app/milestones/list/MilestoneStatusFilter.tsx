'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Achieved', value: 'ACHIEVED' },
];

const MilestoneStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(searchParams.get('status') || '');

  useEffect(() => {
    setStatus(searchParams.get('status') || '');
  }, [searchParams]);

  return (
    <Select.Root
      value={status}
      onValueChange={status => {
        const params = new URLSearchParams();
        const orderBy = searchParams.get('orderBy');

        if (status) params.append('status', status);
        if (orderBy) params.append('orderBy', orderBy);

        const query = params.size ? `?${params.toString()}` : '';

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
