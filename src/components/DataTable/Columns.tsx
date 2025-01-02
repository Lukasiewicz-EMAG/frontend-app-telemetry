import { ColumnDef } from '@tanstack/react-table';
import { FormattedMessage, IntlShape } from 'react-intl';
import { SortableColumnHeader } from './SortableColumnHeader';

export enum ColumnNames {
  Id = 'Id',
  Link = 'Link',
  TaskDifficulty = 'TaskDifficulty',
  Statistic = 'Statistic',
  Sum = 'Sum',
  Average = 'Average',
  SolvingTime = 'SolvingTime',
  AvgStudentsSolvingTime = 'AvgStudentsSolvingTime',
  SolvingTimeDiff = 'SolvingTimeDiff',
  AvgStudentsErrorRate = 'AvgStudentsErrorRate',
  ErrorRateDiff = 'ErrorRateDiff',
}

enum AccessorKeys {
  Id = 'id',
  Link = 'link',
  TaskDifficulty = 'task_difficulty',
  Statistic = 'statistic',
  Sum = 'sum',
  Average = 'average',
  SolvingTime = 'solving_time_sec',
  AvgStudentsSolvingTime = 'avg_students_solving_time',
  SolvingTimeDiff = 'solving_time_diff',
  AvgStudentsErrorRate = 'avg_students_error_rate',
  ErrorRateDiff = 'error_rate_diff',
}

export const CUDColumns = <T,>(intl: IntlShape) =>
  ({
    [ColumnNames.Id]: {
      accessorKey: AccessorKeys.Id,
      header: ({ column }) => {
        console.log('column', column);
        return <SortableColumnHeader column={column} translationKey='cud_columns.id' />;
      },
    },
    [ColumnNames.Link]: {
      accessorKey: AccessorKeys.Link,
      header: ({ column }) => <SortableColumnHeader column={column} translationKey='cud_columns.link' />,
      cell: ({ row }: { row: any }) => {
        const url = row.original[AccessorKeys.Link];
        return (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
            aria-label={intl.formatMessage({ id: 'cud_columns.link.aria_label' }, { url })}
          >
            {url}
          </a>
        );
      },
    },
    [ColumnNames.TaskDifficulty]: {
      accessorKey: AccessorKeys.TaskDifficulty,
      header: ({ column }) => <SortableColumnHeader column={column} translationKey='cud_columns.task_difficulty' />,
      cell: ({ row }: { row: any }) => (
        <span
          aria-label={intl.formatMessage({ id: 'task_difficulty.aria_label' }, { value: row.original.task_difficulty })}
        >
          <FormattedMessage
            id={`task_difficulty.${row.original.task_difficulty}`}
            defaultMessage={`${row.original.task_difficulty}`}
          />
        </span>
      ),
      sortingFn: (rowA: any, rowB: any) => {
        return rowA.original.task_difficulty - rowB.original.task_difficulty;
      },
    },
    [ColumnNames.Statistic]: {
      accessorKey: AccessorKeys.Statistic,
      header: ({ column }) => <SortableColumnHeader column={column} translationKey='cud_columns.statistic' />,
      cell: ({ row }: { row: any }) => (
        <div
          className='text-right font-medium'
          role='cell'
          aria-label={intl.formatMessage({ id: 'cud_columns.statistic' })}
        >
          {row.getValue(AccessorKeys.Statistic)}
        </div>
      ),
    },
    [ColumnNames.Sum]: {
      accessorKey: AccessorKeys.Sum,
      header: ({ column }) => <SortableColumnHeader column={column} translationKey='cud_columns.sum' />,
      cell: ({ row }: { row: any }) => (
        <div
          className='text-right font-medium'
          role='cell'
          aria-label={intl.formatMessage(
            { id: 'cud_columns.sum.aria_label' },
            { value: row.getValue(AccessorKeys.Sum) },
          )}
        >
          {row.getValue(AccessorKeys.Sum)}
        </div>
      ),
    },
    [ColumnNames.Average]: {
      accessorKey: AccessorKeys.Average,
      header: ({ column }) => <SortableColumnHeader column={column} translationKey='cud_columns.average' />,
      cell: ({ row }: { row: any }) => {
        const value = Number(row.getValue(AccessorKeys.Average)).toFixed(2);
        return (
          <div
            className='text-right font-medium'
            role='cell'
            aria-label={intl.formatMessage({ id: 'cud_columns.average.aria_label' }, { value })}
          >
            {value}
          </div>
        );
      },
    },
    [ColumnNames.SolvingTime]: {
      accessorKey: AccessorKeys.SolvingTime,
      header: ({ column }) => <SortableColumnHeader column={column} translationKey='cud_columns.solving_time' />,
      enableSorting: true,
    },
    [ColumnNames.AvgStudentsSolvingTime]: {
      accessorKey: AccessorKeys.AvgStudentsSolvingTime,
      header: intl.formatMessage({ id: 'cud_columns.avg_students_solving_time' }),
      cell: ({ row }: { row: any }) => (
        <div className='text-right font-medium'>{row.original[AccessorKeys.AvgStudentsSolvingTime]}s</div>
      ),
    },
    [ColumnNames.SolvingTimeDiff]: {
      accessorKey: AccessorKeys.SolvingTimeDiff,
      header: intl.formatMessage({ id: 'cud_columns.solving_time_diff' }),
      cell: ({ row }: { row: any }) => (
        <div className='text-right font-medium'>{row.original[AccessorKeys.SolvingTimeDiff]}s</div>
      ),
    },
    [ColumnNames.AvgStudentsErrorRate]: {
      accessorKey: AccessorKeys.AvgStudentsErrorRate,
      header: intl.formatMessage({ id: 'cud_columns.avg_students_error_rate' }),
      cell: ({ row }: { row: any }) => (
        <div className='text-right font-medium'>{row.original[AccessorKeys.AvgStudentsErrorRate]}</div>
      ),
    },
    [ColumnNames.ErrorRateDiff]: {
      accessorKey: AccessorKeys.ErrorRateDiff,
      header: intl.formatMessage({ id: 'cud_columns.error_rate_diff' }),
      cell: ({ row }: { row: any }) => (
        <div className='text-right font-medium'>{row.original[AccessorKeys.ErrorRateDiff]}</div>
      ),
    },
  } satisfies Record<ColumnNames, ColumnDef<T>>);
