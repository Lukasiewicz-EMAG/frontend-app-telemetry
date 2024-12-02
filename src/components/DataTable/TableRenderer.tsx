import { useIntl } from 'react-intl';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ColumnDefinition } from '../../pages/Inf/Referral/types';
import { DataTable } from './DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatFloatValue } from '../../lib/utils';
import { formatMinutesToReadableText } from '../../utils/timeUtils';
import { FilterFn } from '@tanstack/react-table';

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


type TableRendererProps = {
    columns: ColumnDefinition[];
    data: Record<string, any>[];
    label?: string;
    description?: string;
    displayInCard?: boolean;
};

const TableRenderer: React.FC<TableRendererProps> = ({
    columns,
    data,
    label,
    description,
    displayInCard = true,
}) => {
    const intl = useIntl();

    const getSize = (column: ColumnDefinition) => {
        if (column.column_type === 'text' || column.column_type === 'link') {
            if (column.field === 'name') {
                return 350;
            }
            return 175;
        } else if (column.column_type === 'date' || column.column_type === 'int') {
            return 125;
        } else {
            return 100;
        }
    };

    const columnDefs: ColumnDef<Record<string, any>>[] = useMemo(
        () =>
            columns.map((column) => ({
                accessorKey: column.field,
                header: intl.formatMessage({
                    id: `cud_columns.${column.translation_key}`,
                }),
                cell: ({ getValue }) => {
                    if (column.field === 'time_spent') {
                        return (
                            <span>
                                {formatMinutesToReadableText(
                                    getValue() ? (getValue() as number) : 0,
                                    intl
                                )}
                            </span>
                        );
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
                                className="text-blue-600 dark:text-blue-500 hover:underline"
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {text}
                            </a>
                        );
                    }
                    if (column.column_type === 'float') {
                        return formatFloatValue(getValue() as number);
                    }
                    if (column.column_type === 'date') {
                        const value = getValue() || 'N/A';
                        return <span>{value}</span>;
                    }
                    return getValue();
                },
                size: getSize(column),
                meta: {
                    columnType: column.column_type as 'int' | 'float' | 'text' | 'translate_text' | 'link' | 'date',
                },
                filterFn:
                    column.column_type === 'int' || column.column_type === 'float'
                        ? numberFilter
                        : 'includesString',
            })),
        [columns, intl]
    );

    const title = label ? (
        <h3 className="font-semibold leading-none tracking-tight text-lg my-4">
            {intl.formatMessage({
                id: 'table_labels.' + label,
            })}
        </h3>
    ) : null;
    const descriptionContent = description && (
        <p className="mb-4">{intl.formatMessage({ id: description })}</p>
    );
    const dataTable = <DataTable columns={columnDefs} data={data} />;

    const content = (
        <>
            {title}
            {descriptionContent}
            {dataTable}
        </>
    );

    if (displayInCard) {
        return (
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>
                        {intl.formatMessage({
                            id: 'table_labels.' + label,
                        })}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {descriptionContent}
                    {dataTable}
                </CardContent>
            </Card>
        );
    }

    return <div className="mt-4">{content}</div>;
};

export default TableRenderer;
