import { useEffect, useState, useMemo } from "react";
import { useIntl } from 'react-intl';
import { HttpClient } from "@/utils/httpClient";
import GradeDetails from "./components/GradeDetails";
import TasksTable from "./components/TasksTable";
import TaskRanking from "./components/TaskRanking";
import RepeatTask from "./components/RepeatTask";
import VisitedButNotSolvedTasks from "./components/VisitedButNotSolvedTasks";
import CourseTimeline from "./components/CourseTimeline";
import { DetailsData, Stat } from "./types";
import CourseSelection from "./components/CourseSelection";
import { CourseSelectionProvider, useCourseSelection } from "./context/CourseSelectionContext";
import { Loader } from "../../../components/Loader/Loader";

const API_BASE_URL = '/api';
const ENROLLMENT_ENDPOINT = '/student_code/enrollments/';

export const InfDetails: React.FC = () => {
  return (
    <CourseSelectionProvider>
      <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
        <CourseSelection />
        <DetailsMain />
      </div>
    </CourseSelectionProvider>

  );
};

export const DetailsMain: React.FC = () => {
  const intl = useIntl();
  const { selectedCourse } = useCourseSelection();
  const [detailsData, setDetailsData] = useState<DetailsData | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const httpClient = new HttpClient(API_BASE_URL);
      try {
        if (!selectedCourse) {
          return;
        }
        const response = await httpClient.get<DetailsData>(ENROLLMENT_ENDPOINT + selectedCourse);
        setDetailsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }
    };

    fetchDetails();
  }, [selectedCourse]);

  const stats: Stat[] = useMemo(() => {
    if (!detailsData) return [];
    console.log('detailsData.completion_stats', detailsData.completion_stats);
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
        value: intl.formatMessage({ id: 'details.percentage_format' }, { value: detailsData.completion_stats.completion_base.completion_percentage }),
        progress: detailsData.completion_stats.completion_base.completion_percentage
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

  const calendarData = useMemo(() => {
    return detailsData ? detailsData.time_spent_in_course.data_points.map((item) => ({
      date: item.date,
      minutesSpent: item.minutes_spent
    })) : [];
  }, [detailsData]);

  const timeLineData = useMemo(() => {
    return detailsData ? detailsData.time_spent_in_course.data_points.map((item) => ({
      date: item.date,
      minutesSpent: item.minutes_spent
    })) : [];
  }, [detailsData]);

  if (!detailsData) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-2xl font-bold">{detailsData.course_base.name}</h1>
      {/* <Grade grade={detailsData.grade} /> */}
      <GradeDetails stats={stats} />
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
}