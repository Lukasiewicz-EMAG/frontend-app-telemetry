import { useState } from "react"
import FilterWithClear from "./FilterWithClear"

function TextFilterTableHeader({ column }: { column: any }) {
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
            placeholder="Filter..."
        />
    )
}

export default TextFilterTableHeader