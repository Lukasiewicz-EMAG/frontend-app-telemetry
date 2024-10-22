import { useIntl } from "react-intl";
import Cal, { ActivityData } from "../../../../components/CalendarHeatmap/CalenderHeatmap";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { InteractiveChart, InteractiveChartProps } from "../../../../components/Charts/InteractiveChart/InteractiveChart";
import { CustomTooltipProps } from "../../../../components/Charts/CustomToolTip";

interface CourseTimelineProps {
    calendarData: ActivityData[];
    timeLineData: InteractiveChartProps['chartData'];
}

const CourseTimeline: React.FC<CourseTimelineProps> = ({ timeLineData, calendarData }) => {
    const intl = useIntl();


    return (
        <Card className="mt-4">
            <CardHeader className='pb-3'>
                <CardTitle>
                    {intl.formatMessage({ id: 'details.course_timeline.title' })}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue='timeline'>
                    <TabsList className='mt-2 mb-2 py-2 cursor-pointer'>
                        <TabsTrigger value="timeline">
                            {intl.formatMessage({ id: 'details.course_timeline.timeline' })}
                        </TabsTrigger>
                        <TabsTrigger value="calendar">
                            {intl.formatMessage({ id: 'details.course_timeline.calendar' })}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='timeline'>
                        <InteractiveChart
                            chartData={timeLineData}
                        />
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
