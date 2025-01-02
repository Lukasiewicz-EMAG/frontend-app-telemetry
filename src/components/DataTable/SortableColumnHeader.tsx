import { CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';
import { useIntl } from 'react-intl';
import { Button } from '../ui/button';

interface SortableColumnHeaderProps {
  column: Column<any, unknown>;
  translationKey: string;
}

export const SortableColumnHeader: React.FC<SortableColumnHeaderProps> = ({ column, translationKey }) => {
  const intl = useIntl();
  const columnName = intl.formatMessage({ id: translationKey });
  const sortDirection = column.getIsSorted();

  const ariaLabel = sortDirection
    ? intl.formatMessage(
        { id: `sort.description.${sortDirection === 'asc' ? 'ascending' : 'descending'}` },
        { column: columnName },
      )
    : intl.formatMessage({ id: 'sort.description.unsorted' }, { column: columnName });

  return (
    <>
      testtt
      <Button
        className='w-full flex [justify-content:normal]'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        aria-label={ariaLabel}
        aria-sort={sortDirection ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        {columnName}
        <CaretSortIcon className='ml-2 h-4 w-4' aria-hidden='true' />
      </Button>
    </>
  );
};
