import { Table } from '@radix-ui/themes';
import { Skeleton } from '../../components';
import MilestoneActions from './MilestoneActions';

const LoadingMilestonesPage = () => {
  const milestone = [1, 2, 3, 4, 5];

  return (
    <>
      <MilestoneActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Milestone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {milestone?.map(milestone => (
            <Table.Row key={milestone}>
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

export default LoadingMilestonesPage;
