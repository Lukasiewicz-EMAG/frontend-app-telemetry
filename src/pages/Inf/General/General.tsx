import { ActivityCalender } from './components/ActivityCalender/ActivityCalender';
import { CourseTable } from './components/CourseTable/CourseTable';
import { SolvedTaskInfo } from './components/SolvedTaskInfo/SolvedTaskInfo';
import { TimeSpentChart } from './components/TimeSpentChart/TimeSpentChart';
import { Loader } from '../../../components/Loader/Loader';
import { useGetData } from '../../../hooks/query';
import { mapAPIUserStatsToUserStats } from '../../../utils/dataMapper';
import { APIUserStats } from '../../../utils/backendTypes';

export const InfGeneral = () => {
  const { data: userStats, isLoading, error } = useGetData<APIUserStats>('/student/general_stats');
  if (isLoading) {
    return <Loader />;
  }

  if (error || !userStats) {
    return <div>No data available</div>;
  }

  const mappedUserStats = mapAPIUserStatsToUserStats(userStats);

  return (
    <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
      <CourseTable userStats={mappedUserStats} />
      <SolvedTaskInfo consecutiveDays={mappedUserStats.solvedTaskSeries.consecutiveDays} />
      <TimeSpentChart dataPoints={mappedUserStats.timeSpentInCourses.dataPoints} />
      <ActivityCalender data={mappedUserStats.timeSpentInCourses.dataPoints} />
    </div>
  );
};

export default InfGeneral;