import { ColumnDef } from "@tanstack/react-table";
import { FormattedMessage, IntlShape } from 'react-intl';
import { SortableColumnHeader } from './SortableColumnHeader';

export enum ColumnNames {
  Id = "Id",
  Link = "Link",
  TaskDifficulty = "TaskDifficulty",
  Statistic = "Statistic",
  Sum = "Sum",
  Average = "Average",
  SolvingTime = "SolvingTime",
}

enum AccessorKeys {
  Id = "id",
  Link = "link",
  TaskDifficulty = "task_difficulty",
  Statistic = "statistic",
  Sum = "sum",
  Average = "average",
  SolvingTime = "solving_time_sec",
}

export const CUDColumns = <T,>(intl: IntlShape) => ({
  [ColumnNames.Id]: {
    accessorKey: AccessorKeys.Id,
    header: intl.formatMessage({ id: 'cudColumns.id' }),
  },
  [ColumnNames.Link]: {
    accessorKey: AccessorKeys.Link,
    header: intl.formatMessage({ id: 'cudColumns.link' }),
    cell: ({ row }: { row: any }) => (
      <a href={row.original[AccessorKeys.Link]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        {row.original[AccessorKeys.Link]}
      </a>
    ),
  },
  [ColumnNames.TaskDifficulty]: {
    accessorKey: AccessorKeys.TaskDifficulty,
    header: ({ column }) => (
      <SortableColumnHeader column={column} translationKey="cudColumns.taskDifficulty" />
    ),
    cell: ({ row }: { row: any }) => (
      <span title={`Wartość numeryczna: ${row.original.task_difficulty}`}>
        <FormattedMessage id={`task_difficulty.${row.original.task_difficulty}`} defaultMessage={`${row.original.task_difficulty}`} />
      </span>
    ),
    sortingFn: (rowA: any, rowB: any) => {
      return rowA.original.task_difficulty - rowB.original.task_difficulty;
    },
  },
  [ColumnNames.Statistic]: {
    accessorKey: AccessorKeys.Statistic,
    header: intl.formatMessage({ id: 'cudColumns.statistic' }),
  },
  [ColumnNames.Sum]: {
    accessorKey: AccessorKeys.Sum,
    header: ({ column }) => (
      <SortableColumnHeader column={column} translationKey="cudColumns.sum" />
    ),
    cell: ({ row }: { row: any }) => <div className="text-right font-medium">{row.getValue(AccessorKeys.Sum)}</div>,
  },
  [ColumnNames.Average]: {
    accessorKey: AccessorKeys.Average,
    header: ({ column }) => (
      <SortableColumnHeader column={column} translationKey="cudColumns.average" />
    ),
    cell: ({ row }: { row: any }) => <div className="text-right font-medium">{Number(row.getValue(AccessorKeys.Average)).toFixed(2)}</div>,
  },
  [ColumnNames.SolvingTime]: {
    accessorKey: AccessorKeys.SolvingTime,
    header: ({ column }) => (
      <SortableColumnHeader column={column} translationKey="cudColumns.solvingTime" />
    ),
    enableSorting: true,
  },
}) satisfies Record<ColumnNames, ColumnDef<T>>;