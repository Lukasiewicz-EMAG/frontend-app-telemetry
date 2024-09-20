import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/DataTable/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CUDColumns, ColumnNames } from '@/components/DataTable/Columns';
import { useIntl } from 'react-intl';
import { TaskDifficulty, TimeBasedTaskRanking } from '../types';

type TimeBasedTaskRankingColumn = {
    id: string;
    link: string;
    task_difficulty: TaskDifficulty;
    solving_time_sec: number;
};

const flattenData = (data: TimeBasedTaskRanking[]): TimeBasedTaskRankingColumn[] =>
    data.map(({ task_base: { id, link, task_difficulty }, solving_time_sec }) => ({
        id,
        link,
        task_difficulty,
        solving_time_sec,
    }));

const useTaskRankingColumns = (): ColumnDef<TimeBasedTaskRankingColumn>[] => {
    const intl = useIntl();
    return useMemo(() => {
        const cudColumns = CUDColumns<TimeBasedTaskRankingColumn>(intl);
        return [
            cudColumns[ColumnNames.Id],
            cudColumns[ColumnNames.Link],
            cudColumns[ColumnNames.SolvingTime],
            cudColumns[ColumnNames.TaskDifficulty],
        ];
    }, [intl]);
};

type TaskRankingProps = {
    data: TimeBasedTaskRanking[];
};

const TaskRanking: React.FC<TaskRankingProps> = ({ data }) => {
    const intl = useIntl();
    const columns = useTaskRankingColumns();
    const flattenedData = useMemo(() => flattenData(data), [data]);

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{intl.formatMessage({ id: 'details.task_ranking.title' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={flattenedData} />
            </CardContent>
        </Card>
    );
};

export default TaskRanking;