import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

const statusMap: Record<
  Status,
  { label: string; color: 'ruby' | 'sky' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'ruby' },
  IN_PROGRESS: { label: 'In Progress', color: 'sky' },
  ACHIEVED: { label: 'Achieved', color: 'green' },
};

const GoalStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default GoalStatusBadge;
