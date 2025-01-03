import { useIntl } from 'react-intl';
import { StatsCards } from '../../../components/StatsCard/StatsCards';
import { OldCourseSelection } from '../../../context/CourseSelection';
import { useOldSelection } from '../../../context/CourseSelectionContext';

export const CourseStatsAdmin = ({ displayKey = 'name' }: { displayKey: string }) => {
    const { detailsData, selectedItem, items } = useOldSelection<any>();
    const intl = useIntl();


    return (
        <>
            <OldCourseSelection displayKey={displayKey} />
            <p>
                {displayKey === 'name'
                    ? intl.formatMessage({
                        id: 'admin_inf.stats_cards.statistics_for_course',
                        defaultMessage: 'Statistics for Course',
                    }) +
                    ' ' +
                    selectedItem
                    : intl.formatMessage({
                        id: 'admin_inf.stats_cards.statistics_for_task',
                        defaultMessage: 'Statistics for Task',
                    }) +
                    ' ' +
                    selectedItem}
            </p>
            {detailsData && detailsData.cards && <StatsCards stats={detailsData} />}
        </>
    );
};

export default CourseStatsAdmin;
