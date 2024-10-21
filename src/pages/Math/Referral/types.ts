interface CourseBase {
  id: string;
  name: string;
}

interface InteractiveTasks {
  course_base: CourseBase;
  num_total_tasks: number;
  num_completed_tasks: number;
  num_undone_tasks: number;
  completion_percentage: number;
}

interface UnfinishedCourse {
  interactive_tasks: InteractiveTasks;
  num_visited_generated_tasks: number;
  visited_generated_tasks_percentage: number;
  num_visited_theory_units: number;
  visited_theory_units_percentage: number;
}

interface TaskBase {
  id: string;
  link: string;
  task_difficulty: number;
}

interface SolvingTime {
  task_base: TaskBase;
  solving_time_sec: number;
}

interface TimeBasedTaskRanking {
  course_base: CourseBase;
  solving_time: SolvingTime;
  avg_students_solving_time: number;
  solving_time_diff: number;
}

interface ErrorRate {
  task_base: TaskBase;
  num_errors: number;
}

interface ErrorBasedTaskRanking {
  course_base: CourseBase;
  error_rate: ErrorRate;
  avg_students_error_rate: number;
  error_rate_diff: number;
}

interface Recommendations {
  tasks_to_train: TaskBase[];
  time_based_task_ranking: TimeBasedTaskRanking[];
  error_based_task_ranking: ErrorBasedTaskRanking[];
  unsolved_easier_tasks: TaskBase[];
}

interface CourseData {
  unfinished_courses: UnfinishedCourse[];
  recommendations: Recommendations;
}
