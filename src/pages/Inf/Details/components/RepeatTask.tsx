import { Button } from "../../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { TaskBase } from "../types";
import { useIntl } from "react-intl";

interface RepeatTaskProps {
    taskToRepeat: TaskBase;
}

const RepeatTask = ({ taskToRepeat }: RepeatTaskProps) => {
    const intl = useIntl();

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{intl.formatMessage({ id: 'details.repeat_task.title' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                    {intl.formatMessage({ id: 'details.repeat_task.description' })}
                </p>
                <Button
                    variant="outline"
                    onClick={() => window.open(taskToRepeat.link, '_blank')}
                >
                    {intl.formatMessage({ id: 'details.repeat_task.button' }, { id: taskToRepeat.id })}
                </Button>
            </CardContent>
        </Card>
    )
}

export default RepeatTask;