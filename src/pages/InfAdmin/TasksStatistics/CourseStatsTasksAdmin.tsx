import { OldSelectionProvider, SelectionProvider, useOldSelection, useSelection } from '../../../context/CourseSelectionContext';
import { CourseSelection } from '../../../context/CourseSelection';
import CourseStatsAdmin from './CourseStatsAdmin';

export const CourseStatsTasksAdmin = () => {
    const { selectedItem } = useOldSelection(); //selected course
    const isSelectionAvailable = !!selectedItem;

    return (
        <>
            {isSelectionAvailable ? (
                // course / { course_id } / task_list
                //https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api/admiun/course/course-v1:CUD-Dev-Team+Code02+R1/task_list
                //"/task/{task_id}/general_stats"
                <OldSelectionProvider endpoint={`/admin/course/${selectedItem}/task_list`}
                    secondEndpoint={`/admin/task/`}>

                    <CourseStatsAdmin displayKey='title' />
                </OldSelectionProvider>
            ) : (
                <div>Please select an item.</div>
            )}
        </>
    );
};

export default CourseStatsTasksAdmin;
