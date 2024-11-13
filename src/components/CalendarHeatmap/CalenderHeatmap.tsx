import 'cal-heatmap/cal-heatmap.css';
import Tooltip from 'cal-heatmap/plugins/Tooltip';

import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { EnumTimeSpent } from '../../utils/frontendTypes';
import { formatMinutesToHoursAndMinutes } from '../../utils/timeUtils';
import { Button } from '../ui/button';
import './../../../node_modules/cal-heatmap/src/cal-heatmap.scss';
import CalHeatmap from './../../../node_modules/cal-heatmap/src/CalHeatmap';

export interface ActivityData {
  date: string;
  minutesSpent: number;
}

export interface ActivityCalenderProps {
  data: ActivityData[];
}

export default function Cal({ data }: ActivityCalenderProps) {
  const intl = useIntl();
  const cal: any = new CalHeatmap();

  const loadCalendar = async () => {
    const formattedData = data.map((item) => ({
      [EnumTimeSpent.DATE]: item[EnumTimeSpent.DATE],
      [EnumTimeSpent.MINUTES_SPENT]: item[EnumTimeSpent.MINUTES_SPENT],
    }));

    const tooltipOptions = {
      enabled: true,
      text: (timestamp: number, value: number) => {
        if (!value) {
          return intl.formatMessage({ id: 'home.activity_calendar.no_activity' });
        }
        const date = new Date(timestamp);
        const formattedDate = intl.formatDate(date, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const formattedTime = formatMinutesToHoursAndMinutes(value, intl);
        return `${formattedDate}: ${formattedTime}`;
      },
    };

    await cal.paint(
      {
        itemSelector: '#cal-heatmap',
        theme: 'light',
        data: { source: formattedData, x: EnumTimeSpent.DATE, y: EnumTimeSpent.MINUTES_SPENT },
        date: {
          start: setFirstDayOfYears(),
          min: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
        domain: {
          type: 'month',
          label: {
            text: (timestamp: number) => {
              const date = new Date(timestamp);
              return intl.formatDate(date, {
                year: 'numeric',
                month: 'long',
              });
            },
          },
        },
        scale: {
          color: {
            type: 'threshold',
            range: ['#FFFFFF', '#FFE5CC', '#D99848', '#A66721', '#2E6CD3', '#1E4C99'],
            domain: [1, 15, 30, 60, 120],
          },
        },
        subDomain: {
          type: 'day',
          radius: 2,
          width: 15,
          height: 15,
        },
        emptyLabel: intl.formatMessage({ id: 'home.activity_calendar.no_activity' }),
      },
      [[Tooltip, tooltipOptions]],
    );
  };

  useEffect(() => {
    loadCalendar();

    return () => {
      cal.destroy();
    };
  }, []);

  return (
    <div className='flex flex-col items-center w-full sm:w-auto overflow-hidden'>
      <div id='cal-heatmap' className='w-full max-w-full overflow-x-auto px-4' style={{ maxWidth: '900px' }}></div>

      <div className='flex justify-center mt-4 space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={(e) => {
            e.preventDefault();
            cal.previous();
          }}
        >
          {intl.formatMessage({ id: 'home.activity_calendar.prev' })}
        </Button>
        <Button
          variant='outline'
          size='sm'
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
