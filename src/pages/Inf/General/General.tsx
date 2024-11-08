import { ActivityCalender } from './components/ActivityCalender/ActivityCalender';
import { SolvedTaskInfo } from './components/SolvedTaskInfo/SolvedTaskInfo';
import { TimeSpentChart } from './components/TimeSpentChart/TimeSpentChart';
import { Loader } from '../../../components/Loader/Loader';
import { mapAPIUserStatsToUserStats } from '../../../utils/dataMapper';
import { APIUserStats } from '../../../utils/backendTypes';
import { useGetData } from '../../../hooks/useGetData';
import TableRenderer from '../../../components/DataTable/TableRenderer';

export const InfGeneral = () => {
  const { data: userStats, isLoading, error } = useGetData<APIUserStats>('/student/general_stats');
  if (isLoading) {
    return <Loader />;
  }

  console.log('/student/general_stats', userStats)
  if (error || !userStats) {
    return <div>No data available</div>;
  }

  const mappedUserStats = mapAPIUserStatsToUserStats(userStats);

  return (
    <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
      <TableRenderer
        data={userStats.course_stats.data.map((data: any) => data.data)}
        columns={userStats.course_stats.columns}
        label={userStats.course_stats.label}
      />
      <SolvedTaskInfo consecutiveDays={mappedUserStats.solvedTaskSeries.consecutiveDays} />
      <TimeSpentChart dataPoints={mappedUserStats.timeSpentInCourses.dataPoints} />
      <ActivityCalender data={mappedUserStats.timeSpentInCourses.dataPoints} />
    </div>
  );
};

export default InfGeneral;