import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useReducer, useState } from 'react';
import NoDataToDisplay from '../NoDataToDisplay/NoDataToDisplay';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import TableHeaderComponent from './header/TableHeader';
import PaginationControls from './pagination/PaginatorControls';
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

function paginationReducer(state: PaginationState, action: TableAction): PaginationState {
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
      minSize: column.minSize || 100,
      maxSize: column.size || 100,
    }));
  }, [columns]);

  const table = useReactTable<TData>({
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
            <TableHeaderComponent headerGroups={table.getHeaderGroups()} />
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
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
                  <NoDataToDisplay title='no_data.no_courses.title' desc='no_data.no_courses.desc' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        pagination={pagination}
        table={table}
        dispatch={dispatch}
        availablePageSizes={availablePageSizes}
        dataLength={data.length}
      />
    </div>
  );
}
