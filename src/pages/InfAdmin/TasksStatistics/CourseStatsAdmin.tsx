import { useCourseSelection } from '../../../context/CourseSelectionContext';
import CourseSelection from '../../../context/CourseSelection';
import StatsCards from '../../../components/StatsCard/StatsCards';
import { Stat } from '../../../components/StatsCard/types';

export const CourseStatsAdmin = () => {
    const { detailsData, selectedCourse } = useCourseSelection();

    if (!detailsData) return null;

    const stats: Stat[] = [
        {
            title: 'Total Time Spent',
            value: `${detailsData.total_time_spent.hours} hours ${detailsData.total_time_spent.minutes} minutes`,
        },
        {
            title: 'Completion Percentage',
            value: `${detailsData.completion_stats.completion_base.completion_percentage}%`,
            progress: detailsData.completion_stats.completion_base.completion_percentage,
        },
        {
            title: 'Tasks Completed with Hint',
            value: `${detailsData.completion_stats.num_completed_with_hint} (${detailsData.completion_stats.completion_percentage_with_hint}%)`,
            progress: detailsData.completion_stats.completion_percentage_with_hint,
        },
        {
            title: 'Tasks Completed with Answer',
            value: `${detailsData.completion_stats.num_completed_with_answer} (${detailsData.completion_stats.completion_percentage_with_answer}%)`,
            progress: detailsData.completion_stats.completion_percentage_with_answer,
        },
        {
            title: 'Total Code Runs',
            value: `${detailsData.all_tasks_stats.num_code_runs}`,
        },
        {
            title: 'Average Code Runs per Task',
            value: `${detailsData.all_tasks_stats.avg_code_runs_per_task}`,
        },
    ];

    return (
        <>
            <CourseSelection />
            <h1>statystki dla kursu {selectedCourse}</h1>
            <StatsCards stats={stats} />
        </>
    );
};

export default CourseStatsAdmin;
