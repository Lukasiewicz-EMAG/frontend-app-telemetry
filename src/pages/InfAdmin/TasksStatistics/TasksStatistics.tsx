import { useIntl } from 'react-intl';
import { useGetData } from '../../../hooks/query';
import { CourseSelectionProvider } from '../../../context/CourseSelectionContext';
import CourseSelection from '../../../context/CourseSelection';
import CourseStatsAdmin from './CourseStatsAdmin';
import CourseStatsTasksAdmin from './CourseStatsTasksAdmin';


export const TasksStatistics = () => {
    const intl = useIntl();


    return (
        <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
            <CourseSelectionProvider endpoint='/admin_code/courses'>
                <h1 className="text-2xl font-bold">{intl.formatMessage({ id: 'admin_inf.general_statistics' })}</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <CourseStatsAdmin />
                    </div>
                    <div>
                        <CourseStatsTasksAdmin />
                    </div>
                </div>
            </CourseSelectionProvider>

        </div>
    );
};

export default TasksStatistics;
