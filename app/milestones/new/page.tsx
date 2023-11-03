import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import MilestoneFormSkeleton from './loading';

const MilestoneForm = dynamic(
  () => import('@/app/milestones/_components/MilestoneForm'),
  {
    ssr: false,
    loading: () => <MilestoneFormSkeleton />,
  }
);

const NewMilestonePage = () => {
  return <MilestoneForm />;
};

export const metadata: Metadata = {
  title: 'Create New Milestone',
  description: 'Create a new milestone for your project.',
};

export default NewMilestonePage;
