import { useIntl } from 'react-intl';
import { InteractiveChart } from '../../../../../components/InteractiveChart/InteractiveChart';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../components/ui/card';
import { UserStats } from '../../../../../utils/frontendTypes';

export const TimeSpentChart = ({ dataPoints }: UserStats['timeSpentInCourses']) => {
  const intl = useIntl();
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>
          {intl.formatMessage({ id: 'home.time_spent_chart.title' })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InteractiveChart chartData={dataPoints} />
      </CardContent>
    </Card>
  );
};
