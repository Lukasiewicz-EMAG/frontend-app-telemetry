import 'cal-heatmap/cal-heatmap.css';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { EnumTimeSpent } from '../../utils/frontendTypes';
import './../../../node_modules/cal-heatmap/src/cal-heatmap.scss';
import CalHeatmap from './../../../node_modules/cal-heatmap/src/CalHeatmap';
import { Button } from '../ui/button';

export interface ActivityData {
  date: string;
  minutesSpent: number;
}

export interface ActivityCalenderProps {
  data: ActivityData[];
}

export default function Cal({ data }: ActivityCalenderProps) {
  useEffect(() => {
    console.log(data);
  }, [data]);

  const intl = useIntl();
  const cal: any = new CalHeatmap() as any;

  const loadCalendar = async () => {
    const formattedData = data.map(item => ({
      [EnumTimeSpent.DATE]: item[EnumTimeSpent.DATE],
      [EnumTimeSpent.MINUTES_SPENT]: item[EnumTimeSpent.MINUTES_SPENT]
    }));

    const monthNames = Array.from({ length: 12 }, (_, i) =>
      intl.formatMessage({ id: `home.months.${i}` })
    );

    await cal.paint({
      itemSelector: '#cal-heatmap',
      theme: 'light',
      data: { source: formattedData, x: EnumTimeSpent.DATE, y: EnumTimeSpent.MINUTES_SPENT },
      date: { start: setFirstDayOfYears() },
      domain: {
        type: 'month',
        label: {
          text: (timestamp: number) => monthNames[new Date(timestamp).getMonth()],
        },
      },
      scale: {
        color: {
          type: 'quantize',
          scheme: 'Greens',
          domain: [0, 10, 20, 30, 40, 50],
        },
      },
      subDomain: { type: 'day', radius: 2 },
      emptyLabel: intl.formatMessage({ id: 'home.activity_calendar.no_activity' }),
    });
  };

  useEffect(() => {
    loadCalendar();

    return () => {
      cal.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full sm:w-auto overflow-hidden">
      <div
        id='cal-heatmap'
        className="w-full max-w-full overflow-x-auto"
        style={{ maxWidth: '100%' }}
      ></div>

      <div className="flex justify-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            cal.previous();
          }}
        >
          {intl.formatMessage({ id: 'home.activity_calendar.prev' })}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            cal.next();
          }}
        >
          {intl.formatMessage({ id: 'home.activity_calendar.next' })}
        </Button>
      </div>
    </div>
  );
}

const setFirstDayOfYears = () => {
  return new Date(new Date().getFullYear(), 0, 1);
};
