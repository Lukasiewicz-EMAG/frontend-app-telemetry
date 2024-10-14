import { useQuery } from '@tanstack/react-query';
import { ActivityCalender } from './components/ActivityCalender/ActivityCalender';
import { CourseTable } from './components/CourseTable/CourseTable';
import { SolvedTaskInfo } from './components/SolvedTaskInfo/SolvedTaskInfo';
import { TimeSpentChart } from './components/TimeSpentChart/TimeSpentChart';
import { APIUserStats } from '../../../utils/backendTypes';
import { mapAPIUserStatsToUserStats } from '../../../utils/dataMapper';
import { UserStats } from '../../../utils/frontendTypes';
import { HttpClient } from '../../../utils/httpClient';
import { Loader } from '../../../components/Loader/Loader';

export const InfGeneral = () => {
  const httpClient = new HttpClient('/api');

  const { data: userStats, isLoading, error } = useQuery<UserStats>(
    ['general-stats-inf'],
    async () => {
      const response = await httpClient.get<APIUserStats>('/student/general_stats');
      return mapAPIUserStatsToUserStats(response.data);
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error || !userStats) {
    return <div>No data available</div>;
  }

  return (
    <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
      <CourseTable userStats={userStats} />
      <SolvedTaskInfo consecutiveDays={userStats.solvedTaskSeries.consecutiveDays} />
      <TimeSpentChart dataPoints={userStats.timeSpentInCourses.dataPoints} />
      <ActivityCalender data={userStats.timeSpentInCourses.dataPoints} />
    </div>
  );
};