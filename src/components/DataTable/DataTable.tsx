import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useReducer, useState } from 'react';
import NoDataToDisplay from '../NoDataToDisplay/NoDataToDisplay';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Paginator from './Paginator';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type TableAction =
  | { type: 'SET_PAGE_INDEX'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number; dataLength: number }
  | { type: 'UPDATE_PAGE_SIZE_AND_INDEX'; payload: { newSize: number; newPageIndex: number; dataLength: number } }
  | { type: 'SET_PAGE_INDEX_AND_SIZE'; payload: { pageIndex: number; pageSize: number } };

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
      return { ...state, pageIndex: action.payload.pageIndex, pageSize: action.payload.pageSize };
    }
    default:
      return state;
  }
}

export function DataTable<TData, TValue>({ columns = [], data = [] }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, dispatch] = useReducer(paginationReducer, {
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: (updaterOrValue) => {
      const newPagination =
        typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue;
      dispatch({
        type: 'SET_PAGE_INDEX_AND_SIZE',
        payload: { pageIndex: newPagination.pageIndex, pageSize: newPagination.pageSize },
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  const availablePageSizes = [5, 10, 20, 50];

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table className='border-collapse'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='p-2'>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none flex items-center' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className='ml-2' style={{ width: 16, display: 'inline-flex', justifyContent: 'center' }}>
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
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='p-2'>
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
