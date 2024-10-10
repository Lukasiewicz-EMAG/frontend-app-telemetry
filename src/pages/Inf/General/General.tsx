import { useEffect, useState } from 'react';
import { ActivityCalender } from './components/ActivityCalender/ActivityCalender';
import { CourseTable } from './components/CourseTable/CourseTable';
import { SolvedTaskInfo } from './components/SolvedTaskInfo/SolvedTaskInfo';
import { TimeSpentChart } from './components/TimeSpentChart/TimeSpentChart';
import { Loader } from 'lucide-react';
import { APIUserStats } from '../../../utils/backendTypes';
import { mapAPIUserStatsToUserStats } from '../../../utils/dataMapper';
import { UserStats } from '../../../utils/frontendTypes';
import { HttpClient } from '../../../utils/httpClient';

export const InfGeneral = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const httpClient = new HttpClient('/api');
    httpClient
      .get<APIUserStats>('/student/general_stats')
      .then((response) => {
        console.log('responseee', response)
        if (response.data) {
          const mappedData = mapAPIUserStatsToUserStats(response.data);
          setUserStats(mappedData);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!userStats) {
    return <div>No data available</div>;
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