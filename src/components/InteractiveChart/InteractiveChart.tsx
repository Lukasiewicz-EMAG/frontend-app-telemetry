import { useState } from 'react';
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

interface InteractiveChartProps {
  chartData: TimeSpentDataPoint[];
  dataKey?: string;
}

export const InteractiveChart = ({ chartData, dataKey = 'minutesSpent' }: InteractiveChartProps) => {
  const [selectedRange, setSelectedRange] = useState<TimeRangeValue>(TimeRangeValue.Year);
  const filteredChartData = aggregateData(chartData, selectedRange);
  console.log(filteredChartData, 'filteredChartData');

  return (
    <>
      {timeRanges.map((range) => (
        <Button
          variant='outline'
          key={range.value}
          onClick={() => setSelectedRange(range.value)}
          className='m-2 px-4 py-2 cursor-pointer'
        >
          {range.label}
        </Button>
      ))}

      {filteredChartData.length === 0 ? (
        <div className='text-center text-red-500 mt-4'>Wybrane dane nie pokrywają się</div>
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
              <YAxis dataKey={'minutesSpent'} tickLine={true} axisLine={true} />
              <XAxis dataKey={'date'} tickLine={true} axisLine={true} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator='line'
                    labelFormatter={(value) => {
                      console.log(value, 'value');
                      return `${value} ${dataKey === 'minutesSpent' ? 'minutes' : ''}`;
                    }}
                  />
                }
              />
              <Legend />
              <Line dataKey={dataKey} type='linear' stroke='var(--color-desktop)' dot={true} />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      )}
    </>
  );
};
