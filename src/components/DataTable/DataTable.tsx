import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  ColumnMeta,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useMemo, useReducer, useState } from 'react';
import NoDataToDisplay from '../NoDataToDisplay/NoDataToDisplay';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Paginator from './Paginator';

// Define the extended interface
interface ExtendedColumnMeta<TData> extends ColumnMeta<TData, unknown> {
  columnType?: 'int' | 'float' | 'string'; // Add other types as needed
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowDoubleClick?: (row: TData) => void;
}

type TableAction =
  | { type: 'SET_PAGE_INDEX'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number; dataLength: number }
  | {
    type: 'UPDATE_PAGE_SIZE_AND_INDEX';
    payload: { newSize: number; newPageIndex: number; dataLength: number };
  }
  | {
    type: 'SET_PAGE_INDEX_AND_SIZE';
    payload: { pageIndex: number; pageSize: number };
  };

function paginationReducer(state: PaginationState, action: TableAction) {
  switch (action.type) {
    case 'SET_PAGE_INDEX':
      return { ...state, pageIndex: action.payload };
    case 'SET_PAGE_SIZE': {
      const newSize = action.payload;
      const newPageIndex = Math.min(
        Math.floor((state.pageIndex * state.pageSize) / newSize),
        Math.floor(action.dataLength / newSize),
      );
      return { ...state, pageSize: newSize, pageIndex: newPageIndex };
    }
    case 'UPDATE_PAGE_SIZE_AND_INDEX': {
      const newSize = action.payload.newSize;
      const newPageIndex = Math.min(
        Math.floor((state.pageIndex * state.pageSize) / newSize),
        Math.max(0, Math.ceil(action.payload.dataLength / newSize) - 1),
      );
      return { ...state, pageSize: newSize, pageIndex: newPageIndex };
    }
    case 'SET_PAGE_INDEX_AND_SIZE': {
      return {
        ...state,
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
      };
    }
    default:
      return state;
  }
}

// Add this interface near the top with other interfaces
interface NumberFilterValue {
  operator: string;
  value: string;
}

export function DataTable<TData, TValue>({ columns = [], data = [], onRowDoubleClick }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, dispatch] = useReducer(paginationReducer, {
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const memoizedColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      size: column.size || 100,
      minSize: column.minSize || 50,
      maxSize: column.size || 100,
    }));
  }, [columns]);

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onPaginationChange: (updaterOrValue) => {
      const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue;
      dispatch({
        type: 'SET_PAGE_INDEX_AND_SIZE',
        payload: {
          pageIndex: newPagination.pageIndex,
          pageSize: newPagination.pageSize,
        },
      });
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    filterFns: {
      numberFilter: (row, columnId, filterValue) => {
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
      },
    },
  });

  const availablePageSizes = [5, 10, 20, 50];

  const columnSizingVars = useMemo(() => {
    const vars: { [key: string]: string } = {};
    table.getAllLeafColumns().forEach((column) => {
      vars[`--col-${column.id}-width`] = `${column.getSize()}px`;
    });
    return vars;
  }, [table]);

  return (
    <div className='w-full'>
      <div
        className='rounded-md border overflow-x-auto'
        style={{ '--table-width': '100%', ...columnSizingVars } as React.CSSProperties}
      >
        <Table
          className='border-collapse table-fixed w-full'
          style={{ tableLayout: 'fixed', width: 'var(--table-width)' }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='p-2 break-words'
                    style={{
                      width: `var(--col-${header.column.id}-width)`,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        <div
                          className={
                            header.column.getCanSort() ? 'cursor-pointer select-none flex items-center' : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <span
                              className='ml-2'
                              style={{ width: 16, display: 'inline-flex', justifyContent: 'center' }}
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
                            // Number column filter
                            <div className="mt-2 flex">
                              <select
                                value={(header.column.getFilterValue() as NumberFilterValue)?.operator ?? '='}
                                onChange={(e) => {
                                  const operator = e.target.value;
                                  let oldFilterValue = header.column.getFilterValue() as NumberFilterValue || {};
                                  oldFilterValue = { ...oldFilterValue, operator };
                                  header.column.setFilterValue(oldFilterValue);
                                }}
                                className='text-sm border rounded mr-2'
                              >
                                <option value='='>=</option>
                                <option value='!='>!=</option>
                                <option value='>'>{'>'}</option>
                                <option value='>='>{'>='}</option>
                                <option value='<'>{'<'}</option>
                                <option value='<='>{'<='}</option>
                              </select>
                              <input
                                type='number'
                                value={(header.column.getFilterValue() as NumberFilterValue)?.value ?? ''}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  let oldFilterValue = header.column.getFilterValue() as NumberFilterValue || {};
                                  oldFilterValue = { ...oldFilterValue, value };
                                  header.column.setFilterValue(oldFilterValue);
                                }}
                                placeholder='Filter...'
                                className='w-full text-sm border rounded'
                              />
                            </div>
                          ) : (
                            // Text column filter
                            <input
                              type='text'
                              value={(header.column.getFilterValue() ?? '') as string}
                              onChange={(e) => header.column.setFilterValue(e.target.value)}
                              placeholder='Filter...'
                              className='mt-2 w-full text-sm border rounded'
                            />
                          )
                        ) : null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onDoubleClick={() => onRowDoubleClick?.(row.original)}
                  className='cursor-pointer'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='p-2 break-words'
                      style={{
                        width: `var(--col-${cell.column.id}-width)`,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center break-words'>
                  <NoDataToDisplay />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4'>
        <Select
          value={pagination.pageSize?.toString() || ''}
          onValueChange={(value) => {
            const newSize = Number(value);
            const newPageIndex = Math.min(
              Math.floor((pagination.pageIndex * pagination.pageSize) / newSize),
              Math.max(0, Math.ceil(data.length / newSize) - 1),
            );
            dispatch({
              type: 'UPDATE_PAGE_SIZE_AND_INDEX',
              payload: { newSize, newPageIndex, dataLength: data.length },
            });
          }}
        >
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder={pagination.pageSize?.toString() || ''} />
          </SelectTrigger>
          <SelectContent>
            {availablePageSizes.map((size) => (
              <SelectItem
                key={size}
                value={size.toString()}
                className='cursor-pointer'
                disabled={
                  size > data.length && size !== Math.min(...availablePageSizes.filter((s) => s >= data.length))
                }
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Paginator
          currentPage={pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(pageNumber) => {
            dispatch({ type: 'SET_PAGE_INDEX', payload: pageNumber - 1 });
          }}
          showPreviousNext
        />
      </div>
    </div>
  );
}
