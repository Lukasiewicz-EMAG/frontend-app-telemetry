import { useMemo } from "react";
import { useIntl } from 'react-intl';
import { SelectionProvider, useSelection } from "../../../context/CourseSelectionContext";
import { Loader } from "../../../components/Loader/Loader";
import CourseTimeline from "./components/CourseTimeline";
import RepeatTask from "./components/RepeatTask";
import TasksTable from "./components/TasksTable";
import { StatsCards } from "../../../components/StatsCard/StatsCards";
import TableRenderer from "../../../components/DataTable/TableRenderer";
import { CourseSelection } from "../../../context/CourseSelection";


export const InfDetails: React.FC = () => {
  return (
    <SelectionProvider endpoint='/student/enrollments'>
      <CourseSelection displayKey='name' />
      <DetailsMain />
    </SelectionProvider>

  );
};

export const DetailsMain: React.FC = () => {
  const intl = useIntl();
  const { items, selectedItem, detailsData } = useSelection();

  const courseName = useMemo(() => {
    return (items.find((item: any) => item.id == selectedItem) as any)?.name
  }, [selectedItem, items])

  const calendarData = useMemo(() => {
    if (!detailsData) return [];
    const dataPoints = detailsData.time_spent_in_course?.data_points || [];
    return dataPoints.map((item: any) => ({
      date: item.date,
      minutesSpent: item.minutes_spent
    }));
  }, [detailsData]);

  const timeLineData = useMemo(() => {
    if (!detailsData) return [];
    const dataPoints = detailsData.time_spent_in_course?.data_points || [];
    return dataPoints.map((item: any) => ({
      date: item.date,
      minutesSpent: item.minutes_spent
    }));
  }, [detailsData]);

  if (!detailsData) {
    return <Loader />;
  }



  return (
    <>
      <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
        <h1 className="text-2xl font-bold">{courseName}</h1>
        <StatsCards stats={detailsData.cards} />
        <TasksTable taskStatistics={detailsData.task_statistics.tables} />
        <CourseTimeline timeLineData={timeLineData} calendarData={calendarData} />
        <TableRenderer
          data={detailsData.time_based_task_ranking.data.map(data => data.data)}
          columns={detailsData.time_based_task_ranking.columns}
          label={detailsData.time_based_task_ranking.label}
        />
        <RepeatTask taskToRepeat={detailsData.task_to_repeat} />
        <TableRenderer
          data={detailsData.visited_but_unsolved_tasks.data.map(data => data.data)}
          columns={detailsData.visited_but_unsolved_tasks.columns}
          label={detailsData.visited_but_unsolved_tasks.label}
        />
      </div>

    </>
  );
}