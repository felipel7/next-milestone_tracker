import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

const LoadingNewGoalPage = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewGoalPage;
