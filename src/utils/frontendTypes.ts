export interface Course {
  id: string;
  name: string;
  completedTasks: number;
  generatedTasks: number;
  startDate: string;
  endDate: string | null;
  degree: number | null;
}

export interface CourseStats {
  ongoingCourses: Course[];
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
