import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import { useGetData } from '../../../hooks/query';
import { useMemo } from 'react';
import { DataTable } from '../../../components/DataTable/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';

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
                header: intl.formatMessage({ id: 'cud_columns.students_solved', defaultMessage: 'Liczba studentów rozwiązujących' }),
            },
            {
                accessorKey: 'percent_of_students_with_hint',
                header: intl.formatMessage({ id: 'cud_columns.with_hint', defaultMessage: 'Procent studentów z podpowiedzią' }),
            },
            {
                accessorKey: 'percent_of_students_with_answer',
                header: intl.formatMessage({ id: 'cud_columns.with_answer', defaultMessage: 'Procent studentów z odpowiedzią' }),
            },
            {
                accessorKey: 'number_of_code_compilations',
                header: intl.formatMessage({ id: 'cud_columns.code_compilations', defaultMessage: 'Liczba kompilacji kodu' }),
            },
            {
                accessorKey: 'number_of_compilation_errors',
                header: intl.formatMessage({ id: 'cud_columns.compilation_errors', defaultMessage: 'Liczba błędów kompilacji' }),
            },
            {
                accessorKey: 'number_of_answer_checks',
                header: intl.formatMessage({ id: 'cud_columns.answer_checks', defaultMessage: 'Liczba sprawdzeń odpowiedzi' }),
            },
            {
                accessorKey: 'number_of_answer_checks_with_error',
                header: intl.formatMessage({ id: 'cud_columns.answer_checks_errors', defaultMessage: 'Liczba błędów przy sprawdzaniu odpowiedzi' }),
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
        [intl]
    );

    // Conditional rendering after hooks are defined
    if (isLoading) {
        return <Loader />;
    }

    if (error || !data) {
        return <div>No data available</div>;
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{intl.formatMessage({ id: 'admin_inf.detailed_statistics_title', defaultMessage: 'Szczegółowe statystyki' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
};

export default CoursesTable;
