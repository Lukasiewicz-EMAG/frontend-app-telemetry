import { IntlShape } from 'react-intl';

export const formatMinutesToHoursAndMinutes = (minutes: number, intl: IntlShape): string => {
  if (minutes === 0) return intl.formatMessage({ id: 'time.zero_minutes' });

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return intl.formatMessage({ id: 'time.minutes_only' }, { minutes: remainingMinutes });
  }

  if (remainingMinutes === 0) {
    return intl.formatMessage({ id: 'time.hours_only' }, { hours });
  }

  return intl.formatMessage({ id: 'time.hours_and_minutes' }, { hours, minutes: remainingMinutes });
};
