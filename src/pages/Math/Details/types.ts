export type CourseBase = {
  id: string;
  name: string;
};

export type TimeSpent = {
  hours: number;
  minutes: number;
};

export type TaskStats = {
  num_correct_swe: number;
  avg_correct_swe_per_task: number;
  num_incorrect_swe: number;
  avg_incorrect_swe_per_task: number;
  num_correct_re: number;
  avg_correct_re_per_task: number;
  num_incorrect_re: number;
  avg_incorrect_re_per_task: number;
  num_taken_hint: number;
  avg_taken_hint_per_task: number;
};

export type CompletionStats = {
  interactive_tasks: {
    course_base: CourseBase;
    num_total_tasks: number;
    num_completed_tasks: number;
    num_undone_tasks: number;
    completion_percentage: number;
  };
  num_visited_generated_tasks: number;
  visited_generated_tasks_percentage: number;
  num_visited_theory_units: number;
  visited_theory_units_percentage: number;
};

export type ErrorRates = {
  re_error_rate: number;
  swe_error_rate: number;
  visited_units_percentage: number;
  only_re_percentage: number;
  only_swe_percentage: number;
  re_and_swe_percentage: number;
};

export type TimeSpentInCourse = {
  data_points: Array<{
    date: string;
    minutes_spent: number;
  }>;
};

export type TaskBase = {
  id: string;
  link: string;
  task_difficulty: number;
};

export type TimeBasedTaskRanking = {
  task_base: TaskBase;
  solving_time_sec: number;
};

export type CourseStats = {
  course_base: CourseBase;
  total_time_spent: TimeSpent;
  completion_stats: {
    completion_base: CompletionStats;
    re_error_rate: number;
    swe_error_rate: number;
    visited_units_percentage: number;
    only_re_percentage: number;
    only_swe_percentage: number;
    re_and_swe_percentage: number;
  };
  all_tasks_stats: TaskStats;
  solved_tasks_stats: TaskStats;
  unsolved_tasks_stats: TaskStats;
  time_spent_in_course: TimeSpentInCourse;
  time_based_task_ranking: TimeBasedTaskRanking[];
  task_to_repeat: TaskBase;
  visited_but_unsolved_tasks: TaskBase[];
};
