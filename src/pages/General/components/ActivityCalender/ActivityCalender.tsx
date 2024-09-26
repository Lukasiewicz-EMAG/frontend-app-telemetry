import { useIntl } from 'react-intl';
import Cal from '../../../../components/CalendarHeatmap/CalenderHeatmap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';

interface ActivityData {
  date: string;
  minutesSpent: number;
}

export interface ActivityCalenderProps {
  data: ActivityData[];
}

export const ActivityCalender = ({ data }: ActivityCalenderProps) => {
  const intl = useIntl();

  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>{intl.formatMessage({ id: 'home.activity_calendar.title' })}</CardTitle>
        <CardDescription>
          {intl.formatMessage({ id: 'home.activity_calendar.description' })}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Cal data={data} />
      </CardContent>
    </Card>
  );
};