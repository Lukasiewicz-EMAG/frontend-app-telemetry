import { ColumnDef } from '@tanstack/react-table';
import { FormattedMessage, useIntl } from 'react-intl';
import { DataTable } from '../../../../../components/DataTable/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Course, UserStats } from '../../../../../utils/frontendTypes';
interface CourseTableProps {
  userStats: UserStats;
  type?: 'math' | 'inf';
}

const CourseTable = ({ userStats, type = 'inf' }: CourseTableProps) => {
  const intl = useIntl();

  const courseColumns: ColumnDef<Course, unknown>[] = [
    {
      accessorKey: 'id',
      header: intl.formatMessage({ id: 'home.table.id' }),
      cell: (info) => info.getValue(),
      sortingFn: 'auto',
    },
    {
      accessorKey: 'name',
      header: intl.formatMessage({ id: 'home.table.course_name' }),
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'completedTasks',
      header: intl.formatMessage({ id: 'home.table.completed_tasks' }),
      cell: (info) => info.getValue(),
      sortingFn: 'basic',
    },
    {
      accessorKey: 'generatedTasks',
      header: intl.formatMessage({ id: 'home.table.generated_tasks' }),
      cell: (info) => info.getValue(),
      sortingFn: 'basic',
    },
    {
      accessorKey: 'startDate',
      header: intl.formatMessage({ id: 'home.table.start_date' }),
      cell: (info) => info.getValue(),
      sortingFn: 'datetime',
    },
    {
      accessorKey: 'lastActivityDate',
      header: intl.formatMessage({ id: 'home.table.last_activity_date' }),
      cell: (info) => info.getValue() || 'N/A',
    },
    {
      accessorKey: 'completionPercentage',
      header: intl.formatMessage({ id: 'home.table.completion_percentage' }),
      cell: (info) => `${info.getValue()}%` || 'N/A',
    },
  ];

  const isMath = type === 'math';

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>
          <FormattedMessage
            id='home.your_courses'
            values={{
              type: isMath ? intl.formatMessage({ id: 'home.type.math' }) : intl.formatMessage({ id: 'home.type.inf' }),
            }}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={courseColumns} data={userStats.courseStats.completedCourses} />
      </CardContent>
    </Card>
  );
};

export { CourseTable };
