import { Loader } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { HttpClient } from '../../../utils/httpClient';

import CourseSelection from '../../Inf/Details/components/CourseSelection';
import CourseTimeline from '../../Inf/Details/components/CourseTimeline';
import GradeDetails from '../../Inf/Details/components/GradeDetails';
import RepeatTask from '../../Inf/Details/components/RepeatTask';
import TaskRanking from '../../Inf/Details/components/TaskRanking';
import VisitedButNotSolvedTasks from '../../Inf/Details/components/VisitedButNotSolvedTasks';
import { CourseSelectionProvider, useCourseSelection } from '../../Inf/Details/context/CourseSelectionContext';
import { Stat } from '../../Inf/Details/types';
import { PieCharts } from './components/PieCharts';
import { TasksTable } from './components/TasksTable';
import { CourseStats } from './types';

const API_BASE_URL = '/api';
const ENROLLMENT_ENDPOINT = '/student_math/enrollments/';

export const MathDetails: React.FC = () => {
  return (
    <CourseSelectionProvider endpoint='/student_math/enrollments'>
      <div className='mt-4 ml-12 mr-12'>
        <CourseSelection />
        <DetailsMain />
      </div>
    </CourseSelectionProvider>
  );
};

export const DetailsMain: React.FC = () => {
  const intl = useIntl();
  const { selectedCourse } = useCourseSelection();
  const [detailsData, setDetailsData] = useState<CourseStats | null>(null);

  useEffect(() => {
    console.log(selectedCourse, 'selectedCourse');
    const fetchDetails = async () => {
      const httpClient = new HttpClient(API_BASE_URL);
      try {
        if (!selectedCourse) {
          return;
        }
        const response = await httpClient.get<CourseStats>(ENROLLMENT_ENDPOINT + selectedCourse);
        setDetailsData(response.data);
      } catch (error) {
        console.error('Failed to fetch details:', error);
      }
    };

    fetchDetails();
  }, [selectedCourse]);

  const stats: Stat[] = useMemo(() => {
    if (!detailsData) return [];
    return [
      {
        title: intl.formatMessage({ id: 'details.time_spent' }),
        value: intl.formatMessage(
          { id: 'details.time_format' },
          { hours: detailsData.total_time_spent.hours, minutes: detailsData.total_time_spent.minutes },
        ),
      },
      {
        title: intl.formatMessage({ id: 'details.re_error_rate' }),
        value: intl.formatMessage(
          { id: 'details.percentage_format' },
          { value: detailsData.completion_stats.re_error_rate },
        ),
        progress: detailsData.completion_stats.re_error_rate,
      },
      {
        title: intl.formatMessage({ id: 'details.swe_error_rate' }),
        value: intl.formatMessage(
          { id: 'details.tasks_count_format' },
          {
            count: detailsData.completion_stats.swe_error_rate,
            percentage: detailsData.completion_stats.swe_error_rate,
          },
        ),
        progress: detailsData.completion_stats.swe_error_rate,
      },
      {
        title: intl.formatMessage({ id: 'details.completion_percentage' }),
        value: intl.formatMessage(
          { id: 'details.tasks_count_format' },
          {
            count: detailsData.completion_stats.completion_base.interactive_tasks.completion_percentage,
            percentage: detailsData.completion_stats.completion_base.interactive_tasks.completion_percentage,
          },
        ),
        progress: detailsData.completion_stats.completion_base.interactive_tasks.completion_percentage,
      },
    ];
  }, [detailsData, intl]);

  const calendarData = useMemo(() => {
    return detailsData
      ? detailsData.time_spent_in_course.data_points.map((item) => ({
          date: item.date,
          minutesSpent: item.minutes_spent,
        }))
      : [];
  }, [detailsData]);

  const timeLineData = useMemo(() => {
    return detailsData
      ? detailsData.time_spent_in_course.data_points.map((item) => ({
          date: item.date,
          minutesSpent: item.minutes_spent,
        }))
      : [];
  }, [detailsData]);

  if (!detailsData) {
    return <Loader />;
  }

  console.log(detailsData, 'detailsData');

  return (
    <>
      <h1 className='text-2xl font-bold'>Statystyki dla kursu - "{detailsData.course_base.name}"</h1>
      <GradeDetails stats={stats} />
      <PieCharts data={detailsData.completion_stats} />
      <TasksTable
        allTasksStats={detailsData.all_tasks_stats}
        solvedTasksStats={detailsData.solved_tasks_stats}
        unsolvedTasksStats={detailsData.unsolved_tasks_stats}
      />
      <CourseTimeline timeLineData={timeLineData} calendarData={calendarData} />
      <TaskRanking data={detailsData.time_based_task_ranking} />
      <RepeatTask taskToRepeat={detailsData.task_to_repeat} />
      <VisitedButNotSolvedTasks tasks={detailsData.visited_but_unsolved_tasks} />
    </>
  );
};
