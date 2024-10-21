import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useIntl } from 'react-intl';
import { DataTable } from "@/components/DataTable/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ColumnNames, CUDColumns } from "@/components/DataTable/Columns";
import { TaskBase } from "../types";

interface VisitedButNotSolvedTasksProps {
    tasks: TaskBase[];
}

const VisitedButNotSolvedTasks: React.FC<VisitedButNotSolvedTasksProps> = ({ tasks }) => {
    const intl = useIntl();

    const columns: ColumnDef<TaskBase>[] = useMemo(
        () => {
            const cudColumns = CUDColumns<TaskBase>(intl);
            return [
                cudColumns[ColumnNames.Id],
                cudColumns[ColumnNames.Link],
                cudColumns[ColumnNames.TaskDifficulty],
            ]
        },
        [intl]
    );

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{intl.formatMessage({ id: 'details.visited_but_not_solved.title' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={tasks} />
            </CardContent>
        </Card>
    )
}

export default VisitedButNotSolvedTasks;