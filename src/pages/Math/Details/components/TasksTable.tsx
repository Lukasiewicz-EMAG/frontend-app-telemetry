import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { ColumnNames, CUDColumns } from '../../../../components/DataTable/Columns';
import { DataTable } from '../../../../components/DataTable/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Label } from '../../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { TaskStats } from '../types';

enum TaskFilter {
  All = 'ALL',
  Solved = 'SOLVED',
  Unsolved = 'UNSOLVED',
}

type ColumnTaskStats = {
  statistic: string;
  sum: number;
  average: number;
};

type TasksTableProps = {
  allTasksStats: TaskStats;
  solvedTasksStats: TaskStats;
  unsolvedTasksStats: TaskStats;
};

export const TasksTable: React.FC<TasksTableProps> = ({ allTasksStats, solvedTasksStats, unsolvedTasksStats }) => {
  const intl = useIntl();
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(TaskFilter.All);

  const data = useMemo(() => {
    const statsMap = {
      [TaskFilter.All]: allTasksStats,
      [TaskFilter.Solved]: solvedTasksStats,
      [TaskFilter.Unsolved]: unsolvedTasksStats,
    };

    const selectedStats = statsMap[taskFilter];

    return [
      {
        statistic: intl.formatMessage({ id: 'tasks_table.num_correct_re' }),
        sum: selectedStats.num_correct_re,
        average: selectedStats.avg_correct_re_per_task,
      },
      {
        statistic: intl.formatMessage({ id: 'tasks_table.num_correct_swe' }),
        sum: selectedStats.num_correct_swe,
        average: selectedStats.avg_correct_swe_per_task,
      },
      {
        statistic: intl.formatMessage({ id: 'tasks_table.num_incorrect_re' }),
        sum: selectedStats.num_incorrect_re,
        average: selectedStats.avg_incorrect_re_per_task,
      },
      {
        statistic: intl.formatMessage({ id: 'tasks_table.num_incorrect_swe' }),
        sum: selectedStats.num_incorrect_swe,
        average: selectedStats.avg_incorrect_swe_per_task,
      },
      {
        statistic: intl.formatMessage({ id: 'tasks_table.num_taken_hint' }),
        sum: selectedStats.num_taken_hint,
        average: selectedStats.avg_taken_hint_per_task,
      },
    ];
  }, [taskFilter, allTasksStats, solvedTasksStats, unsolvedTasksStats, intl]);

  const columns: ColumnDef<ColumnTaskStats>[] = useMemo(() => {
    const cudColumns = CUDColumns<ColumnTaskStats>(intl);
    return [cudColumns[ColumnNames.Statistic], cudColumns[ColumnNames.Sum], cudColumns[ColumnNames.Average]];
  }, [intl]);

  return (
    <Card className='mt-4'>
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
          <DataTable columns={columns} data={data} />
        </div>
      </CardContent>
    </Card>
  );
};
