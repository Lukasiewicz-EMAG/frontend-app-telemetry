import { APICourse, APIUserStats } from './backendTypes';
import { Course, CourseStats, SolvedTaskSeries, TimeSpentInCourses, UserStats } from './frontendTypes';

const mapAPICourseToCourse = (apiCourse: APICourse): Course => ({
  id: apiCourse.id,
  name: apiCourse.name,
  completedTasks: apiCourse.completed_tasks,
  generatedTasks: apiCourse.generated_tasks,
  startDate: apiCourse.start_date,
  lastActivityDate: apiCourse.last_activity_date,
  completionPercentage: apiCourse.completion_percentage,
});

export const mapAPIUserStatsToUserStats = (data: APIUserStats): UserStats => {
  const completedCourses: Course[] = data.course_stats.completed_courses
    ? data.course_stats.completed_courses.map(mapAPICourseToCourse)
    : [];

  const courseStats: CourseStats = {
    completedCourses,
  };

  const solvedTaskSeries: SolvedTaskSeries = {
    consecutiveDays: data.solved_task_series ? data.solved_task_series.consecutive_days : 0,
  };

  const timeSpentInCourses: TimeSpentInCourses = {
    dataPoints:
      data.time_spent_in_courses && data.time_spent_in_courses.data_points
        ? data.time_spent_in_courses.data_points.map((dp) => ({
            date: dp.date,
            minutesSpent: dp.minutes_spent,
          }))
        : [],
  };

  return {
    courseStats,
    solvedTaskSeries,
    timeSpentInCourses,
  };
};
