import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import ProblematicIssues from '../../../components/ProblematicIssues/ProblematicIssues';
import SuggestedTasks from '../../../components/SuggestedTasks/SuggestedTasks';
import { UnfinishedCoursesSection } from '../../../components/UnfinishedCourses/UnfinishedCourses';
import UnsolvedTasks from '../../../components/UnsolvedTasks/UnsolvedTasks';
import { RecommendationData } from './types';
import { useGetData, useIsAdmin } from '../../../hooks/query';

export const InfReferral = () => {
    const intl = useIntl();
    const isAdmin = useIsAdmin();
    console.log('isAdmin,', isAdmin);
    const { data, isLoading, error } = useGetData<RecommendationData>('/student_code/recommendations');

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>{intl.formatMessage({ id: 'error.no_data' })}</p>;
    }

    return (
        <>
            <h1 className='text-3xl font-bold'>{intl.formatMessage({ id: 'referral.continue_learning' })}</h1>
            <UnfinishedCoursesSection courses={data?.unfinished_courses} />
            <SuggestedTasks tasks={data?.recommendations.tasks_to_train} />
            <ProblematicIssues
                timeBasedTaskRanking={data?.recommendations.time_based_task_ranking}
                errorBasedTaskRanking={data?.recommendations.error_based_task_ranking}
            />
            <UnsolvedTasks unfinished_courses={data?.unfinished_courses} recommendations={data?.recommendations} />
        </>
    );
};
