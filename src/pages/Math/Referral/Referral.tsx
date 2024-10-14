import { useQuery } from '@tanstack/react-query';

import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import ProblematicIssues from '../../../components/ProblematicIssues/ProblematicIssues';
import SuggestedTasks from '../../../components/SuggestedTasks/SuggestedTasks';
import UnsolvedTasks from '../../../components/UnsolvedTasks/UnsolvedTasks';
import { HttpClient } from '../../../utils/httpClient';
import { RecommendationData } from '../../Inf/Referral/types';
import { UnfinishedCoursesSection } from './components/UnfinishedCourses';

const fetchReferral = async (): Promise<RecommendationData> => {
  const httpClient = new HttpClient('/api');
  const response = await httpClient.get<RecommendationData>('/student_math/recommendations');
  return response.data;
};

export const MathReferral = () => {
  const intl = useIntl();
  const { data, isLoading, error } = useQuery<RecommendationData, Error>({
    queryKey: ['recommendations-math'],
    queryFn: fetchReferral,
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
    <>
      <h1 className='text-3xl font-bold'>{intl.formatMessage({ id: 'referral.continue_learning' })}</h1>
      <UnfinishedCoursesSection courses={data.unfinished_courses as any} /> //TODO: Fix type
      <SuggestedTasks tasks={data.recommendations.tasks_to_train} />
      <ProblematicIssues
        timeBasedTaskRanking={data.recommendations.time_based_task_ranking}
        errorBasedTaskRanking={data.recommendations.error_based_task_ranking}
      />
      <UnsolvedTasks unfinished_courses={data.unfinished_courses} recommendations={data.recommendations} />
    </>
  );
};
