import { Box, Flex, Card } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingGoalDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex direction="column" gap="2" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card>
    </Box>
  );
};

export default LoadingGoalDetailsPage;
