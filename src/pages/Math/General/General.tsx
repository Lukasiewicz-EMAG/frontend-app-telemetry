import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import { UserStats } from '../../../utils/frontendTypes';
import { HttpClient } from '../../../utils/httpClient';
import { ActivityCalender } from '../../Inf/General/components/ActivityCalender/ActivityCalender';
import { CourseTable } from '../../Inf/General/components/CourseTable/CourseTable';
import { SolvedTaskInfo } from '../../Inf/General/components/SolvedTaskInfo/SolvedTaskInfo';
import { TimeSpentChart } from '../../Inf/General/components/TimeSpentChart/TimeSpentChart';

const fetchGeneral = async (): Promise<UserStats> => {
  const httpClient = new HttpClient('/api');
  const response = await httpClient.get<UserStats>('/student/general_stats');
  return response.data;
};

export const MathGeneral = () => {
  const intl = useIntl();
  const { data, isLoading, error } = useQuery<UserStats, Error>({
    queryKey: ['general-math'],
    queryFn: fetchGeneral,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{intl.formatMessage({ id: 'error.no_data' })}</p>;
  }

  return (
    <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
      <CourseTable userStats={data} type='math' />
      <SolvedTaskInfo consecutiveDays={data.solvedTaskSeries.consecutiveDays} />
      <TimeSpentChart dataPoints={data.timeSpentInCourses.dataPoints} />
      <ActivityCalender data={data.timeSpentInCourses.dataPoints} />
    </div>
  );
};
