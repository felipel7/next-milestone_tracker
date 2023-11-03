import { Flex, Text } from '@radix-ui/themes';
import { Link } from '.';

const AddNewMilestoneSuggestion = () => (
  <Flex align="center" gap="3" py="3" wrap="wrap">
    <Text>No milestones found, create a new one.</Text>
    <Link href="/milestones/new">New Milestone</Link>
  </Flex>
);

export default AddNewMilestoneSuggestion;
