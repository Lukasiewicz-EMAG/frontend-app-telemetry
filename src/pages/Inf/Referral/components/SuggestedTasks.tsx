import { useMemo } from "react";
import { useIntl } from 'react-intl';
import { DataTable } from "@/components/DataTable/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnNames, CUDColumns } from "@/components/DataTable/Columns";
import { Task } from "../types";

type SuggestedTasksProps = {
    tasks: Task[];
};

const SuggestedTasks: React.FC<SuggestedTasksProps> = ({ tasks }) => {
    const intl = useIntl();

    const columns: ColumnDef<Task>[] = useMemo(() => {
        const cudColumns = CUDColumns<Task>(intl);
        return [
            cudColumns[ColumnNames.Id],
            cudColumns[ColumnNames.Link],
            cudColumns[ColumnNames.TaskDifficulty],
        ];
    }, [intl]);

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>
                    {intl.formatMessage({ id: 'referral.suggested_tasks' })}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">
                    {intl.formatMessage({ id: 'referral.suggested_tasks_description' })}
                </p>

                <DataTable columns={columns} data={tasks} />
            </CardContent>
        </Card>
    );
};

export default SuggestedTasks;
