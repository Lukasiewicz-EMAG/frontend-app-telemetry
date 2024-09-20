import { useEffect, useState, useMemo } from "react";
import { useIntl } from 'react-intl';
import { HttpClient } from "@/utils/httpClient";
import { Loader } from "@/components/Loader/Loader";
import { Grade } from "./components/Grade";
import GradeDetails from "./components/GradeDetails";
import TasksTable from "./components/TasksTable";
import TaskRanking from "./components/TaskRanking";
import RepeatTask from "./components/RepeatTask";
import VisitedButNotSolvedTasks from "./components/VisitedButNotSolvedTasks";
import CourseTimeline from "./components/CourseTimeline";
import { DetailsData, Stat } from "./types";

const API_BASE_URL = '/api';
const ENROLLMENT_ENDPOINT = '/student_code/enrollments/1'; // TODO: change to dynamic id

export const Details: React.FC = () => {
  const intl = useIntl();
  const [detailsData, setDetailsData] = useState<DetailsData | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const httpClient = new HttpClient(API_BASE_URL);
      try {
        const response = await httpClient.get<DetailsData>(ENROLLMENT_ENDPOINT);
        setDetailsData(response.data);
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }
    };

    fetchDetails();
  }, []);

  const stats: Stat[] = useMemo(() => {
    if (!detailsData) return [];

    return [
      {
        title: intl.formatMessage({ id: 'details.time_spent' }),
        value: intl.formatMessage(
          { id: 'details.time_format' },
          { hours: detailsData.total_time_spent.hours, minutes: detailsData.total_time_spent.minutes }
        )
      },
      {
        title: intl.formatMessage({ id: 'details.solved_tasks_percentage' }),
        value: intl.formatMessage({ id: 'details.percentage_format' }, { value: detailsData.completion_stats.completion_percentage }),
        progress: detailsData.completion_stats.completion_percentage
      },
      {
        title: intl.formatMessage({ id: 'details.tasks_with_hint' }),
        value: intl.formatMessage(
          { id: 'details.tasks_count_format' },
          { count: detailsData.completion_stats.num_completed_with_hint, percentage: detailsData.completion_stats.completion_percentage_with_hint }
        ),
        progress: detailsData.completion_stats.completion_percentage_with_hint
      },
      {
        title: intl.formatMessage({ id: 'details.tasks_with_answer' }),
        value: intl.formatMessage(
          { id: 'details.tasks_count_format' },
          { count: detailsData.completion_stats.num_completed_with_answer, percentage: detailsData.completion_stats.completion_percentage_with_answer }
        ),
        progress: detailsData.completion_stats.completion_percentage_with_answer
      },
    ];
  }, [detailsData, intl]);

  if (!detailsData) {
    return <Loader />;
  }

  return (
    <div className='mt-4 ml-12 mr-12'>
      <h1 className="text-2xl font-bold">{detailsData.course_base.name}</h1>
      <Grade grade={detailsData.grade} />
      <GradeDetails stats={stats} />
      <TasksTable
        allTasksStats={detailsData.all_tasks_stats}
        solvedTasksStats={detailsData.solved_tasks_stats}
        unsolvedTasksStats={detailsData.unsolved_tasks_stats}
      />
      <CourseTimeline />
      <TaskRanking data={detailsData.time_based_task_ranking} />
      <RepeatTask taskToRepeat={detailsData.task_to_repeat} />
      <VisitedButNotSolvedTasks tasks={detailsData.visited_but_unsolved_tasks} />
    </div>
  );
}