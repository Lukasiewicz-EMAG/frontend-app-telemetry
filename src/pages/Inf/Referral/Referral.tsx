import { useIntl } from 'react-intl';
import TableRenderer from '../../../components/DataTable/TableRenderer';
import { Loader } from '../../../components/Loader/Loader';
import NoDataToDisplay from '../../../components/NoDataToDisplay/NoDataToDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { UnfinishedCoursesSection } from '../../../components/UnfinishedCourses/UnfinishedCourses';
import UnsolvedTasks from '../../../components/UnsolvedTasks/UnsolvedTasks';
import { useGetData } from '../../../hooks/useGetData';
import { ColumnDefinition, RecomendationDataResponse, TasksToTrainData } from './types';

const NUM_UNFINISHED_COURSES = 8;
const NUM_UNFINISHED_TASKS = 6;

export const InfReferral = () => {
  const intl = useIntl();
  const { data, isLoading, error } = useGetData<RecomendationDataResponse>(
    `/student/recommendations?num_unfinished_courses=${NUM_UNFINISHED_COURSES}&num_unfinished_tasks=${NUM_UNFINISHED_TASKS}`,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <NoDataToDisplay title='no_data.student_general.title' desc='no_data.student_general.desc' />;
  }

  return (
    <>
      <h1 className='text-3xl font-bold'>{intl.formatMessage({ id: 'referral.continue_learning' })}</h1>
      {data.unfinished_courses.data.length > 0 && (
        <UnfinishedCoursesSection courses={data.unfinished_courses.data.map((item) => item.data)} />
      )}
      <UnsolvedTasks
        unsolvedEasierTasks={{
          cards: data.unsolved_easier_tasks.cards,
        }}
      />

      <h1 className='text-3xl font-bold'>{intl.formatMessage({ id: 'referral.suggested_tasks' })}</h1>

      <TableRenderer
        data={data.tasks_to_train.data.map((item: any) => item.data as TasksToTrainData)}
        columns={data.tasks_to_train.columns as ColumnDefinition[]}
        label={data.tasks_to_train.label}
        description='referral.suggested_tasks_description'
      />
      <Card>
        <CardHeader>
          <CardTitle>{intl.formatMessage({ id: 'referral.problematic_issues' })}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4'>{intl.formatMessage({ id: 'referral.analysis_description' })}</p>
          <ul className='list-disc list-inside mb-4'>
            <li>{intl.formatMessage({ id: 'referral.task_execution_time' })}</li>
            <li>{intl.formatMessage({ id: 'referral.error_count' })}</li>
          </ul>
          <TableRenderer
            data={data.time_based_task_ranking.data.map((data: any) => data.data)}
            columns={data.time_based_task_ranking.columns.filter((column) => column.field !== 'time_spent')}
            label={data.time_based_task_ranking.label}
            displayInCard={false}
          />
          <TableRenderer
            data={data.error_based_task_ranking.data.map((data: any) => data.data)}
            columns={data.error_based_task_ranking.columns.filter((column) => column.field !== 'num_errors')}
            label={data.error_based_task_ranking.label}
            displayInCard={false}
          />
        </CardContent>
      </Card>

      {/* TODO: Hidden CUD-2431 */}
    </>
  );
};
