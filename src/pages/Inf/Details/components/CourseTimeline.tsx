import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useIntl } from "react-intl";
import Cal, { ActivityData } from "../../../../components/CalendarHeatmap/CalenderHeatmap";
import { InteractiveChartProps, InteractiveChart } from "../../../../components/InteractiveChart/InteractiveChart";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";

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
                        <InteractiveChart chartData={timeLineData} />
                    </TabsContent>
                    <TabsContent value='calendar'>
                        <Cal data={calendarData} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default CourseTimeline;