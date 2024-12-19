import { useIntl } from 'react-intl';
import { Stat } from '../../../components/StatsCard/types';
import { CourseSelection, OldCourseSelection } from '../../../context/CourseSelection';
import { Task, useOldSelection } from '../../../context/CourseSelectionContext';
import { StatsCards } from '../../../components/StatsCard/StatsCards';

export const CourseStatsAdmin = ({ displayKey = 'name' }: { displayKey: string }) => {
    const { detailsData, selectedItem, items } = useOldSelection<any>();
    const intl = useIntl();


    return (
        <>
            <OldCourseSelection displayKey={displayKey} />
            <h1>{displayKey === 'name' ? intl.formatMessage({ id: 'admin_inf.stats_cards.statistics_for_course', defaultMessage: 'Statistics for Course' }) + ' ' + selectedItem : intl.formatMessage({ id: 'admin_inf.stats_cards.statistics_for_task', defaultMessage: 'Statistics for Task' }) + ' ' + selectedItem}</h1>
            {detailsData && detailsData.cards && <StatsCards stats={detailsData} />}
        </>
    );
};

export default CourseStatsAdmin;
