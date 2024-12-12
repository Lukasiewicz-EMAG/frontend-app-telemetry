import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import { StatsCards } from '../../../components/StatsCard/StatsCards';
import { useGetData } from '../../../hooks/useGetData';
import NoDataToDisplay from '../../../components/NoDataToDisplay/NoDataToDisplay';
import TableRenderer from '../../../components/DataTable/TableRenderer';
import TimeInCourse from './TimeInCourse';
import SolvedTasksChart from './SolvedTasks';

export const StudentStatistics = () => {
    const intl = useIntl();
    const { data, isLoading, error } = useGetData<any>('/admin/students_stats');

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <NoDataToDisplay title='no_data.default.title' desc='no_data.default.desc' />;
    }

    const statsData = data.students_top;
    const detailedStats = data?.students_detailed_stats;

    // For demonstration purposes, a placeholder transformation for time spent in course
    const transformTimeSpent = (detailedStats: any) => {

        return {
            data_points: [
                {
                    "date": "2024-06-10",
                    "minutes_spent": 45
                },
                {
                    "date": "2024-06-11",
                    "minutes_spent": 30
                },
                {
                    "date": "2024-06-12",
                    "minutes_spent": 50
                }
            ]
        };
    };

    // For demonstration purposes, a placeholder transformation for solved tasks
    const transformSolvedTasks = (detailedStats: any) => {
        return {
            data_points: [
                {
                    "date": "2024-06-10",
                    "tasks_solved": 10
                },
                {
                    "date": "2024-06-11",
                    "tasks_solved": 15
                },
                {
                    "date": "2024-06-12",
                    "tasks_solved": 25
                }
            ]
        };
    };

    const timeSpentInCourse = transformTimeSpent(detailedStats);
    const solvedTasksData = transformSolvedTasks(detailedStats);

    return (
        <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
            <h1 className="text-2xl font-bold">{intl.formatMessage({ id: 'admin_inf.general_statistics' })}</h1>
            <StatsCards stats={statsData} />
            <TableRenderer
                data={detailedStats.data.map((data: any) => data.data)}
                columns={detailedStats.columns}
                label={detailedStats.label}
            />
            {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <TimeInCourse time_spent_in_course={timeSpentInCourse} />
                <SolvedTasksChart solved_tasks={solvedTasksData} />
            </div> */}
        </div>
    );
};

export default StudentStatistics;
