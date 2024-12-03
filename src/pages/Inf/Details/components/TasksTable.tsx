import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import TableRenderer from '../../../../components/DataTable/TableRenderer';
import { TaskStatisticsTables } from '../../Referral/types';

enum TaskFilter {
  All = 'ALL',
  Solved = 'SOLVED',
  Unsolved = 'UNSOLVED',
}

type TasksTableProps = {
  taskStatistics: TaskStatisticsTables;
};

const TasksTable: React.FC<TasksTableProps> = ({ taskStatistics }) => {
  const intl = useIntl();
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(TaskFilter.All);

  const selectedTable = useMemo(() => {
    switch (taskFilter) {
      case TaskFilter.Solved:
        return taskStatistics.solved_tasks;
      case TaskFilter.Unsolved:
        return taskStatistics.unsolved_tasks;
      case TaskFilter.All:
      default:
        return taskStatistics.all_tasks;
    }
  }, [taskFilter, taskStatistics]);

  return (
    <Card className='mt-4'>
      test
      <CardHeader>
        <CardTitle>{intl.formatMessage({ id: 'tasks_table.title' })}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='filter1' className='whitespace-nowrap'>
                {intl.formatMessage({ id: 'tasks_table.filter' })}:
              </Label>
              <Select value={taskFilter} onValueChange={(value) => setTaskFilter(value as TaskFilter)}>
                <SelectTrigger className='w-[200px]' id='filter1'>
                  <SelectValue placeholder={intl.formatMessage({ id: 'tasks_table.select_filter' })} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TaskFilter.All}>{intl.formatMessage({ id: 'tasks_table.all_tasks' })}</SelectItem>
                  <SelectItem value={TaskFilter.Solved}>
                    {intl.formatMessage({ id: 'tasks_table.solved_tasks' })}
                  </SelectItem>
                  <SelectItem value={TaskFilter.Unsolved}>
                    {intl.formatMessage({ id: 'tasks_table.unsolved_tasks' })}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TableRenderer
            columns={selectedTable.columns}
            data={selectedTable.data.map((item) => item.data)}
            displayInCard={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksTable;
