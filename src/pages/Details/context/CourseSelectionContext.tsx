import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HttpClient } from "@/utils/httpClient";

export interface Course {
    id: string;
    name: string;
}

export interface CourseSelectionContextProps {
    courses: Course[];
    selectedCourse: string;
    setSelectedCourse: (course: string) => void;
}

const CourseSelectionContext = createContext<CourseSelectionContextProps | undefined>(undefined);

const API_BASE_URL = 'https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/api';
const ENROLLMENT_ENDPOINT = '/student_code/enrollments';

export const CourseSelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('');

    useEffect(() => {
        const fetchCourses = async () => {
            const httpClient = new HttpClient(API_BASE_URL);
            try {
                const response = await httpClient.get<Course[]>(ENROLLMENT_ENDPOINT);
                setCourses(response.data);
                if (response.data.length > 0 && !selectedCourse) {
                    setSelectedCourse(response.data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <CourseSelectionContext.Provider value={{ courses, selectedCourse, setSelectedCourse }}>
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