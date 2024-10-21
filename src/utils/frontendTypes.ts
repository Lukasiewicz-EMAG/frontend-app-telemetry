export interface Course {
  id: string;
  name: string;
  completedTasks: number;
  generatedTasks: number;
  startDate: string;
  lastActivityDate: string;
  completionPercentage: number;
}

export interface CourseStats {
  completedCourses: Course[];
}

export interface SolvedTaskSeries {
  consecutiveDays: number;
}

export interface TimeSpentDataPoint {
  date: string;
  minutesSpent: number;
}

export enum EnumTimeSpent {
  DATE = 'date',
  MINUTES_SPENT = 'minutesSpent',
}

export interface TimeSpentInCourses {
  dataPoints: TimeSpentDataPoint[];
}

export interface UserStats {
  courseStats: CourseStats;
  solvedTaskSeries: SolvedTaskSeries;
  timeSpentInCourses: TimeSpentInCourses;
}
