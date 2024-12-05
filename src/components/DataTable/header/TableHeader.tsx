import { flexRender } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { TableHead, TableRow } from '@/components/ui/table';
import FloatFilterTableHeader from './filters/FloatFilterTableHeader';
import IntFilterTableHeader from './filters/IntFilterTableHeader';
import TextFilterTableHeader from './filters/TextFilterTableHeader';
import DateFilterTableHeader from './filters/DateFilterTableHeader';
import TaskDifficultyFilterTableHeader from './filters/TaskDifficultyFilterTableHeader';

interface TableHeaderComponentProps<TData> {
    headerGroups: any[];
}

function TableHeaderComponent<TData>({ headerGroups }: TableHeaderComponentProps<TData>) {
    return (
        <>
            {/* Render the row for header names with sorting */}
            {headerGroups.map((headerGroup) => (
                <TableRow key={`${headerGroup.id}-header`}>
                    {headerGroup.headers.map((header: any) => (
                        <TableHead
                            key={header.id}
                            className="p-2 break-words"
                            style={{
                                width: `var(--col-${header.column.id}-width)`,
                            }}
                        >
                            {header.isPlaceholder ? null : (
                                <div
                                    className={
                                        header.column.getCanSort()
                                            ? 'cursor-pointer select-none flex items-center'
                                            : ''
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                    {header.column.getCanSort() && (
                                        <span
                                            className="ml-2"
                                            style={{
                                                width: 16,
                                                display: 'inline-flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {header.column.getIsSorted() === 'asc' ? (
                                                <ArrowUp size={16} />
                                            ) : header.column.getIsSorted() === 'desc' ? (
                                                <ArrowDown size={16} />
                                            ) : null}
                                        </span>
                                    )}
                                </div>
                            )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}

            {/* Render the row for filters */}
            {headerGroups.map((headerGroup) => (
                <TableRow key={`${headerGroup.id}-filters`}>
                    {headerGroup.headers.map((header: any) => (
                        <TableHead
                            key={header.id}
                            className="p-2 break-words"
                            style={{
                                width: `var(--col-${header.column.id}-width)`,
                            }}
                        >
                            {header.isPlaceholder ? null : (
                                header.column.getCanFilter() && (
                                    <div>
                                        {(() => {
                                            const columnType = (header.column.columnDef.meta)?.columnType;

                                            switch (columnType) {
                                                case 'int':
                                                    return <IntFilterTableHeader column={header.column} />;
                                                case 'float':
                                                    return <FloatFilterTableHeader column={header.column} />;
                                                case 'date':
                                                    return <DateFilterTableHeader column={header.column} />;
                                                case 'task_difficulty':
                                                    return <TaskDifficultyFilterTableHeader column={header.column} />;
                                                default:
                                                    return <TextFilterTableHeader column={header.column} />;
                                            }
                                        })()}
                                    </div>
                                )
                            )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </>
    );
}

export default TableHeaderComponent;