import dynamic from 'next/dynamic';
import GoalFormSkeleton from './loading';

const GoalForm = dynamic(() => import('@/app/goals/_components/GoalForm'), {
  ssr: false,
  loading: () => <GoalFormSkeleton />,
});

const NewGoalPage = () => {
  return <GoalForm />;
};

export default NewGoalPage;
