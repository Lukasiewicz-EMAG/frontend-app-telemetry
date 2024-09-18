export interface APICourse {
  id: string;
  name: string;
  completed_tasks: number;
  generated_tasks: number;
  start_date: string;
  end_date: string | null;
  degree: number | null;
}

export interface APICourseStats {
  ongoing_courses: APICourse[];
  completed_courses: APICourse[];
}

export interface APISolvedTaskSeries {
  consecutive_days: number;
}

export interface APITimeSpentDataPoint {
  date: string;
  minutes_spent: number;
}

export interface APITimeSpentInCourses {
  data_points: APITimeSpentDataPoint[];
}

export interface APIUserStats {
  course_stats: APICourseStats;
  solved_task_series: APISolvedTaskSeries;
  time_spent_in_courses: APITimeSpentInCourses;
}
