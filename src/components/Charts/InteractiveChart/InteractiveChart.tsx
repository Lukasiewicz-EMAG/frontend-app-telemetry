import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TimeRangeValue, timeRanges } from '../../../utils/chartUtils';
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
  const [stateOffsets, setStateOffsets] = useState({
    [TimeRangeValue.Week]: 0,
    [TimeRangeValue.Month]: 0,
    [TimeRangeValue.Year]: 0,
  });

  const handleNavigation = (direction: 'next' | 'prev') => {
    setStateOffsets((prevOffsets) => ({
      ...prevOffsets,
      [selectedRange]: direction === 'prev' ? prevOffsets[selectedRange] - 1 : prevOffsets[selectedRange] + 1,
    }));
  };

  const getDateFormat = (range: TimeRangeValue, date: Date) => {
    switch (range) {
      case TimeRangeValue.Week:
        return date.toLocaleDateString('pl', { weekday: 'short' });
      case TimeRangeValue.Month:
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')} (${date.toLocaleDateString('pl', { weekday: 'short' })})`;
      case TimeRangeValue.Year:
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
      default:
        return date.toLocaleDateString('pl');
    }
  };

  const getCurrentRangeData = () => {
    const now = new Date();
    const offset = stateOffsets[selectedRange];

    switch (selectedRange) {
      case TimeRangeValue.Year: {
        const startMonth = new Date(now.getFullYear(), now.getMonth() + offset, 1);
        const monthlyData = Array.from({ length: 12 }, (_, index) => {
          const monthDate = new Date(startMonth.getFullYear(), startMonth.getMonth() + index, 1);
          const monthData = chartData.filter((point) => {
            const date = new Date(point.date);
            return date.getFullYear() === monthDate.getFullYear() && date.getMonth() === monthDate.getMonth();
          });

          const totalMinutes = monthData.reduce((sum, point) => sum + point.minutesSpent, 0);

          return {
            date: monthDate.toISOString(),
            minutesSpent: totalMinutes,
          };
        });
        return monthlyData;
      }

      case TimeRangeValue.Month: {
        const referenceDate = new Date(now);
        referenceDate.setDate(referenceDate.getDate() + offset * 30);
        const startOfMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
        const endOfMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0);

        const days = Array.from({ length: endOfMonth.getDate() }, (_, i) => {
          const date = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i + 1);
          const existingData = chartData.find((d) => {
            const chartDate = new Date(d.date);
            return (
              chartDate.getFullYear() === date.getFullYear() &&
              chartDate.getMonth() === date.getMonth() &&
              chartDate.getDate() === date.getDate()
            );
          });
          return existingData || { date: date.toISOString(), minutesSpent: 0 };
        });

        return days;
      }

      case TimeRangeValue.Week: {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() + offset - now.getDay());
        const weekData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + i);

          const existingData = chartData.find((d) => {
            const chartDate = new Date(d.date);
            return chartDate.toDateString() === date.toDateString();
          });

          return existingData || { date: date.toISOString(), minutesSpent: 0 };
        });

        return weekData;
      }

      default:
        return [];
    }
  };

  const filteredChartData = getCurrentRangeData().map((point) => ({
    date: getDateFormat(selectedRange, new Date(point.date)),
    minutes: point.minutesSpent,
    originalDate: point.date,
  }));

  return (
    <>
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
                interval={0}
                angle={-45}
                textAnchor='end'
                height={60}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 10 }}
                label={{
                  value: intl.formatMessage({ id: 'home.time_spent_chart.y_axis_label', defaultMessage: 'Minutes' }),
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
                labelFormatter={(label) => {
                  const originalDate = filteredChartData.find((d) => d.date === label)?.originalDate;
                  if (originalDate) {
                    const date = new Date(originalDate);
                    return `${intl.formatMessage({ id: 'tooltip.date' })}: ${date.toLocaleDateString('pl')}`;
                  }
                  return `${intl.formatMessage({ id: 'tooltip.date' })}: ${label}`;
                }}
              />
              <Bar dataKey='minutes' fill='rgb(37, 99, 235)' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='flex justify-center mt-4 space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('prev');
          }}
        >
          {intl.formatMessage({ id: 'home.activity_calendar.prev' })}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('next');
          }}
        >
          {intl.formatMessage({ id: 'home.activity_calendar.next' })}
        </Button>
      </div>
    </>
  );
};

export default InteractiveChart;
