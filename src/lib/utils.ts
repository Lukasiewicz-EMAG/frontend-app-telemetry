import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

export const isDev = (): boolean => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
};

/**
 * Formats a given numeric value to a specific number of decimal points.
 * @param {number} value - The numeric value to be formatted.
 * @param {number} [decimalPoints=2] - The number of decimal points to format the value to.
 * @returns {number | null} The formatted float value or null if the input is invalid.
 */
export const formatFloatValue = (value: number, decimalPoints: number = 2): number | null => {
  // Error Handling
  if (typeof value !== 'number' || isNaN(value)) {
    console.error('Invalid value provided. The value must be a valid number.');
    return null;
  }
  if (typeof decimalPoints !== 'number' || isNaN(decimalPoints) || decimalPoints < 0) {
    console.error('Invalid decimalPoints value. It must be a non-negative integer.');
    return null;
  }

  // Ensure decimalPoints is an integer
  decimalPoints = Math.floor(decimalPoints);

  // Format the value to the specified number of decimal points
  return parseFloat(value.toFixed(decimalPoints));
};
