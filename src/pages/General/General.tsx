import { useEffect, useState } from 'react';
import { ActivityCalender } from './components/ActivityCalender/ActivityCalender';
import { CourseTable } from './components/CourseTable/CourseTable';
import { Loader } from '../../components/Loader/Loader';
import { SolvedTaskInfo } from './components/SolvedTaskInfo/SolvedTaskInfo';
import { TimeSpentChart } from './components/TimeSpentChart/TimeSpentChart';
import { APIUserStats } from '../../utils/backendTypes';
import { mapAPIUserStatsToUserStats } from '../../utils/dataMapper';
import { UserStats } from '../../utils/frontendTypes';
import { HttpClient } from '../../utils/httpClient';

export const General = () => {
  const [userStats, setUserStats] = useState<UserStats>();
  useEffect(() => {
    const httpClient = new HttpClient('/api');
    httpClient
      .get<APIUserStats>('/student/general_stats')
      .then((response) => setUserStats(mapAPIUserStatsToUserStats(response.data)));
  }, []);



  if (!userStats) {
    return <Loader />;
  }

  return (
    <div className='mt-4 ml-12 mr-12'>
      <CourseTable userStats={userStats} />
      <SolvedTaskInfo consecutiveDays={userStats.solvedTaskSeries.consecutiveDays} />
      <TimeSpentChart dataPoints={userStats.timeSpentInCourses.dataPoints} />
      <ActivityCalender data={userStats.timeSpentInCourses.dataPoints} />
    </div>
  );
};
