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
  if (typeof value !== 'number' || isNaN(value)) {
    console.error('Invalid value provided. The value must be a valid number.');
    return null;
  }
  if (typeof decimalPoints !== 'number' || isNaN(decimalPoints) || decimalPoints < 0) {
    console.error('Invalid decimalPoints value. It must be a non-negative integer.');
    return null;
  }

  decimalPoints = Math.floor(decimalPoints);

  return parseFloat(value.toFixed(decimalPoints));
};

export const difficultyLabel = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return 'łatwy';
    case 2:
      return 'średni';
    case 3:
      return 'trudny';
    default:
      return 'nieznany';
  }
};

export const difficultyClass = (difficulty: number) => {
  if (difficulty === 1) return 'border-b-[5px] border-b-emerald-300';
  if (difficulty === 2) return 'border-b-[5px] border-b-orange-300';
  if (difficulty === 3) return 'border-b-[5px] border-b-red-500';
  return '';
};

export const difficultyBadgeVariant = (difficulty: number) => {
  if (difficulty === 1) return 'secondary';
  if (difficulty === 2) return 'default';
  if (difficulty === 3) return 'destructive';
  return 'default';
};
