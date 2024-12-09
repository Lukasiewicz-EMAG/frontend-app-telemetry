import { cn } from '@/lib/utils';
import { DifficultyIcon } from './difficulty-icon';

interface DifficultyBadgeProps {
  level: 1 | 2 | 3;
  className?: string;
}

const DIFFICULTY_LABELS = {
  1: 'Łatwe',
  2: 'Średnie',
  3: 'Trudne',
} as const;

const DIFFICULTY_STYLES = {
  1: 'text-emerald-600 border-emerald-300',
  2: 'text-orange-600 border-orange-300',
  3: 'text-red-600 border-red-300',
} as const;

export function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 h-full font-medium bg-white',
        'font-feature-settings-normal font-variation-settings-normal text-[14px]',
        DIFFICULTY_STYLES[level],
        className,
      )}
    >
      <DifficultyIcon level={level} className='h-4 w-4' />
      {DIFFICULTY_LABELS[level]}
    </div>
  );
}
