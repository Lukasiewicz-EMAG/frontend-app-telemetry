import { OldSelectionProvider, SelectionProvider, useOldSelection, useSelection } from '../../../context/CourseSelectionContext';
import { CourseSelection } from '../../../context/CourseSelection';
import CourseStatsAdmin from './CourseStatsAdmin';

export const CourseStatsTasksAdmin = () => {
    const { selectedItem } = useOldSelection();
    const isSelectionAvailable = !!selectedItem;

    return (
        <>
            {isSelectionAvailable ? (
                <OldSelectionProvider endpoint={`/admin_math/course/${selectedItem}/tasks`}
                    secondEndpoint={`/admin_code/course_stats/${selectedItem}/task`}>
                    <CourseStatsAdmin displayKey='title' />
                </OldSelectionProvider>
            ) : (
                <div>Please select an item.</div>
            )}
        </>
    );
};

export default CourseStatsTasksAdmin;
