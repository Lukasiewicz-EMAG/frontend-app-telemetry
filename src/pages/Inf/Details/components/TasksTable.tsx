import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from '@/components/DataTable/DataTable';
import { useIntl } from 'react-intl';
import { ColumnDefinition, TaskStatisticsTables } from '../../Referral/types';
import TableRenderer from '../../../../components/DataTable/TableRenderer';

enum TaskFilter {
  All = "ALL",
  Solved = "SOLVED",
  Unsolved = "UNSOLVED"
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

  //TODO remove when backend returns translate_text column
  const mappedColumns: ColumnDefinition[] = selectedTable.columns.map(column => {
    if (column.field === 'statistic') {
      return { ...column, column_type: 'translate_text' };
    }
    return column;
  });

  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>{intl.formatMessage({ id: 'tasks_table.title' })}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter1" className="whitespace-nowrap">{intl.formatMessage({ id: 'tasks_table.filter' })}:</Label>
              <Select value={taskFilter} onValueChange={(value) => setTaskFilter(value as TaskFilter)}>
                <SelectTrigger className="w-[200px]" id="filter1">
                  <SelectValue placeholder={intl.formatMessage({ id: 'tasks_table.select_filter' })} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TaskFilter.All}>{intl.formatMessage({ id: 'tasks_table.all_tasks' })}</SelectItem>
                  <SelectItem value={TaskFilter.Solved}>{intl.formatMessage({ id: 'tasks_table.solved_tasks' })}</SelectItem>
                  <SelectItem value={TaskFilter.Unsolved}>{intl.formatMessage({ id: 'tasks_table.unsolved_tasks' })}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TableRenderer columns={mappedColumns} data={selectedTable.data.map(item => item.data)} displayInCard={false} />
        </div>
      </CardContent>
    </Card>
  )
}

export default TasksTable;
