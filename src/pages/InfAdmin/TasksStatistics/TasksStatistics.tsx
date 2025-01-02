import { useIntl } from 'react-intl';
import { OldSelectionProvider } from '../../../context/CourseSelectionContext';
import CourseStatsAdmin from './CourseStatsAdmin';
import CourseStatsTasksAdmin from './CourseStatsTasksAdmin';
import CoursesTable from './CoursesTable';


export const TasksStatistics = () => {
    const intl = useIntl();


    return (
        <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>

            <OldSelectionProvider endpoint='/admin/course_list' >
                <div className="mt-4 grid grid-cols-1 gap-4">
                    <div>
                        <CourseStatsAdmin displayKey='name' />
                    </div>
                    <div>
                        <CourseStatsTasksAdmin />
                    </div>
                </div>
                <CoursesTable />
            </OldSelectionProvider>


        </div>
    );
};

export default TasksStatistics;
