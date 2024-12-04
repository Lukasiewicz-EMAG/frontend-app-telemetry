import { useState } from "react"
import { NumberFilterValue } from "../../TableRenderer"
import { Input } from "../../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import FilterWithClear from "./FilterWithClear"
import { numberFilterOperators } from "./utils"
import { useIntl } from "react-intl"

function FloatFilterTableHeader({ column }: { column: any }) {
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
                step=".1"
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

export default FloatFilterTableHeader