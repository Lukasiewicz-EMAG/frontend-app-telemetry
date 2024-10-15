import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { DetailsData } from '../types';
import { useGetData } from '../../../../hooks/query';
import { Loader } from '../../../../components/Loader/Loader';

export interface Course {
  id: string;
  name: string;
}

export interface CourseSelectionContextProps {
  courses: Course[];
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  detailsData?: DetailsData;
}

const CourseSelectionContext = createContext<CourseSelectionContextProps | undefined>(undefined);

const ENROLLMENT_ENDPOINT = '/student_code/enrollments';

export const CourseSelectionProvider: React.FC<{ children: ReactNode; endpoint?: string }> = ({
  children,
  endpoint = ENROLLMENT_ENDPOINT,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const { data: coursesData, isLoading, error }: UseQueryResult<Course[], Error> = useGetData<Course[]>(endpoint);

  const courses = coursesData || [];

  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0].id);
    }
  }, [courses, selectedCourse]);

  const { data: detailsData, error: detailsError }: UseQueryResult<DetailsData, Error> = useGetData<DetailsData>(
    `${ENROLLMENT_ENDPOINT}/${selectedCourse}`,
    !!selectedCourse
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Failed to load courses: {error.message}</div>;
  }

  return (
    <CourseSelectionContext.Provider value={{ courses, selectedCourse, setSelectedCourse, detailsData }}>
      {children}
    </CourseSelectionContext.Provider>
  );
};

export const useCourseSelection = (): CourseSelectionContextProps => {
  const context = useContext(CourseSelectionContext);
  if (!context) {
    throw new Error('useCourseSelection must be used within a CourseSelectionProvider');
  }
  return context;
};