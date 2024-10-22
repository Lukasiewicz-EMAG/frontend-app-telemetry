import { useIntl } from 'react-intl';
import { TimeSpentInCourse } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import InteractiveChart from '../../components/Charts/InteractiveChart/InteractiveChart';

type TimeInCourseProps = {
    time_spent_in_course: TimeSpentInCourse;
};

export const TimeInCourse = ({ time_spent_in_course }: TimeInCourseProps) => {
    const intl = useIntl();

    const chartData = time_spent_in_course.data_points.map(point => ({
        date: point.date,
        minutesSpent: point.minutes_spent
    }));

    return (
        <Card className="w-full max-w-3xl border-2 border-gray-200">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>{intl.formatMessage({ id: 'admin_inf.total_time_spent', defaultMessage: 'Sumaryczny czas spędzony w kursach' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <InteractiveChart chartData={chartData} />
                </div>
            </CardContent>
        </Card>
    );
}

export default TimeInCourse;