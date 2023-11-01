import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

const GoalFormSkeleton = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton height="2rem" />
      <Skeleton height="23.5rem" />
    </Box>
  );
};

export default GoalFormSkeleton;
