import { useState } from "react"
import { NumberFilterValue } from "../../TableRenderer"
import FilterWithClear from "./FilterWithClear"
import { Input } from "../../../ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../ui/select"
import { numberFilterOperators } from "./utils"
import { useIntl } from "react-intl"


function IntFilterTableHeader({ column }: { column: any }) {
    const intl = useIntl();
    const [filterValue, setFilterValue] = useState<NumberFilterValue>(
        (column.getFilterValue() as NumberFilterValue) || { operator: '=', value: '' }
    )

    const handleChange = (newValue: any) => {
        const updatedValue =
            typeof newValue === 'string'
                ? { ...filterValue, value: newValue }
                : { ...filterValue, operator: newValue }
        setFilterValue(updatedValue)
        column.setFilterValue(updatedValue.value ? updatedValue : undefined)
    }

    const clearFilter = () => {
        setFilterValue({ operator: '=', value: '' })
        column.setFilterValue(undefined)
    }

    return (
        <FilterWithClear
            value={filterValue}
            onChange={handleChange}
            onClear={clearFilter}
            placeholder={intl.formatMessage({ id: 'table_filter.placeholder' })}
        >
            <Input
                type="number"
                value={filterValue.value}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={intl.formatMessage({ id: 'table_filter.placeholder' })}
            />
            <Select value={filterValue.operator} onValueChange={(value) => handleChange(value)}>
                <SelectTrigger className="absolute right-0 top-0 w-[70px] rounded-l-none">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {numberFilterOperators.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FilterWithClear>
    )
}

export default IntFilterTableHeader