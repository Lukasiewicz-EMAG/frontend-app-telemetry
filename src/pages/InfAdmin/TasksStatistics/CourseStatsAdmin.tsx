import StatsCards from '../../../components/StatsCard/StatsCards';
import { Stat } from '../../../components/StatsCard/types';
import CourseSelection from '../../../context/CourseSelection';
import { Task, useSelection } from '../../../context/CourseSelectionContext';

export const CourseStatsAdmin = ({ displayKey = 'name' }: { displayKey: string }) => {
    const { detailsData, selectedItem } = useSelection<Task>();

    if (!detailsData) return null;

    const stats: Stat[] = [
        {
            title: 'Number of Students in Course',
            value: detailsData.number_of_students_in_course ? `${detailsData.number_of_students_in_course}` : 'N/A',
        },
        {
            title: 'Number of Students Who Solved Tasks',
            value: detailsData.number_of_students_which_solved_tasks ? `${detailsData.number_of_students_which_solved_tasks}` : 'N/A',
            progress: detailsData.percent_of_students_which_solved_tasks ?? 0,
        },
        {
            title: 'Total Code Compilations',
            value: detailsData.compilations_and_checks?.number_of_code_compilations ? `${detailsData.compilations_and_checks.number_of_code_compilations}` : 'N/A',
        },
        {
            title: 'Code Compilations with Error',
            value: detailsData.compilations_and_checks?.number_of_code_compilations_with_error ? `${detailsData.compilations_and_checks.number_of_code_compilations_with_error} (${detailsData.compilations_and_checks.percent_of_code_compilations_with_error ?? 0}%)` : 'N/A',
            progress: detailsData.compilations_and_checks?.percent_of_code_compilations_with_error ?? 0,
        },
        {
            title: 'Total Checks',
            value: detailsData.compilations_and_checks?.number_of_checks ? `${detailsData.compilations_and_checks.number_of_checks}` : 'N/A',
        },
        {
            title: 'Checks with Error',
            value: detailsData.compilations_and_checks?.number_of_checks_with_error ? `${detailsData.compilations_and_checks.number_of_checks_with_error} (${detailsData.compilations_and_checks.percent_of_checks_with_error ?? 0}%)` : 'N/A',
            progress: detailsData.compilations_and_checks?.percent_of_checks_with_error ?? 0,
        },
    ];

    return (
        <>
            <CourseSelection displayKey={displayKey} />
            <h1>Statystki dla kursu {selectedItem}</h1>
            <StatsCards stats={stats} />
        </>
    );
};

export default CourseStatsAdmin;
