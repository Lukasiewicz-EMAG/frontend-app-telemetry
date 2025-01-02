import { CardData } from "../../../components/StatsCard/types";

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

export interface ColumnDefinition {
  column_type: ColumnType;
  field: string;
  translation_key: string;
}

// Generic type for data rows in rankings or task lists
export interface DataRow<T> {
  data: T;
}

// Types for different sections of recommendation data
export interface ErrorBasedTaskRankingData {
  avg_students_error_rate: number;
  course_name: string;
  error_rate_diff: number;
  num_errors: number;
  task_link: string;
  task_title: string;
}

export interface TasksToTrainData {
  course_name: string;
  task_difficulty: number;
  task_link: string;
  task_title: string;
}

export interface TimeBasedTaskRankingData {
  avg_students_solving_time: number;
  course_name: string;
  solving_time_diff: number;
  solving_time_sec: number;
  task_link: string;
  task_title: string;
}

export interface UnfinishedCoursesData {
  completion_percentage: number;
  course_name: string;
  num_undone_tasks: number;
}

export interface UnsolvedEasierTasksCard {
  card_type: string;
  translation_key: string;
  value: {
    course_name: string;
    difficulty: number;
    task_link: string;
    task_name: string;
  };
}

export type ColumnType = 'text' | 'link' | 'float' | 'int' | 'task_difficulty' | 'translate_text' | 'date';

export interface ColumnDefinition {
  column_type: ColumnType;
  field: string;
  translation_key: string;
}

export interface DataRow<T> {
  data: T;
}



export interface CardsData {
  cards: CardData[];
}

export interface TaskStatisticsTableData {
  statistic: string;
  sum: number;
  average: number;
}

export interface TaskStatisticsTable {
  label: string;
  columns: ColumnDefinition[];
  data: any[];
}

export interface TaskStatisticsTables {
  all_tasks: TaskStatisticsTable;
  solved_tasks: TaskStatisticsTable;
  unsolved_tasks: TaskStatisticsTable;
}

export interface DropdownOption {
  field: string;
  translation_key: string;
}

export interface TaskToRepeat {
  id: string;
  title: string;
  link: string;
  task_difficulty: number;
}

export interface TimeSpentInCourse {
  data_points: any[]; // Assuming it's an empty array, the specific structure is unknown
}

export interface VisitedButUnsolvedTasks {
  label: string;
  columns: ColumnDefinition[];
  data: DataRow<{ task_id: string; task_link: string; task_difficulty: number; title: string }>[];
}

export interface RecomendationDataResponse {
  error_based_task_ranking: {
    columns: ColumnDefinition[];
    data: DataRow<ErrorBasedTaskRankingData>[];
    label: string;
  };
  tasks_to_train: {
    columns: ColumnDefinition[];
    data: DataRow<TasksToTrainData>[];
    label: string;
  };
  time_based_task_ranking: {
    label: string;
    columns: ColumnDefinition[];
    data: DataRow<{ task_id: string; task_link: string; time_spent: number; task_difficulty: number; title: string }>[];
  };
  unfinished_courses: {
    columns: ColumnDefinition[];
    data: DataRow<UnfinishedCoursesData>[];
    label: string;
  };
  unfinished_visited_tasks: {
    label: string;
    columns: ColumnDefinition[];
    data: DataRow<{
      task_id: string;
      task_link: {
        text: string;
        href: string;
      };
      task_difficulty: number;
    }>[];
  };
  unsolved_easier_tasks: {
    cards: UnsolvedEasierTasksCard[];
  };
  cards: CardsData;
  task_statistics: {
    tables: TaskStatisticsTables;
    dropdown_options: DropdownOption[];
  };
  time_spent_in_course: TimeSpentInCourse;
  task_to_repeat: TaskToRepeat;
  visited_but_unsolved_tasks: VisitedButUnsolvedTasks;
}
