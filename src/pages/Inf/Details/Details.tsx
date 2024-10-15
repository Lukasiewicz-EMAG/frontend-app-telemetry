import { useEffect, useState, useMemo } from "react";
import { useIntl } from 'react-intl';
import CourseSelection from "./components/CourseSelection";
import { CourseSelectionProvider, useCourseSelection } from "./context/CourseSelectionContext";
import { Loader } from "../../../components/Loader/Loader";
import { Stat } from "./types";
import CourseTimeline from "./components/CourseTimeline";
import RepeatTask from "./components/RepeatTask";
import TaskRanking from "./components/TaskRanking";
import TasksTable from "./components/TasksTable";
import VisitedButNotSolvedTasks from "./components/VisitedButNotSolvedTasks";
import GradeDetails from "./components/GradeDetails";


export const InfDetails: React.FC = () => {
  return (
    <CourseSelectionProvider>
      <CourseSelection />
      <DetailsMain />
    </CourseSelectionProvider>

  );
};

export const DetailsMain: React.FC = () => {
  const intl = useIntl();
  const { selectedCourse, detailsData } = useCourseSelection();

  const stats: Stat[] = useMemo(() => {
    if (!detailsData) return [];
    console.log('detailsData.completion_stats', detailsData.completion_stats);
    return [
      {
        title: intl.formatMessage({ id: 'details.time_spent' }),
        value: intl.formatMessage(
          { id: 'details.time_format' },
          {
            hours: detailsData.total_time_spent?.hours ?? 0,
            minutes: detailsData.total_time_spent?.minutes ?? 0
          }
        )
      },
      {
        title: intl.formatMessage({ id: 'details.solved_tasks_percentage' }),
        value: intl.formatMessage(
          { id: 'details.percentage_format' },
          { value: detailsData.completion_stats?.completion_base?.completion_percentage ?? 0 }
        ),
        progress: detailsData.completion_stats?.completion_base?.completion_percentage ?? 0
      },
      {
        title: intl.formatMessage({ id: 'details.tasks_with_hint' }),
        value: intl.formatMessage(
          { id: 'details.tasks_count_format' },
          {
            count: detailsData.completion_stats?.num_completed_with_hint ?? 0,
            percentage: detailsData.completion_stats?.completion_percentage_with_hint ?? 0
          }
        ),
        progress: detailsData.completion_stats?.completion_percentage_with_hint ?? 0
      },
      {
        title: intl.formatMessage({ id: 'details.tasks_with_answer' }),
        value: intl.formatMessage(
          { id: 'details.tasks_count_format' },
          {
            count: detailsData.completion_stats?.num_completed_with_answer ?? 0,
            percentage: detailsData.completion_stats?.completion_percentage_with_answer ?? 0
          }
        ),
        progress: detailsData.completion_stats?.completion_percentage_with_answer ?? 0
      },
    ];
  }, [detailsData, intl]);

  const calendarData = useMemo(() => {
    if (!detailsData) return [];
    const dataPoints = detailsData.time_spent_in_course?.data_points || [];
    return dataPoints.map((item) => ({
      date: item.date,
      minutesSpent: item.minutes_spent
    }));
  }, [detailsData]);

  const timeLineData = useMemo(() => {
    if (!detailsData) return [];
    const dataPoints = detailsData.time_spent_in_course?.data_points || [];
    return dataPoints.map((item) => ({
      date: item.date,
      minutesSpent: item.minutes_spent
    }));
  }, [detailsData]);

  if (!detailsData || !detailsData.course_base) {
    return <Loader />;
  }

  return (
    <>
      <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
        <h1 className="text-2xl font-bold">{detailsData.course_base?.name}</h1>
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
      </div>

    </>
  );
}