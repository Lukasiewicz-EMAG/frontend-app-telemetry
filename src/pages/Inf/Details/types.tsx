import { CardsData, TaskStatisticsTables, DropdownOption, ColumnDefinition, DataRow, TaskToRepeat, VisitedButUnsolvedTasks } from "../Referral/types";

export interface CourseBase {
    id: string;
    name: string;
}

export interface TotalTimeSpent {
    hours: number;
    minutes: number;
}

export interface CompletionBase {
    course_base: CourseBase;
    num_total_tasks: number;
    num_completed_tasks: number;
    num_undone_tasks: number;
    completion_percentage: number;
}

export interface CompletionStats {
    completion_base: CompletionBase;
    num_completed_with_hint: number;
    completion_percentage_with_hint: number;
    num_completed_with_answer: number;
    completion_percentage_with_answer: number;
}

export interface TaskStats {
    num_code_runs: number;
    avg_code_runs_per_task: number;
    num_code_runs_with_error: number;
    avg_code_runs_with_error_per_task: number;
    num_answer_checks: number;
    avg_answer_checks_per_task: number;
    num_answer_checks_with_error: number;
    avg_answer_checks_with_error_per_task: number;
}

export interface TimeSpentDataPoint {
    date: string;
    minutes_spent: number;
}

export interface TimeSpentInCourse {
    data_points: TimeSpentDataPoint[];
}

export interface TaskBase {
    id: string;
    link: string;
    task_difficulty: number;
}

export interface TimeBasedTaskRanking {
    task_base: TaskBase;
    solving_time_sec: number;
}

export interface DetailsData {
    cards: CardsData;
    task_statistics: {
        tables: TaskStatisticsTables;
        dropdown_options: DropdownOption[];
    };
    time_spent_in_course: TimeSpentInCourse;
    time_based_task_ranking: {
        label: string;
        columns: ColumnDefinition[];
        data: DataRow<{ task_id: string; task_link: string; time_spent: number; task_difficulty: number; title: string }>[];
    };
    task_to_repeat: TaskToRepeat;
    visited_but_unsolved_tasks: VisitedButUnsolvedTasks;
}