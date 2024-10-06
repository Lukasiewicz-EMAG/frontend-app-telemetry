import { useIntl } from 'react-intl';
import { SolvedTaskSeries } from '@/utils/frontendTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SolvedTaskInfo = ({ consecutiveDays }: SolvedTaskSeries) => {
  const intl = useIntl();

  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>
          {intl.formatMessage({ id: 'home.solved_task_info.consecutive_days' })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='leading-7 [&:not(:first-child)]:mt-6 text-center'>
          {intl.formatMessage(
            { id: 'home.solved_task_info.consecutive_days_description' },
            { days: consecutiveDays }
          )}
        </p>
        <h2 className='mt-4 text-center text-2xl lg:text-4xl'>{consecutiveDays}</h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6 text-center'>
          {intl.formatMessage({ id: 'home.solved_task_info.next_task' })}
        </p>
      </CardContent>
    </Card>
  );
};
