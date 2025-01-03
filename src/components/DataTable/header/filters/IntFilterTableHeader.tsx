import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { NumberFilterValue } from '../../TableRenderer';
import FilterWithClear from './FilterWithClear';
import { numberFilterOperators } from './utils';

function IntFilterTableHeader({ column }: { column: any }) {
  const intl = useIntl();
  const [filterValue, setFilterValue] = useState<NumberFilterValue>(
    (column.getFilterValue() as NumberFilterValue) || { operator: '=', value: '' },
  );

  const handleChange = (type: 'value' | 'operator', newValue: string) => {
    let updatedValue: NumberFilterValue;

    if (type === 'value') {
      const parsedValue = newValue === '' || isNaN(Number(newValue)) ? '' : String(Number(newValue));
      updatedValue = { ...filterValue, value: parsedValue };
    } else {
      updatedValue = { ...filterValue, operator: newValue };
    }

    setFilterValue(updatedValue);
    column.setFilterValue(updatedValue.value !== null && updatedValue.value !== '' ? updatedValue : undefined);
  };

  const clearFilter = () => {
    setFilterValue({ operator: '=', value: '' });
    column.setFilterValue(undefined);
  };

  return (
    <FilterWithClear
      value={filterValue}
      onChange={(value) => handleChange("value", value)}
      onClear={clearFilter}
      placeholder={intl.formatMessage({ id: "table_filter.placeholder" })}
    >
      <div className="relative">
        <label htmlFor={`${column.id}-input`} className="sr-only">
          {intl.formatMessage({ id: "table_filter.number_input_label" })}
        </label>
        <Input
          id={`${column.id}-input`}
          type="number"
          value={filterValue.value ?? ""}
          onChange={(e) => handleChange("value", e.target.value)}
          placeholder={intl.formatMessage({ id: "table_filter.placeholder" })}
        />
        <span className="sr-only">
          {intl.formatMessage({ id: "table_filter.operator_label" })}
        </span>
        <div>
          <Select
            value={filterValue.operator}
            onValueChange={(value) => handleChange("operator", value)}
          >
            <SelectTrigger className="absolute right-0 top-0 w-[70px] rounded-l-none">
              <SelectValue
                placeholder={intl.formatMessage({
                  id: "table_filter.operator_placeholder",
                })}
              />
            </SelectTrigger>
            <SelectContent>
              {numberFilterOperators.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>
    </FilterWithClear>
  );

}

export default IntFilterTableHeader;
