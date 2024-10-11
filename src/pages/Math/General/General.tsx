import { useEffect, useState } from 'react';
import { Loader } from '../../../components/Loader/Loader';
import { APIUserStats } from '../../../utils/backendTypes';
import { mapAPIUserStatsToUserStats } from '../../../utils/dataMapper';
import { UserStats } from '../../../utils/frontendTypes';
import { HttpClient } from '../../../utils/httpClient';
import { ActivityCalender } from '../../Inf/General/components/ActivityCalender/ActivityCalender';
import { CourseTable } from '../../Inf/General/components/CourseTable/CourseTable';
import { SolvedTaskInfo } from '../../Inf/General/components/SolvedTaskInfo/SolvedTaskInfo';
import { TimeSpentChart } from '../../Inf/General/components/TimeSpentChart/TimeSpentChart';

export const MathGeneral = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const httpClient = new HttpClient('/api');
    httpClient
      .get<APIUserStats>('/student/general_stats')
      .then((response) => {
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
    <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
      <CourseTable userStats={userStats} />
      <SolvedTaskInfo consecutiveDays={userStats.solvedTaskSeries.consecutiveDays} />
      <TimeSpentChart dataPoints={userStats.timeSpentInCourses.dataPoints} />
      <ActivityCalender data={userStats.timeSpentInCourses.dataPoints} />
    </div>
  );
};
