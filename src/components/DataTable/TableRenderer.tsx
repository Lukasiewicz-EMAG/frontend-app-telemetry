import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { formatFloatValue } from '../../lib/utils';
import { ColumnDefinition } from '../../pages/Inf/Referral/types';
import { formatMinutesToReadableText } from '../../utils/timeUtils';
import { DifficultyBadge } from '../DifficultyBadge/difficulty-badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { DataTable } from './DataTable';

export interface NumberFilterValue {
  operator: string;
  value: string;
}

export const numberFilter: FilterFn<any> = (row, columnId, filterValue: NumberFilterValue) => {
  if (!filterValue) return true;
  const rowValue = row.getValue(columnId);
  const { operator, value } = filterValue || {};
  if (value == null || value === '') {
    return true;
  }
  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue)) {
    return false;
  }
  if (rowValue == null) {
    return false;
  }
  const parsedRowValue = parseFloat(String(rowValue));
  if (isNaN(parsedRowValue)) {
    return false;
  }
  switch (operator) {
    case '=':
      return parsedRowValue === parsedValue;
    case '!=':
      return parsedRowValue !== parsedValue;
    case '>':
      return parsedRowValue > parsedValue;
    case '>=':
      return parsedRowValue >= parsedValue;
    case '<':
      return parsedRowValue < parsedValue;
    case '<=':
      return parsedRowValue <= parsedValue;
    default:
      return true;
  }
};

export const floatFilter: FilterFn<any> = (row, columnId, filterValue: NumberFilterValue) => {
  if (!filterValue) return true;
  const decimalPoints = 2
  const { operator, value } = filterValue;

  // Get the raw row value
  const rowValue = row.getValue(columnId);

  if (value == null || value === '') {
    return true;
  }

  const parsedFilterValue = parseFloat(String(value));
  if (isNaN(parsedFilterValue)) {
    return false;
  }

  if (rowValue == null) {
    return false;
  }

  const parsedRowValue = parseFloat(String(rowValue));
  if (isNaN(parsedRowValue)) {
    return false;
  }

  const formattedRowValue = formatFloatValue(parsedRowValue, decimalPoints);
  const formattedFilterValue = formatFloatValue(parsedFilterValue, decimalPoints);

  if (formattedRowValue === null || formattedFilterValue === null) {
    return false;
  }

  switch (operator) {
    case '=':
      return formattedRowValue === formattedFilterValue;
    case '!=':
      return formattedRowValue !== formattedFilterValue;
    case '>':
      return formattedRowValue > formattedFilterValue;
    case '>=':
      return formattedRowValue >= formattedFilterValue;
    case '<':
      return formattedRowValue < formattedFilterValue;
    case '<=':
      return formattedRowValue <= formattedFilterValue;
    default:
      return true;
  }
};

export const dateFilter: FilterFn<any> = (row, columnId, filterValue: [string | null, string | null]) => {
  if (!filterValue) return true;

  const rowValue = row.getValue(columnId);
  const [startDate, endDate] = filterValue || [null, null];

  // Check if rowValue is valid and can be parsed as a date
  if (!rowValue) return false;
  if (!rowValue || (typeof rowValue !== 'string' && typeof rowValue !== 'number')) {
    return false; // Invalid rowValue
  }
  const parsedRowDate = new Date(rowValue);
  if (isNaN(parsedRowDate.getTime())) {
    return false; // Invalid date
  }

  // Convert to YYYY-MM-DD format for comparison
  const rowDate = parsedRowDate.toISOString().split('T')[0];

  if (startDate && rowDate < startDate) {
    return false; // Row date is before startDate
  }

  if (endDate && rowDate > endDate) {
    return false; // Row date is after endDate
  }

  return true; // Row date is within range or no range specified
};

export const taskDifficultyFilter: FilterFn<any> = (row, columnId, filterValue: (number | string)[]) => {
  if (!filterValue || filterValue.length === 0) return true; // No filters applied

  let rowValue = row.getValue(columnId) as any;
  if (rowValue === null) {
    rowValue = 'N/A';
  }
  return filterValue.includes(rowValue);
};

