import { Cell, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const COLORS = ['#0088FE', '#FFF', '#FFBB28', '#FF8042'];

export function InteractivePieChart({
  title,
  description,
  data,
  secondData,
  chartConfig,
}: {
  chartConfig: any;
  title: string;
  description?: string;
  data: any;
  secondData?: any;
}) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-center'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey='visitors'
                  nameKey='month'
                  indicator='line'
                  labelFormatter={(_, payload) => {
                    return chartConfig.label;
                  }}
                />
              }
            />
            <Pie data={data} dataKey='value' outerRadius={60}>
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='black' strokeWidth={1} />
              ))}
            </Pie>
            {secondData && (
              <Pie data={secondData} dataKey='value' innerRadius={70} outerRadius={90}>
                {secondData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='black' strokeWidth={1} />
                ))}
              </Pie>
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
