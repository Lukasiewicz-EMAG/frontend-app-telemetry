
// Best Student Stats Type
export type BestStudentStats = {
    best_student: {
        student_id: string;
        student_name: string;
    };
    most_time_spent: {
        user_name: {
            student_id: string;
            student_name: string;
        };
        most_time_spent: number;
    };
    longest_streak: {
        user_name: {
            student_id: string;
            student_name: string;
        };
        longest_streak: number;
    };
    most_courses_completed: {
        user_name: {
            student_id: string;
            student_name: string;
        };
        most_completed: number;
    };
    most_tasks_solved: {
        user_name: {
            student_id: string;
            student_name: string;
        };
        most_completed: number;
    };
    most_generated_tasks_visited: {
        user_name: {
            student_id: string;
            student_name: string;
        };
        most_completed: number;
    };
};

// Detailed Student Stats Type
export type DetailedStudentStats = {
    student_base: {
        student_id: string;
        student_name: string;
    };
    student_registration_date: string;
    last_activity_date: string;
    total_time_spent: {
        hours: number;
        minutes: number;
    };
    started_courses: number;
    finished_courses: number;
    solved_tasks: number;
    opened_generated_tasks: number;
};

// Data Point for Time Spent in Course
export type TimeSpentInCourseDataPoint = {
    date: string;
    minutes_spent: number;
};

// Data Point for Solved Tasks
export type SolvedTasksDataPoint = {
    date: string;
    tasks_solved: number;
};

// Full Response Type from API
export type StudentStatisticsResponse = {
    best_students_stats: BestStudentStats;
    detailed_students_stats: DetailedStudentStats[];
    time_spent_in_course: TimeSpentInCourse;
    solved_tasks: SolvedTasks;
};

// Props Type for DetailedStatistics Component
export type DetailedStatisticsProps = {
    detailed_students_stats: DetailedStudentStats[];
};


export type TimeSpentInCourse = {
data_points: TimeSpentInCourseDataPoint[];
}

export type SolvedTasks = {
        data_points: SolvedTasksDataPoint[];

}