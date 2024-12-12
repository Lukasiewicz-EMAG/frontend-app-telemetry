import { useIntl } from 'react-intl';
import { Stat } from '../../../components/StatsCard/types';
import { CourseSelection, OldCourseSelection } from '../../../context/CourseSelection';
import { Task, useOldSelection } from '../../../context/CourseSelectionContext';

export const CourseStatsAdmin = ({ displayKey = 'name' }: { displayKey: string }) => {
    const { detailsData, selectedItem, items } = useOldSelection<any>();
    console.log('aaa', items)
    const intl = useIntl();

    // if (!detailsData) return null;

    // const stats: Stat[] = [
    //     {
    //         title: displayKey === 'name' ? intl.formatMessage({ id: 'admin_inf.stats_cards.number_of_students_in_course', defaultMessage: 'Number of Students in Course' }) : intl.formatMessage({ id: 'admin_inf.stats_cards.number_of_students_in_task', defaultMessage: 'Number of Students in Task' }),
    //         value: detailsData.number_of_students_in_course ? `${detailsData.number_of_students_in_course}` : 'N/A',
    //     },
    //     {
    //         title: intl.formatMessage({ id: 'admin_inf.stats_cards.number_of_students_which_solved_tasks', defaultMessage: 'Number of Students Who Solved Tasks' }),
    //         value: detailsData.number_of_students_which_solved_tasks ? `${detailsData.number_of_students_which_solved_tasks}` : 'N/A',
    //         progress: detailsData.percent_of_students_which_solved_tasks ?? 0,
    //     },
    //     {
    //         title: intl.formatMessage({ id: 'admin_inf.stats_cards.total_code_compilations', defaultMessage: 'Total Code Compilations' }),
    //         value: detailsData.compilations_and_checks?.number_of_code_compilations ? `${detailsData.compilations_and_checks.number_of_code_compilations}` : 'N/A',
    //     },
    //     {
    //         title: intl.formatMessage({ id: 'admin_inf.stats_cards.code_compilations_with_error', defaultMessage: 'Code Compilations with Error' }),
    //         value: detailsData.compilations_and_checks?.number_of_code_compilations_with_error ? `${detailsData.compilations_and_checks.number_of_code_compilations_with_error} (${detailsData.compilations_and_checks.percent_of_code_compilations_with_error ?? 0}%)` : 'N/A',
    //         progress: detailsData.compilations_and_checks?.percent_of_code_compilations_with_error ?? 0,
    //     },
    //     {
    //         title: intl.formatMessage({ id: 'admin_inf.stats_cards.total_checks', defaultMessage: 'Total Checks' }),
    //         value: detailsData.compilations_and_checks?.number_of_checks ? `${detailsData.compilations_and_checks.number_of_checks}` : 'N/A',
    //     },
    //     {
    //         title: intl.formatMessage({ id: 'admin_inf.stats_cards.checks_with_error', defaultMessage: 'Checks with Error' }),
    //         value: detailsData.compilations_and_checks?.number_of_checks_with_error ? `${detailsData.compilations_and_checks.number_of_checks_with_error} (${detailsData.compilations_and_checks.percent_of_checks_with_error ?? 0}%)` : 'N/A',
    //         progress: detailsData.compilations_and_checks?.percent_of_checks_with_error ?? 0,
    //     },
    // ];

    return (
        <>
            <OldCourseSelection displayKey={displayKey} />
            {/* <h1>{displayKey === 'name' ? intl.formatMessage({ id: 'admin_inf.stats_cards.statistics_for_course', defaultMessage: 'Statistics for Course' }) + ' ' + selectedItem : intl.formatMessage({ id: 'admin_inf.stats_cards.statistics_for_task', defaultMessage: 'Statistics for Task' }) + ' ' + selectedItem}</h1> */}
            {/* TODO: check this */}
            {/* <OldCards stats={stats} /> */}
        </>
    );
};

export default CourseStatsAdmin;
