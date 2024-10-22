import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useIntl } from 'react-intl';
import { DataTable } from "@/components/DataTable/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DetailedStatisticsProps } from './types';
import { ColumnNames, CUDColumns } from '@/components/DataTable/Columns';

interface StudentStatistics {
    student_base: {
        student_id: string;
        student_name: string;
    };
    student_registration_date: string;
    last_activity_date: string;
    total_time_spent: {
        hours: number;
        minutes: number;
    };
    started_courses: number;
    finished_courses: number;
    solved_tasks: number;
    opened_generated_tasks: number;
}

export const DetailedStatistics = ({ detailed_students_stats }: DetailedStatisticsProps) => {
    const intl = useIntl();

    const columns: ColumnDef<StudentStatistics>[] = useMemo(
        () => [
            {
                accessorKey: 'student_base.student_id',
                header: intl.formatMessage({ id: 'cud_columns.id', defaultMessage: 'Numer zadania' }),
            },
            {
                accessorKey: 'student_base.student_name',
                header: intl.formatMessage({ id: 'cud_columns.student_name', defaultMessage: 'Nazwa studenta' }),
            },
            {
                accessorKey: 'student_registration_date',
                header: intl.formatMessage({ id: 'cud_columns.registration_date', defaultMessage: 'Data rejestracji' }),
            },
            {
                accessorKey: 'last_activity_date',
                header: intl.formatMessage({ id: 'cud_columns.last_activity_date', defaultMessage: 'Data ostatniej aktywności' }),
            },
            {
                accessorKey: 'total_time_spent',
                header: intl.formatMessage({ id: 'cud_columns.total_time_spent', defaultMessage: 'Łączny czas spędzony' }),
                cell: ({ row }) => {
                    const { hours, minutes } = row.original.total_time_spent;
                    return `${hours}h ${minutes}m`;
                },
            },
            {
                accessorKey: 'started_courses',
                header: intl.formatMessage({ id: 'cud_columns.started_courses', defaultMessage: 'Rozpoczęte kursy' }),
            },
            {
                accessorKey: 'finished_courses',
                header: intl.formatMessage({ id: 'cud_columns.finished_courses', defaultMessage: 'Ukończone kursy' }),
            },
            {
                accessorKey: 'solved_tasks',
                header: intl.formatMessage({ id: 'cud_columns.solved_tasks', defaultMessage: 'Rozwiązane zadania' }),
            },
            {
                accessorKey: 'opened_generated_tasks',
                header: intl.formatMessage({ id: 'cud_columns.opened_generated_tasks', defaultMessage: 'Otwarte wygenerowane zadania' }),
            },
        ],
        [intl]
    );


    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{intl.formatMessage({ id: 'admin_inf.detailed_statistics_title', defaultMessage: 'Szczegółowe statystyki' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={detailed_students_stats} />
            </CardContent>
        </Card>
    );
};

export default DetailedStatistics;
