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

export default NewMilestonePage;
