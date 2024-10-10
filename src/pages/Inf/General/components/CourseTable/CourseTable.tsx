import { ColumnDef } from '@tanstack/react-table';
import { useIntl, FormattedMessage } from 'react-intl';
import { DataTable } from '../../../../../components/DataTable/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../components/ui/card';
import { UserStats } from '../../../../../utils/frontendTypes';
import { Course } from '../../../Referral/types';
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
    // {
    //   accessorKey: 'endDate',
    //   header: intl.formatMessage({ id: 'home.table.end_date' }),
    //   cell: (info) => info.getValue(),
    // },
    {
      accessorKey: 'degree',
      header: intl.formatMessage({ id: 'home.table.degree' }),
      cell: (info) => info.getValue(),
    },
  ] as const;

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>
          <FormattedMessage id="home.your_courses" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO fix this */}
        {/* <Tabs defaultValue='completed'>
          <TabsList className='mt-2 mb-2 py-2 cursor-pointer'>
            <TabsTrigger value="completed">
              <FormattedMessage id="home.completed" />
            </TabsTrigger>
            <TabsTrigger value="ongoing">
              <FormattedMessage id="home.ongoing" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value='completed'> */}
        {/* <DataTable columns={courseColumns} data={userStats.courseStats.completedCourses} /> */}
        {/* </TabsContent>
          <TabsContent value='ongoing'>
            <DataTable columns={courseColumns} data={userStats.courseStats.ongoingCourses} />
          </TabsContent>
        </Tabs> */}
      </CardContent>
    </Card>
  );
};

export { CourseTable };
