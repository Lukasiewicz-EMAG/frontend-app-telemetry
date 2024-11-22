import { TimeSpentDataPoint } from './frontendTypes';

export enum TimeRangeValue {
  Week = '1w',
  Month = '1m',
  Year = '1y',
}

export const timeRanges: { label: string; value: TimeRangeValue }[] = [
  { label: '1 Week', value: TimeRangeValue.Week },
  { label: '1 Month', value: TimeRangeValue.Month },
  { label: '1 Year', value: TimeRangeValue.Year },
];

export const aggregateData = (data: TimeSpentDataPoint[], range: TimeRangeValue) => {
  const now = new Date();
  let filteredData = [...data];

  switch (range) {
    case TimeRangeValue.Week: {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      filteredData = filteredData.filter((point) => new Date(point.date) >= weekAgo);
      break;
    }
    case TimeRangeValue.Month: {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      filteredData = filteredData.filter((point) => new Date(point.date) >= monthAgo);
      break;
    }
    case TimeRangeValue.Year: {
      const yearAgo = new Date();
      yearAgo.setFullYear(now.getFullYear() - 1);
      filteredData = filteredData.filter((point) => new Date(point.date) >= yearAgo);
      break;
    }
    default:
      break;
  }

  return filteredData;
};
