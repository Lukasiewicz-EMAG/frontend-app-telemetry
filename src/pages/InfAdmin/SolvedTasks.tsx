import { useIntl } from 'react-intl';
import { DetailedStatisticsProps, SolvedTasks } from './types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type SolvedTasksProps = {
    solved_tasks: SolvedTasks;
};

export const SolvedTasksChart = ({ solved_tasks }: SolvedTasksProps) => {
    const intl = useIntl();

    const chartData = solved_tasks.data_points.map(point => ({
        date: new Date(point.date).toLocaleDateString('pl', { month: 'long', day: 'numeric' }),
        tasks_solved: point.tasks_solved
    }));

    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>{intl.formatMessage({ id: 'admin_inf.tasks_solved' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis
                                dataKey="date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${intl.formatNumber(value)}m`}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                                labelStyle={{ color: "hsl(var(--foreground))" }}
                                formatter={(value, name) => [
                                    intl.formatMessage({ id: `tooltip.${name}` }) + value
                                ]}
                                labelFormatter={(label) => `${intl.formatMessage({ id: 'tooltip.date', defaultMessage: 'Date' })}: ${label}`}
                            />
                            <Bar
                                dataKey="tasks_solved"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export default SolvedTasksChart;
