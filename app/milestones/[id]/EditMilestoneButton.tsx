import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditMilestoneButton = ({ milestoneId }: { milestoneId: number }) => {
  return (
    <Button className="whitespace-nowrap">
      <Pencil2Icon />
      <Link href={`/milestones/edit/${milestoneId}`}>Editing Milestone</Link>
    </Button>
  );
};

export default EditMilestoneButton;
