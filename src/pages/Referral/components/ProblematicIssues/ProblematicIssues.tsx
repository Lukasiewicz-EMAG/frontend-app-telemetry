import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { useMemo } from "react";
import { useIntl } from "react-intl";
import { RecommendationData } from "../../types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../../components/DataTable/DataTable";

// Define the props to accept the ranking data
interface ProblematicIssuesProps {
    timeBasedTaskRanking: RecommendationData['recommendations']['time_based_task_ranking'];
    errorBasedTaskRanking: RecommendationData['recommendations']['error_based_task_ranking'];
}

export default function ProblematicIssues({ timeBasedTaskRanking, errorBasedTaskRanking }: ProblematicIssuesProps) {
    const intl = useIntl();

    // Define columns for Time-based task ranking
    const timeColumns: ColumnDef<typeof timeBasedTaskRanking[0]>[] = useMemo(() => [
        {
            accessorKey: 'course_base.name',
            header: intl.formatMessage({ id: 'referral.course_name' }),
        },
        {
            accessorKey: 'solving_time.task_base.link',
            header: intl.formatMessage({ id: 'referral.task_links' }),
            //cell: info => <a href={info.getValue()} className="text-blue-600 hover:underline">{info.getValue()}</a>,
        },
        {
            accessorKey: 'solving_time.solving_time_sec',
            header: intl.formatMessage({ id: 'referral.your_time_seconds' }),
        },
        {
            accessorKey: 'avg_students_solving_time',
            header: intl.formatMessage({ id: 'referral.avg_students_time_seconds' }),
        },
        {
            accessorKey: 'solving_time_diff',
            header: intl.formatMessage({ id: 'referral.time_diff' }),
        }
    ], [intl]);

    // Define columns for Error-based task ranking
    const errorColumns: ColumnDef<typeof errorBasedTaskRanking[0]>[] = useMemo(() => [
        {
            accessorKey: 'course_base.name',
            header: intl.formatMessage({ id: 'referral.course_name' }),
        },
        {
            accessorKey: 'error_rate.task_base.link',
            header: intl.formatMessage({ id: 'referral.task_links' }),
            //cell: info => <a href={info.getValue()} className="text-blue-600 hover:underline">{info.getValue()}</a>,
        },
        {
            accessorKey: 'error_rate.num_errors',
            header: intl.formatMessage({ id: 'referral.your_errors' }),
        },
        {
            accessorKey: 'avg_students_error_rate',
            header: intl.formatMessage({ id: 'referral.avg_students_errors' }),
        },
        {
            accessorKey: 'error_rate_diff',
            header: intl.formatMessage({ id: 'referral.errors_diff' }),
        }
    ], [intl]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Problematyczne zagadnienia</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">
                    Poniżej zamieściliśmy analizę wykonanych przez Ciebie zadań na tle innych uczniów, którzy również wykonywali te zadania. Analiza została oparta o dwie główne statystyki:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>czas wykonania zadań</li>
                    <li>liczba pomyłek przy wykonywaniu zadania</li>
                </ul>
                <p className="mb-4">
                    Dane te zostały porównane z uśrednionymi statystykami pozostałych uczestników kursów. W oparciu o te dane, poniżej przedstawiliśmy dla Ciebie rekomendacje zadań, które powinieneś powtórzyć w celu utrwalenia wiedzy. Zadania są uszeregowane według różnicy pomiędzy Twoim wynikiem a średnią.
                </p>

                {/* Time-based task table */}
                <h3 className="text-xl font-semibold mb-4">Czas wykonania zadań</h3>
                <DataTable columns={timeColumns} data={timeBasedTaskRanking} />

                {/* Error-based task table */}
                <h3 className="text-xl font-semibold mt-6 mb-4">Liczba pomyłek</h3>
                <DataTable columns={errorColumns} data={errorBasedTaskRanking} />
            </CardContent>
        </Card>
    );
}
