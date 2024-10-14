import { ColumnDef } from '@tanstack/react-table';
import { FormattedMessage, useIntl } from 'react-intl';
import { DataTable } from '../../../../../components/DataTable/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../components/ui/tabs';
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
      accessorKey: 'endDate',
      header: intl.formatMessage({ id: 'home.table.end_date' }),
      cell: (info) => info.getValue() || 'N/A',
    },
    {
      accessorKey: 'degree',
      header: intl.formatMessage({ id: 'home.table.degree' }),
      cell: (info) => info.getValue() || 'N/A',
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
        <Tabs defaultValue='completed'>
          <TabsList className='mt-2 mb-2 py-2 cursor-pointer'>
            <TabsTrigger value='completed'>
              <FormattedMessage id='home.completed' />
            </TabsTrigger>
            <TabsTrigger value='ongoing'>
              <FormattedMessage id='home.ongoing' />
            </TabsTrigger>
          </TabsList>
          <TabsContent value='completed'>
            <DataTable columns={courseColumns} data={userStats.courseStats.completedCourses} />
          </TabsContent>
          <TabsContent value='ongoing'>
            <DataTable columns={courseColumns} data={userStats.courseStats.ongoingCourses} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export { CourseTable };
