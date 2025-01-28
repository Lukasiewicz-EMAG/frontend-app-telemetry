import { OldSelectionProvider, useOldSelection } from '../../../context/CourseSelectionContext';
import CourseStatsAdmin from './CourseStatsAdmin';

export const CourseStatsTasksAdmin = () => {
  const { selectedItem } = useOldSelection();
  const isSelectionAvailable = !!selectedItem;

  return (
    <>
      {isSelectionAvailable ? (
        <OldSelectionProvider endpoint={`/admin/course/${selectedItem}/task_list`} secondEndpoint={`/admin/task/`}>
          <CourseStatsAdmin displayKey='title' />
        </OldSelectionProvider>
      ) : (
        <div>Please select an item.</div>
      )}
    </>
  );
};

export default CourseStatsTasksAdmin;
