import { SelectionProvider, useSelection } from '../../../context/CourseSelectionContext';
import CourseSelection from '../../../context/CourseSelection';
import CourseStatsAdmin from './CourseStatsAdmin';

export const CourseStatsTasksAdmin = () => {
    const { selectedItem } = useSelection();
    const isSelectionAvailable = !!selectedItem;

    return (
        <>
            {isSelectionAvailable ? (
                <SelectionProvider endpoint={`/admin_math/course/${selectedItem}/tasks`}
                    secondEndpoint={`/admin_code/course_stats/${selectedItem}/task`}>
                    <CourseStatsAdmin displayKey='title' />
                </SelectionProvider>
            ) : (
                <div>Please select an item.</div>
            )}
        </>
    );
};

export default CourseStatsTasksAdmin;
