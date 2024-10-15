import { useIntl } from 'react-intl';
import { useGetData } from '../../../hooks/query';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Loader } from '../../../components/Loader/Loader';

type BestStudentStats = {
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

type StudentStatisticsResponse = {
    best_students_stats: BestStudentStats;
};

const StatCard = ({ title, value, number }: { title: string; value: string; number?: number }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <span className="text-2xl font-bold">
                {value} {number !== undefined && `(${number})`}
            </span>
        </CardContent>
    </Card>
);

export const StudentStatistics = () => {
    const intl = useIntl();
    const { data, isLoading, error } = useGetData<StudentStatisticsResponse>('/admin_code/students_stats');

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-center text-red-500">{intl.formatMessage({ id: 'error.no_data' })}</p>;
    }

    const stats = data?.best_students_stats;

    return (
        <div className='mt-4 mx-0 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16'>
            <h1 className="text-2xl font-bold">Statystyki ogólne</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                <StatCard
                    title="Najlepszy użytkownik"
                    value={stats?.best_student?.student_name || 'N/A'}
                />
                <StatCard
                    title="Najwięcej czasu spędzonego w kursach"
                    value={`${stats?.most_time_spent?.user_name?.student_name || 'N/A'}`}
                    number={stats?.most_time_spent?.most_time_spent}
                />
                <StatCard
                    title="Najdłuższy streak"
                    value={`${stats?.longest_streak?.user_name?.student_name || 'N/A'}`}
                    number={stats?.longest_streak?.longest_streak}
                />
                <StatCard
                    title="Najwięcej zrealizowanych kursów"
                    value={`${stats?.most_courses_completed?.user_name?.student_name || 'N/A'}`}
                    number={stats?.most_courses_completed?.most_completed}
                />
                <StatCard
                    title="Najwięcej rozwiązanych zadań"
                    value={`${stats?.most_tasks_solved?.user_name?.student_name || 'N/A'}`}
                    number={stats?.most_tasks_solved?.most_completed}
                />
                <StatCard
                    title="Najwięcej rozwiązanych zadań (generowanych)"
                    value={`${stats?.most_generated_tasks_visited?.user_name?.student_name || 'N/A'}`}
                    number={stats?.most_generated_tasks_visited?.most_completed}
                />
            </div>
        </div>
    );
};

export default StudentStatistics;