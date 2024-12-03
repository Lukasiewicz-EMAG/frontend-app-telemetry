import { X } from "lucide-react"
import { Button } from "../../../ui/button"
import { Input } from "../../../ui/input"
import { NumberFilterValue } from "../../TableRenderer"

interface FilterWithClearProps {
    value: string | NumberFilterValue
    onChange: (newValue: any) => void
    onClear: () => void
    placeholder: string
    children?: React.ReactNode
}

function FilterWithClear({ value, onChange, onClear, placeholder, children }: FilterWithClearProps) {
    return (
        <div className="mt-2 flex">
            <div className="relative flex-grow">
                {children || (
                    <Input
                        type="text"
                        value={typeof value === 'string' ? value : value?.value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="flex-grow"
                    />
                )}
            </div>
            {(typeof value === 'string' ? value : value?.value) && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClear}
                    className="ml-2"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear filter</span>
                </Button>
            )}
        </div>
    )
}

export default FilterWithClear