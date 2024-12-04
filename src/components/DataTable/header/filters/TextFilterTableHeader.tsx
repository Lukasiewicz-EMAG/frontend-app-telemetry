import { useState } from "react"
import FilterWithClear from "./FilterWithClear"
import { useIntl } from "react-intl";

function TextFilterTableHeader({ column }: { column: any }) {
    const intl = useIntl();
    const [filterValue, setFilterValue] = useState<string>(
        (column.getFilterValue() as string) || ''
    )

    const handleChange = (value: string) => {
        setFilterValue(value)
        column.setFilterValue(value || undefined)
    }

    const clearFilter = () => {
        setFilterValue('')
        column.setFilterValue(undefined)
    }

    return (
        <FilterWithClear
            value={filterValue}
            onChange={handleChange}
            onClear={clearFilter}
            placeholder={intl.formatMessage({ id: 'table_filter.placeholder' })}
        />
    )
}

export default TextFilterTableHeader