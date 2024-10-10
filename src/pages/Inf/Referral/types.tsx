export type Task = {
    id: string;
    link: string;
    task_difficulty: number;
};

export type Course = {
    course_base: {
        id: string;
        name: string;
    };
    num_total_tasks: number;
    num_completed_tasks: number;
    num_undone_tasks: number;
    completion_percentage: number;
};

export type RecommendationData = {
    unfinished_courses: Course[];
    recommendations: {
        tasks_to_train: Task[];
        time_based_task_ranking: {
            course_base: { id: string; name: string };
            solving_time: { task_base: Task; solving_time_sec: number };
            avg_students_solving_time: number;
            solving_time_diff: number;
        }[];
        error_based_task_ranking: {
            course_base: { id: string; name: string };
            error_rate: { task_base: Task; num_errors: number };
            avg_students_error_rate: number;
            error_rate_diff: number;
        }[];
        unsolved_easier_tasks: Task[];
    };
};