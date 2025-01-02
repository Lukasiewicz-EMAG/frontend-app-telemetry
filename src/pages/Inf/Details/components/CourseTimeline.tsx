import { useIntl } from 'react-intl';
import Cal, { ActivityData } from '../../../../components/CalendarHeatmap/CalenderHeatmap';
import {
  InteractiveChart,
  InteractiveChartProps,
} from '../../../../components/Charts/InteractiveChart/InteractiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

interface CourseTimelineProps {
  calendarData: ActivityData[];
  timeLineData: InteractiveChartProps['chartData'];
}

const CourseTimeline: React.FC<CourseTimelineProps> = ({ timeLineData, calendarData }) => {
  const intl = useIntl();

  return (
    <Card className='mt-4'>
      <CardHeader className='pb-3'>
        <CardTitle>{intl.formatMessage({ id: 'details.course_timeline.title' })}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='timeline'>
          <TabsList className='mt-2 mb-2 py-2 cursor-pointer text-foreground'>
            <TabsTrigger className='text-foreground hover:text-foreground/80' value='timeline'>
              {intl.formatMessage({ id: 'details.course_timeline.timeline' })}
            </TabsTrigger>
            <TabsTrigger className='text-foreground hover:text-foreground/80' value='calendar'>
              {intl.formatMessage({ id: 'details.course_timeline.calendar' })}
            </TabsTrigger>
          </TabsList>
          <TabsContent value='timeline'>
            <InteractiveChart chartData={timeLineData} />
          </TabsContent>
          <TabsContent className='flex justify-center' value='calendar'>
            <Cal data={calendarData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CourseTimeline;
