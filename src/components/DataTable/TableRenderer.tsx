import { useIntl } from 'react-intl';
import { DataTable } from '@/components/DataTable/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ColumnDefinition } from '../../pages/Inf/Referral/types';

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
                if (column.column_type == 'translate_text') {
                    return <p>{intl.formatMessage({ id: 'cud_columns_values.' + getValue() as string })}</p>;
                }
                if (column.column_type === 'link') {
                    return <a href={getValue() as string} target="_blank" rel="noopener noreferrer">{getValue()}</a>;
                }
                return getValue();
            }
        })),
        [columns, intl]
    );

    const title = label ? <h2 className='mb-2'>{intl.formatMessage({
        id: 'table_labels.' + label
    })}</h2> : null;
    const descriptionContent = description && <p className='mb-4'>{intl.formatMessage({ id: description })}</p>;
    const dataTable = <DataTable columns={columnDefs} data={data} />;
    // const dataTable = <p>{JSON.stringify(data)}</p>
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
                    <CardTitle>{title}</CardTitle>
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
