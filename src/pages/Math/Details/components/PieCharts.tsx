import { InteractivePieChart } from '../../../../components/Charts/PieChart/PieChart';
import { ChartConfig } from '../../../../components/ui/chart';
import { CourseStats } from '../types';

export const PieCharts = ({ data }: { data: CourseStats['completion_stats'] }) => {
  const lastChartData = createTheoryData(data.completion_base.visited_theory_units_percentage);
  const secondChartData = createTheoryData(data.completion_base.visited_generated_tasks_percentage);
  const inSideChartData = [
    { name: 'Only RE', value: data.only_re_percentage },
    { name: 'Only SWE', value: data.only_swe_percentage },
    { name: 'RE and SWE', value: data.re_and_swe_percentage },
  ];

  const outsideCharData = [
    { name: 'Completion', value: data.completion_base.interactive_tasks.completion_percentage },
    { name: 'Incomplete', value: 100 - data.completion_base.interactive_tasks.completion_percentage, fill: '#fff' },
  ];

  const chartConfig = {
    interactiveTasks: {
      label: 'Procent zakończonych zadań interaktywnych',
    },
    generatedTasks: {
      label: 'Procent otwartych zadań generowanych',
    },
    theoryUnits: {
      label: 'Procent jednostek teorii',
    },
  } satisfies ChartConfig;

  return (
    <div className='grid grid-cols-3 gap-4 mt-4'>
      <InteractivePieChart
        title='Procent zakończonych zadań interaktywnych'
        data={inSideChartData}
        secondData={outsideCharData}
        chartConfig={chartConfig.interactiveTasks}
      />
      <InteractivePieChart
        title='Procent otwartych zadań generowanych'
        data={secondChartData}
        chartConfig={chartConfig.generatedTasks}
      />
      <InteractivePieChart
        title='Procent jednostek teorii'
        data={lastChartData}
        chartConfig={chartConfig.theoryUnits}
      />
    </div>
  );
};

const createTheoryData = (visitedTheoryUnitsPercentage: number) => {
  return [
    { name: 'Theory', value: visitedTheoryUnitsPercentage },
    { name: 'Other', value: 100 - visitedTheoryUnitsPercentage, fill: '#fff' },
  ];
};
