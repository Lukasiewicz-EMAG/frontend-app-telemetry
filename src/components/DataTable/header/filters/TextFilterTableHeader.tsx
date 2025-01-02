import { useState } from 'react';
import { useIntl } from 'react-intl';
import FilterWithClear from './FilterWithClear';

function TextFilterTableHeader({ column }: { column: any }) {
  const intl = useIntl();
  const [filterValue, setFilterValue] = useState<string>((column.getFilterValue() as string) || '');

  const handleChange = (value: string) => {
    setFilterValue(value);
    column.setFilterValue(value || undefined);
  };

  const clearFilter = () => {
    setFilterValue('');
    column.setFilterValue(undefined);
  };

  const headerText =
    typeof column.columnDef.header === 'function' ? column.columnDef.header() : column.columnDef.header;

  return (
    <>
      <span className='sr-only'>{headerText}</span>
      <FilterWithClear
        value={filterValue}
        onChange={handleChange}
        onClear={clearFilter}
        placeholder={intl.formatMessage({ id: 'table_filter.placeholder' })}
        aria-label={`${headerText} ${intl.formatMessage({ id: 'table_filter.text_input_label' })}`}
      />
    </>
  );
}

export default TextFilterTableHeader;
