// /admin_math/course / { course_id } / tasks

import { CourseSelectionProvider, useCourseSelection } from '../../../context/CourseSelectionContext';
import CourseSelection from '../../../context/CourseSelection';
import { Loader } from 'lucide-react';
import { useGetData } from '../../../hooks/query';

export const CourseStatsTasksAdmin = () => {
    const { selectedCourse } = useCourseSelection();
    if (!selectedCourse) return null;

    const { data, isLoading, error } = useGetData<any>(`/admin_math/course/${selectedCourse}/tasks`);
    if (isLoading) {
        return <Loader />;
    }

    if (error || !data) {
        return <div>No data available</div>;
    }

    return (
        <>
            <p>tests {JSON.stringify(data)}</p>
        </>
    );
};

export default CourseStatsTasksAdmin;
