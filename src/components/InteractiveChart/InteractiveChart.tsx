import { useState } from 'react';
import { useIntl } from 'react-intl';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { aggregateData, timeRanges, TimeRangeValue } from '../../utils/chartUtils';
import { TimeSpentDataPoint } from '../../utils/frontendTypes';
import { Button } from '../ui/button';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export interface InteractiveChartProps {
  chartData: TimeSpentDataPoint[];
  dataKey?: string;
}

export const InteractiveChart = ({ chartData, dataKey = 'minutesSpent' }: InteractiveChartProps) => {
  const intl = useIntl();
  const [selectedRange, setSelectedRange] = useState<TimeRangeValue>(TimeRangeValue.Year);
  const filteredChartData = aggregateData(chartData, selectedRange);

  return (
    <>
      {timeRanges.map((range) => (
        <Button
          variant='outline'
          key={range.value}
          onClick={() => setSelectedRange(range.value)}
          className='m-2 px-4 py-2 cursor-pointer'
        >
          {intl.formatMessage({ id: `home.time_spent_chart.range.${range.value}` })}
        </Button>
      ))}

      {filteredChartData.length === 0 ? (
        <div className='text-center text-red-500 mt-4'>
          {intl.formatMessage({ id: 'home.time_spent_chart.no_data' })}
        </div>
      ) : (
        <ResponsiveContainer width={'100%'} height={200} className={'mt-2'}>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={filteredChartData}
              margin={{
                left: 8,
                right: 8,
              }}
            >
              <CartesianGrid className='grid grid-cols-0' />
              <YAxis
                dataKey={'minutesSpent'}
                tickLine={true}
                axisLine={true}
                label={{
                  value: intl.formatMessage({ id: 'home.time_spent_chart.y_axis' }),
                  angle: -90,
                  position: 'insideLeft'
                }}
              />
              <XAxis
                dataKey={'date'}
                tickLine={true}
                axisLine={true}
                label={{
                  value: intl.formatMessage({ id: 'home.time_spent_chart.x_axis' }),
                  position: 'insideBottom'
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator='line'
                    labelFormatter={(value) => {
                      return `${value} ${dataKey === 'minutesSpent' ? intl.formatMessage({ id: 'home.time_spent_chart.minutes' }) : ''}`;
                    }}
                  />
                }
              />
              <Legend
                formatter={() => intl.formatMessage({ id: 'home.time_spent_chart.minutes_spent' })}
              />
              <Line
                dataKey={dataKey}
                type='linear'
                stroke='var(--color-desktop)'
                dot={true}
                name={intl.formatMessage({ id: 'home.time_spent_chart.minutes_spent' })}
              />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      )}
    </>
  );
};