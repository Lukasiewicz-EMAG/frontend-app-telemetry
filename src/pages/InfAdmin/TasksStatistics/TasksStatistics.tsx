import { useIntl } from 'react-intl';
import { OldSelectionProvider } from '../../../context/CourseSelectionContext';
import CourseStatsAdmin from './CourseStatsAdmin';
import CourseStatsTasksAdmin from './CourseStatsTasksAdmin';
import CoursesTable from './CoursesTable';


export const TasksStatistics = () => {
    const intl = useIntl();

    return (
        <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
            <h1 className="text-2xl font-bold">{intl.formatMessage({ id: 'admin_inf.general_statistics' })}</h1>
            <OldSelectionProvider endpoint='/admin_code/courses' secondEndpoint='/admin_code/course_stats'>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <CourseStatsAdmin displayKey='name' />
                    </div>
                    <div>
                        <CourseStatsTasksAdmin />
                    </div>
                </div>
                <CoursesTable courses_ids={['AFO002']} />
            </OldSelectionProvider>


        </div>
    );
};

export default TasksStatistics;
