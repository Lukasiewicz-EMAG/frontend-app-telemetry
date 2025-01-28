import { useState } from 'react';
import { useIntl } from 'react-intl';
import TableRenderer from '../../../components/DataTable/TableRenderer';
import { Loader } from '../../../components/Loader/Loader';
import NoDataToDisplay from '../../../components/NoDataToDisplay/NoDataToDisplay';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
import { Course, useOldSelection } from '../../../context/CourseSelectionContext';
import { useGetData } from '../../../hooks/useGetData';

export const CoursesCheckboxes = () => {
  const { items } = useOldSelection<Course>();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleCheckboxChange = (courseId: string) => {
    setSelectedCourses((prevSelectedCourses) => {
      return prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter((id) => id !== courseId)
        : [...prevSelectedCourses, courseId];
    });
  };

  return (
    <div>
      <ul>
        {items.map((course: Course) => (
          <li key={course.id}>
            <Label className='flex items-center space-x-2 mb-2'>
              <Checkbox
                checked={selectedCourses.includes(course.id)}
                onCheckedChange={() => handleCheckboxChange(course.id)}
              />
              <span className='ml-2'>{course.name}</span>
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CoursesTable = () => {
  const intl = useIntl();
  const { detailsData, selectedItem, items } = useOldSelection<any>();

  if (!selectedItem) return <NoDataToDisplay title='no_data.no_courses.title' />;

  const { data, isLoading, error } = useGetData<any>(`/admin/course/${selectedItem}/detailed_tasks_stats`);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return <NoDataToDisplay title='no_data.no_courses.title' />;
  }

  return <TableRenderer data={data.data.map((data: any) => data.data)} columns={data.columns} label={data.label} />;
};

export default CoursesTable;
