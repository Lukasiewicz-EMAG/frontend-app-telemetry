import { useIntl } from 'react-intl';
import { TimeSpentDataPoint } from '../../../utils/frontendTypes';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useState } from 'react';
import { TimeRangeValue, aggregateData, timeRanges } from '../../../utils/chartUtils';
import { Button } from '../../ui/button';

export interface InteractiveChartProps {
  chartData: TimeSpentDataPoint[];
  dataKey?: string;
}

export const InteractiveChart = ({ chartData, dataKey = 'minutesSpent' }: InteractiveChartProps) => {
  console.log('chartData', chartData)
  const intl = useIntl();
  const [selectedRange, setSelectedRange] = useState<TimeRangeValue>(TimeRangeValue.Year);
  const filteredChartData = aggregateData(chartData, selectedRange).map(point => ({
    date: new Date(point.date).toLocaleDateString('pl', { month: 'long', day: 'numeric' }),
    minutes: point.minutesSpent
  }));

  return (
    <div className="h-[300px] mt-4 pb-12">
      <div className="flex gap-2 mb-4">
        {timeRanges.map((range) => (
          <Button
            variant={selectedRange === range.value ? 'default' : 'outline'}
            key={range.value}
            onClick={() => setSelectedRange(range.value)}
          >
            {intl.formatMessage({ id: `home.time_spent_chart.range.${range.value}` })}
          </Button>
        ))}
      </div>
      {filteredChartData.length === 0 ? (
        <div className='text-center text-red-500 mt-4'>
          {intl.formatMessage({ id: 'home.time_spent_chart.no_data', defaultMessage: 'No data available' })}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value, name) => [
                value,
                intl.formatMessage({ id: `tooltip.${name}` })
              ]}
              labelFormatter={(label) => `${intl.formatMessage({ id: 'tooltip.date' })}: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default InteractiveChart;
