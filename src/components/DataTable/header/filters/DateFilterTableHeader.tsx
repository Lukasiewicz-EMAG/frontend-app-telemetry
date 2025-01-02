import { X } from 'lucide-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '../../../ui/button';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';

function DateFilterTableHeader({ column }: { column: any }) {
  const intl = useIntl();
  const initialFilterValue = column.getFilterValue() || [null, null];
  const [startDate, setStartDate] = useState<Date | null>(
    initialFilterValue[0] ? new Date(initialFilterValue[0]) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(initialFilterValue[1] ? new Date(initialFilterValue[1]) : null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDateRangeChange = (type: 'start' | 'end', date: Date | null) => {
    if (type === 'start') setStartDate(date);
    if (type === 'end') setEndDate(date);

    const value = [
      type === 'start' ? date?.toISOString().split('T')[0] || null : startDate?.toISOString().split('T')[0] || null,
      type === 'end' ? date?.toISOString().split('T')[0] || null : endDate?.toISOString().split('T')[0] || null,
    ];

    column.setFilterValue(value);
  };

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    column.setFilterValue(undefined);
  };

  return (
    <div className='mt-2 flex items-center gap-2'>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-full text-wrap p-0'>
            {startDate && endDate
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : intl.formatMessage({ id: 'table_filter.placeholder_date' })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className='flex flex-row gap-4 p-4'>
            <div>
              <label className='block text-sm font-medium mb-1' htmlFor='start-date'>
                {intl.formatMessage({ id: 'table_filter.start_date' })}
              </label>
              <Calendar
                id='start-date'
                mode='single'
                selected={startDate || undefined}
                onSelect={(date) => handleDateRangeChange('start', date || null)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1' htmlFor='end-date'>
                {intl.formatMessage({ id: 'table_filter.end_date' })}
              </label>
              <Calendar
                id='end-date'
                mode='single'
                selected={endDate || undefined}
                onSelect={(date) => handleDateRangeChange('end', date || null)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {startDate && endDate && (
        <Button variant='ghost' size='icon' onClick={clearFilter} className='ml-2'>
          <X className='h-4 w-4' />
          <span className='sr-only'>Clear filter</span>
        </Button>
      )}
    </div>
  );
}

export default DateFilterTableHeader;
