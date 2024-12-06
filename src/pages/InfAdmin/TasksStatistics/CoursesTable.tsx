import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { DataTable } from '../../../components/DataTable/DataTable';
import { Loader } from '../../../components/Loader/Loader';
import NoDataToDisplay from '../../../components/NoDataToDisplay/NoDataToDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
import { Course, useOldSelection } from '../../../context/CourseSelectionContext';
import { useGetData } from '../../../hooks/useGetData';

export const CoursesCheckboxes = () => {
  const { items } = useOldSelection<Course>();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleCheckboxChange = (courseId: string) => {
    setSelectedCourses((prevSelectedCourses) => {
      return prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter((id) => id !== courseId)
        : [...prevSelectedCourses, courseId];
    });
  };

  return (
    <div>
      <ul>
        {items.map((course: Course) => (
          <li key={course.id}>
            <Label className='flex items-center space-x-2 mb-2'>
              <Checkbox
                checked={selectedCourses.includes(course.id)}
                onCheckedChange={() => handleCheckboxChange(course.id)}
              />
              <span className='ml-2'>{course.name}</span>
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CoursesTable = ({ courses_ids }: { courses_ids: string[] }) => {
  const intl = useIntl();

  // Generate the courses_ids query string
  const coursesIdsQueryString = JSON.stringify(courses_ids);

  // Use the courses_ids in the API request
  const { data, isLoading, error } = useGetData<any>(`/admin_code/courses_stats?courses_ids=${coursesIdsQueryString}`);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'task_base.id',
        header: intl.formatMessage({ id: 'cud_columns.task_id', defaultMessage: 'Numer zadania' }),
      },
      {
        accessorKey: 'task_base.title',
        header: intl.formatMessage({ id: 'cud_columns.task_title', defaultMessage: 'Tytuł zadania' }),
      },
      {
        accessorKey: 'task_base.task_difficulty',
        header: intl.formatMessage({ id: 'cud_columns.task_difficulty', defaultMessage: 'Trudność zadania' }),
      },
      {
        accessorKey: 'number_of_students_which_solved_task',
        header: intl.formatMessage({
          id: 'cud_columns.students_solved',
          defaultMessage: 'Liczba studentów rozwiązujących',
        }),
      },
      {
        accessorKey: 'percent_of_students_with_hint',
        header: intl.formatMessage({ id: 'cud_columns.with_hint', defaultMessage: 'Procent studentów z podpowiedzią' }),
      },
      {
        accessorKey: 'percent_of_students_with_answer',
        header: intl.formatMessage({
          id: 'cud_columns.with_answer',
          defaultMessage: 'Procent studentów z odpowiedzią',
        }),
      },
      {
        accessorKey: 'number_of_code_compilations',
        header: intl.formatMessage({ id: 'cud_columns.code_compilations', defaultMessage: 'Liczba kompilacji kodu' }),
      },
      {
        accessorKey: 'number_of_compilation_errors',
        header: intl.formatMessage({
          id: 'cud_columns.compilation_errors',
          defaultMessage: 'Liczba błędów kompilacji',
        }),
      },
      {
        accessorKey: 'number_of_answer_checks',
        header: intl.formatMessage({ id: 'cud_columns.answer_checks', defaultMessage: 'Liczba sprawdzeń odpowiedzi' }),
      },
      {
        accessorKey: 'number_of_answer_checks_with_error',
        header: intl.formatMessage({
          id: 'cud_columns.answer_checks_errors',
          defaultMessage: 'Liczba błędów przy sprawdzaniu odpowiedzi',
        }),
      },
      {
        accessorKey: 'solving_time',
        header: intl.formatMessage({ id: 'cud_columns.solving_time', defaultMessage: 'Czas rozwiązywania' }),
        cell: ({ row }: any) => {
          const { hours, minutes } = row.original.solving_time;
          return `${hours}h ${minutes}m`;
        },
      },
    ],
    [intl],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return <NoDataToDisplay title='no_data.no_courses.title' />;
  }

  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>
          {intl.formatMessage({ id: 'admin_inf.detailed_statistics_title', defaultMessage: 'Szczegółowe statystyki' })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CoursesCheckboxes />
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default CoursesTable;
