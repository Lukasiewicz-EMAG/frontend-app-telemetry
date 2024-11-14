import { IntlShape } from "react-intl";

/**
 * Converts a numeric value representing minutes into a readable text format (e.g., "1m", "1h 1m" or long format "1 hour, 1 minute").
 * @param {number} minutes - The number of minutes to be converted.
 * @param {IntlShape} intl - The internationalization object for formatting messages.
 * @param {boolean} [isLong=false] - Whether to use the long format (e.g., "1 hour, 1 minute").
 * @returns {string | null} The formatted time string or null if the input is invalid.
 */
export const formatMinutesToReadableText = (minutes: number, intl: IntlShape, isLong: boolean = false): string | null => {
  // Error Handling
  if (typeof minutes !== 'number' || isNaN(minutes) || minutes < 0) {
    console.error('Invalid value provided. The value must be a non-negative number.');
    return null;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (isLong) {
    if (minutes === 0) return intl.formatMessage({ id: 'time.zero_minutes' });

    if (hours === 0) {
      return intl.formatMessage({ id: 'time.minutes_only' }, { minutes: remainingMinutes });
    }

    if (remainingMinutes === 0) {
      return intl.formatMessage({ id: 'time.hours_only' }, { hours });
    }

    return intl.formatMessage({ id: 'time.hours_and_minutes' }, { hours, minutes: remainingMinutes });
  } else {
    if (minutes === 0) return "0m";

    const hoursText = hours > 0 ? `${hours}h` : '';
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes}m` : '';

    return [hoursText, minutesText].filter(Boolean).join(' ');
  }
};