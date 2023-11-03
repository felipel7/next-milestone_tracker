'use client';

import { Milestone, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const StatusSelect = ({ milestone }: { milestone: Milestone }) => {
  const router = useRouter();

  const changeMilestoneStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/milestones/${milestone.id}`, {
        status,
      });
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <Select.Root
      defaultValue={milestone.status}
      onValueChange={changeMilestoneStatus}
    >
      <Select.Trigger placeholder="Milestone status" />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Change status...</Select.Label>
          {statuses.map(status => (
            <Select.Item key={status.label} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

const statuses: { label: string; value: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Achieved', value: 'ACHIEVED' },
];

export default StatusSelect;
