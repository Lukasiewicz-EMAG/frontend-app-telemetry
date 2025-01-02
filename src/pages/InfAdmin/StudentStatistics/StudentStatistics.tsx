import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import { StatsCards } from '../../../components/StatsCard/StatsCards';
import { useGetData } from '../../../hooks/useGetData';
import NoDataToDisplay from '../../../components/NoDataToDisplay/NoDataToDisplay';
import TableRenderer from '../../../components/DataTable/TableRenderer';

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
