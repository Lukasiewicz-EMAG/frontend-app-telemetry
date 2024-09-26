import { UserStats } from '../../../../utils/frontendTypes';
import { InteractiveChart } from '../../../../components/InteractiveChart/InteractiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { useIntl } from 'react-intl';

export const TimeSpentChart = ({ dataPoints }: UserStats['timeSpentInCourses']) => {
  const intl = useIntl();
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>
          {intl.formatMessage({ id: 'home.timeSpentChart.title' })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InteractiveChart chartData={dataPoints} />
      </CardContent>
    </Card>
  );
};
