import { UserStats } from '../../utils/frontendTypes';
import { InteractiveChart } from '../InteractiveChart/InteractiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const TimeSpentChart = ({ dataPoints }: UserStats['timeSpentInCourses']) => {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Time Spent in Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <InteractiveChart chartData={dataPoints} />
      </CardContent>
    </Card>
  );
};
