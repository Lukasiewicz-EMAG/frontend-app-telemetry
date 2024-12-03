import { useState } from 'react'
import { flexRender } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TableHead, TableRow } from '@/components/ui/table'

interface NumberFilterValue {
    operator: string
    value: string
}

interface ExtendedColumnMeta<TData> {
    columnType?: 'int' | 'float' | 'string'
}

interface TableHeaderComponentProps<TData> {
    headerGroups: any[]
}

const operators = [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
    { value: '>', label: '>' },
    { value: '>=', label: '>=' },
    { value: '<', label: '<' },
    { value: '<=', label: '<=' },
]

function NumberFilter({ column }: { column: any }) {
    const [filterValue, setFilterValue] = useState<NumberFilterValue>(
        (column.getFilterValue() as NumberFilterValue) || { operator: '=', value: '' }
    )

    const handleOperatorChange = (operator: string) => {
        const newFilter = { ...filterValue, operator }
        setFilterValue(newFilter)
        column.setFilterValue(newFilter)
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilter = { ...filterValue, value: event.target.value }
        setFilterValue(newFilter)
        column.setFilterValue(newFilter.value ? newFilter : undefined)
    }

    const clearFilter = () => {
        setFilterValue({ operator: '=', value: '' })
        column.setFilterValue(undefined)
    }

    return (
        <div className="mt-2 flex">
            <div className="relative flex-grow">
                <Input
                    type="number"
                    value={filterValue.value}
                    onChange={handleValueChange}
                    placeholder={`Filter...`}
                />
                <Select value={filterValue.operator} onValueChange={handleOperatorChange}>
                    <SelectTrigger className="absolute right-0 top-0 w-[70px] rounded-l-none">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {operators.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {filterValue.value && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearFilter}
                    className="ml-2"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear filter</span>
                </Button>
            )}
        </div>
    )
}

function TableHeaderComponent<TData>({ headerGroups }: TableHeaderComponentProps<TData>) {
    return (
        <>
            {headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => (
                        <TableHead
                            key={header.id}
                            className="p-2 break-words"
                            style={{
                                width: `var(--col-${header.column.id}-width)`,
                            }}
                        >
                            {header.isPlaceholder ? null : (
                                <div>
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
                                    {header.column.getCanFilter() ? (
                                        (header.column.columnDef.meta as ExtendedColumnMeta<TData>)?.columnType === 'int' ||
                                            (header.column.columnDef.meta as ExtendedColumnMeta<TData>)?.columnType === 'float' ? (
                                            <NumberFilter column={header.column} />
                                        ) : (
                                            <Input
                                                type="text"
                                                value={(header.column.getFilterValue() as string) ?? ''}
                                                onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                placeholder="Filter..."
                                                className="mt-2 w-full"
                                            />
                                        )
                                    ) : null}
                                </div>
                            )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </>
    )
}

export default TableHeaderComponent

