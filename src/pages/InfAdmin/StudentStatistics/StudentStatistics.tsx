import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import DetailedStatistics from './DetailedStatistics';
import TimeInCourse from './TimeInCourse';
import { SolvedTasksChart } from './SolvedTasks';
import { StudentStatisticsResponse } from './types';
import { Stat } from '../../../components/StatsCard/types';
import { OldCards } from '../../../components/StatsCard/StatsCards';
import { useGetData } from '../../../hooks/useGetData';
import NoDataToDisplay from '../../../components/NoDataToDisplay/NoDataToDisplay';

export const StudentStatistics = () => {
    const intl = useIntl();
    const { data, isLoading, error } = useGetData<StudentStatisticsResponse>('/admin_code/students_stats');

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <NoDataToDisplay title='no_data.default.title' desc='no_data.default.desc' />;
    }

    const statsData: Stat[] = [
        {
            title: intl.formatMessage({ id: 'admin_inf.best_user' }),
            value: data?.best_students_stats?.best_student?.student_name || 'N/A',
        },
        {
            title: intl.formatMessage({ id: 'admin_inf.most_time_spent' }),
            value: data?.best_students_stats?.most_time_spent?.user_name?.student_name || 'N/A',
            progress: data?.best_students_stats?.most_time_spent?.most_time_spent,
        },
        {
            title: intl.formatMessage({ id: 'admin_inf.longest_streak' }),
            value: data?.best_students_stats?.longest_streak?.user_name?.student_name || 'N/A',
            progress: data?.best_students_stats?.longest_streak?.longest_streak,
        },
        {
            title: intl.formatMessage({ id: 'admin_inf.most_courses_completed' }),
            value: data?.best_students_stats?.most_courses_completed?.user_name?.student_name || 'N/A',
            progress: data?.best_students_stats?.most_courses_completed?.most_completed,
        },
        {
            title: intl.formatMessage({ id: 'admin_inf.most_tasks_solved' }),
            value: data?.best_students_stats?.most_tasks_solved?.user_name?.student_name || 'N/A',
            progress: data?.best_students_stats?.most_tasks_solved?.most_completed,
        },
        {
            title: intl.formatMessage({ id: 'admin_inf.most_generated_tasks_visited' }),
            value: data?.best_students_stats?.most_generated_tasks_visited?.user_name?.student_name || 'N/A',
            progress: data?.best_students_stats?.most_generated_tasks_visited?.most_completed,
        }
    ];

    const detailedStats = data?.detailed_students_stats;
    const timeSpentInCourse = data?.time_spent_in_course;
    const solvedTasksData = data?.solved_tasks;

    return (
        <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
            <h1 className="text-2xl font-bold">{intl.formatMessage({ id: 'admin_inf.general_statistics' })}</h1>
            <OldCards stats={statsData} />
            <DetailedStatistics detailed_students_stats={detailedStats || []} />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <TimeInCourse time_spent_in_course={timeSpentInCourse} />
                <SolvedTasksChart solved_tasks={solvedTasksData} />
            </div>
        </div>
    );
};

export default StudentStatistics;
