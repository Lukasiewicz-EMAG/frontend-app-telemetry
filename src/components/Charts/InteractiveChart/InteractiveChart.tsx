import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TimeRangeValue, aggregateData, timeRanges } from '../../../utils/chartUtils';
import { TimeSpentDataPoint } from '../../../utils/frontendTypes';
import NoDataToDisplay from '../../NoDataToDisplay/NoDataToDisplay';
import { Button } from '../../ui/button';

export interface InteractiveChartProps {
  chartData: TimeSpentDataPoint[];
  dataKey?: string;
}

export const InteractiveChart = ({ chartData, dataKey = 'minutesSpent' }: InteractiveChartProps) => {
  const intl = useIntl();
  const [selectedRange, setSelectedRange] = useState<TimeRangeValue>(TimeRangeValue.Year);
  const filteredChartData = aggregateData(chartData, selectedRange).map((point) => ({
    date: new Date(point.date).toLocaleDateString('pl', { month: 'long', day: 'numeric' }),
    minutes: point.minutesSpent,
  }));

  return (
    <div className='h-[300px] mt-4 pb-12'>
      <div className='flex gap-2 mb-4'>
        {timeRanges.map((range) => (
          <Button
            variant={selectedRange === range.value ? 'default' : 'outline'}
            className={selectedRange === range.value ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
            key={range.value}
            onClick={() => setSelectedRange(range.value)}
          >
            {intl.formatMessage({ id: `home.time_spent_chart.range.${range.value}` })}
          </Button>
        ))}
      </div>
      {filteredChartData.length === 0 ? (
        <NoDataToDisplay desc='home.time_spent_chart.no_data' show={{ title: false, desc: true, icon: true }} />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={filteredChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888', fontSize: 10 }}
              interval={0} // pokazuj wszystkie etykiety
              angle={-45} // obróć etykiety dla lepszej czytelności
              textAnchor='end' // wyrównaj etykiety
              height={60} // zwiększ miejsce na etykiety
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888', fontSize: 10 }}
              label={{
                value: intl.formatMessage({ id: 'home.time_spent_chart.y_axis_label', defaultMessage: 'Minuty' }),
                angle: -90,
                position: 'insideLeft',
                fill: '#888',
                dy: -10,
                style: { textAnchor: 'middle' },
              }}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value, name) => [value, intl.formatMessage({ id: `tooltip.${name}` })]}
              labelFormatter={(label) => `${intl.formatMessage({ id: 'tooltip.date' })}: ${label}`}
            />
            <Bar dataKey='minutes' fill='rgb(37, 99, 235)' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default InteractiveChart;