export const linkFilter: FilterFn<any> = (row, columnId: string, filterValue: string) => {
  const search = filterValue?.toString()?.toLowerCase();
  let rowValue = row.getValue(columnId) as any;
  const linkText = rowValue.text || '';
  return Boolean(linkText?.toLowerCase()?.includes(search));
};

type TableRendererProps = {
  columns: ColumnDefinition[];
  data: Record<string, any>[];
  label?: string;
  description?: string;
  displayInCard?: boolean;
};

const TableRenderer: React.FC<TableRendererProps> = ({ columns, data, label, description, displayInCard = true }) => {
  const intl = useIntl();

  const getSize = (column: ColumnDefinition) => {
    if (column.column_type === 'text' || column.column_type === 'link') {
      if (column.field === 'name') {
        return 350;
      }
      return 175;
    } else {
      return 125;
    }
  };

  const columnDefs: ColumnDef<Record<string, any>>[] = useMemo(() => {

    return columns.map((column) => ({
      accessorKey: column.field,
      header: () => {
        const title = intl.formatMessage({
          id: `cud_columns.${column.translation_key}`,
        });

        if (column.field === 'sum' || column.field === 'average') {
          const tooltipContent = intl.formatMessage({
            id: `cud_columns.${column.field}_tooltip`,
          });

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>{title}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltipContent}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }

        return title;
      },
      cell: ({ getValue }) => {
        if (column.field === 'time_spent') {
          return <span>{formatMinutesToReadableText(getValue() ? (getValue() as number) : 0, intl)}</span>;
        }
        if (column.column_type === 'translate_text') {
          return (
            <span>
              {intl.formatMessage({
                id: 'cud_columns_values.' + (getValue() as string),
              })}
            </span>
          );
        }
        if (column.column_type === 'link') {
          const value = getValue() as { href: string; text: string };
          const href = value.href;
          const text = value.text;
          return (
            <a
              className='text-blue-600 dark:text-blue-500 hover:underline'
              href={href}
              target='_blank'
              rel='noopener noreferrer'
            >
              {text}
            </a>
          );
        }
        if (column.column_type === 'float') {
          return formatFloatValue(getValue() as number);
        }
        if (column.column_type === 'percent') {
          return formatFloatValue(getValue() as number)
        }
        if (column.column_type === 'date') {
          const value = getValue() || 'N/A';
          return <span>{value}</span>;
        }

        if (column.column_type === 'task_difficulty') {
          const value = (getValue() as number) || 'N/A';
          if (value === 'N/A' || ![1, 2, 3].includes(value)) {
            return <span>N/A</span>;
          }
          return <DifficultyBadge level={value as 1 | 2 | 3} />;
        }
        return getValue();
      },
      size: getSize(column),
      meta: {
        columnType: column.column_type,
      },
      filterFn: (() => {
        switch (column.column_type) {
          case 'int':
            return numberFilter;
          case 'float':
            return floatFilter;
          case 'percent':
            return floatFilter;
          case 'date':
            return dateFilter;
          case 'task_difficulty':
            return taskDifficultyFilter;
          case 'link':
            return linkFilter;
          default:
            return 'includesString';
        }
      })(),
    }));
  }, [columns, intl]);

  const title = label ? (
    <h2 className='font-semibold leading-none tracking-tight text-lg my-4'>
      {intl.formatMessage({
        id: 'table_labels.' + label,
      })}
    </h2>
  ) : null;
  const additionalDescription = label
    ? intl.formatMessage(
      { id: `table_labels.${label}_description` },
      { defaultMessage: '' }, // Provide empty default if translation is missing
    )
    : '';
  const descriptionContent = description && <p className='mb-4'>{intl.formatMessage({ id: description })}</p>;
  const dataTable = <DataTable columns={columnDefs} data={data} />;

  const content = (
    <>
      {title}
      {descriptionContent}
      {label && additionalDescription && <p className='mb-4'>{additionalDescription}</p>}
      {dataTable}
    </>
  );
  if (displayInCard) {
    return (
      <Card className='mt-4'>
        <CardHeader>
          {label && (
            <CardTitle>
              {intl.formatMessage({
                id: 'table_labels.' + label,
              })}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {descriptionContent}
          {dataTable}
        </CardContent>
      </Card>
    );
  }

  return <div className='mt-4'>{content}</div>;
};

export default TableRenderer;
