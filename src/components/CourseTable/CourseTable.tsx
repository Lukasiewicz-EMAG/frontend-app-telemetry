import { ColumnDef } from '@tanstack/react-table';
import { Course, UserStats } from '../../utils/frontendTypes';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { DataTable } from '../DataTable/DataTable';

const courseColumns: ColumnDef<Course, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => info.getValue(),
    sortingFn: 'auto',
  },
  {
    accessorKey: 'name',
    header: 'Course Name',
    cell: (info) => info.getValue(),
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'completedTasks',
    header: 'Completed Tasks',
    cell: (info) => info.getValue(),
    sortingFn: 'basic',
  },
  {
    accessorKey: 'generatedTasks',
    header: 'Generated Tasks',
    cell: (info) => info.getValue(),
    sortingFn: 'basic',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: (info) => info.getValue(),
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'degree',
    header: 'Degree',
    cell: (info) => info.getValue(),
  },
] as const;

interface CourseTableProps {
  userStats: UserStats;
}

export const CourseTable = ({ userStats }: CourseTableProps) => {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>Twoje kursy z matematyki</CardTitle>
      </CardHeader>
      <CardContent className='mt-4'>
        <Tabs defaultValue='completed'>
          <TabsList className='mt-2 mb-2 py-2 cursor-pointer'>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
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
