import { Table } from '@radix-ui/themes';
import { Skeleton } from '../components';
import GoalsActions from './GoalsActions';

const LoadingGoalsPage = () => {
  const goals = [1, 2, 3, 4, 5];

  return (
    <>
      <GoalsActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Goal</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {goals?.map(goal => (
            <Table.Row key={goal}>
              <Table.Cell>
                <Skeleton />
                <p className="block md:hidden">
                  <Skeleton />
                </p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingGoalsPage;
