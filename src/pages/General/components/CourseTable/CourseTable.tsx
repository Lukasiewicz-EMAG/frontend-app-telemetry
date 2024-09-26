import { ColumnDef } from '@tanstack/react-table';
import { Course, UserStats } from '../../../../utils/frontendTypes';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { DataTable } from '../../../../components/DataTable/DataTable';
import { useIntl, FormattedMessage } from 'react-intl';

interface CourseTableProps {
  userStats: UserStats;
}

const CourseTable = ({ userStats }: CourseTableProps) => {
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
      header: intl.formatMessage({ id: 'home.table.courseName' }),
      cell: (info) => info.getValue(),
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'completedTasks',
      header: intl.formatMessage({ id: 'home.table.completedTasks' }),
      cell: (info) => info.getValue(),
      sortingFn: 'basic',
    },
    {
      accessorKey: 'generatedTasks',
      header: intl.formatMessage({ id: 'home.table.generatedTasks' }),
      cell: (info) => info.getValue(),
      sortingFn: 'basic',
    },
    {
      accessorKey: 'startDate',
      header: intl.formatMessage({ id: 'home.table.startDate' }),
      cell: (info) => info.getValue(),
      sortingFn: 'datetime',
    },
    {
      accessorKey: 'endDate',
      header: intl.formatMessage({ id: 'home.table.endDate' }),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'degree',
      header: intl.formatMessage({ id: 'home.table.degree' }),
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>
          <FormattedMessage id="home.yourCourses" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='completed'>
          <TabsList className='mt-2 mb-2 py-2 cursor-pointer'>
            <TabsTrigger value="completed">
              <FormattedMessage id="home.completed" />
            </TabsTrigger>
            <TabsTrigger value="ongoing">
              <FormattedMessage id="home.ongoing" />
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
