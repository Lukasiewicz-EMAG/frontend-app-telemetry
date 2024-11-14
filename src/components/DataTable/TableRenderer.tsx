import { useIntl } from 'react-intl';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ColumnDefinition } from '../../pages/Inf/Referral/types';
import { DataTable } from './DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatFloatValue } from '../../lib/utils';
import { formatMinutesToReadableText } from '../../utils/timeUtils';

type TableRendererProps = {
    columns: ColumnDefinition[];
    data: Record<string, any>[];
    label?: string;
    description?: string;
    displayInCard?: boolean; // true by default
};

const TableRenderer: React.FC<TableRendererProps> = ({ columns, data, label, description, displayInCard = true }) => {
    const intl = useIntl();

    const columnDefs: ColumnDef<Record<string, any>>[] = useMemo(() =>
        columns.map((column) => ({
            accessorKey: column.field,
            header: intl.formatMessage({ id: `cud_columns.${column.translation_key}` }),
            cell: ({ getValue }) => {
                if (column.field === 'time_spent') {
                    return <span>{formatMinutesToReadableText(getValue() ? getValue() as number : 0, intl)}</span>
                }
                if (column.column_type == 'translate_text') {
                    return <span>{intl.formatMessage({ id: 'cud_columns_values.' + getValue() as string })}</span>;
                }
                if (column.column_type === 'link') {
                    return <a href={getValue() as string} target="_blank" rel="noopener noreferrer">{getValue()}</a>;
                }
                if (column.column_type === 'float') {
                    return formatFloatValue(getValue() as number);
                }
                if (column.column_type === 'date') {
                    const value = getValue() || 'N/A';
                    return <span>{value}</span>;
                }
                return getValue();
            }
        })),
        [columns, intl]
    );

    const title = label ? <h3 className="font-semibold leading-none tracking-tight text-lg my-4">{intl.formatMessage({
        id: 'table_labels.' + label
    })}</h3> : null;
    const descriptionContent = description && <p className='mb-4'>{intl.formatMessage({ id: description })}</p>;
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
            <Card className='mt-4'>
                <CardHeader>
                    <CardTitle>{intl.formatMessage({
                        id: 'table_labels.' + label
                    })}</CardTitle>
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
