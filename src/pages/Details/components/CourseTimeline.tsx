import { useIntl } from "react-intl";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";

const CourseTimeline = () => {
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
                        <p>TODO: zrobic przebieg czasowy</p>
                    </TabsContent>
                    <TabsContent value='calendar'>
                        <p>TODO: zrobic kalendarz</p>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default CourseTimeline;