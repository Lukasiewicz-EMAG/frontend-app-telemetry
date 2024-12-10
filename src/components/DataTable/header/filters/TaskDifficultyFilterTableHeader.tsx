import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { DifficultyBadge } from '../../../DifficultyBadge/difficulty-badge';
import { Button } from '../../../ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import FilterWithClear from './FilterWithClear';

function TaskDifficultyFilterTableHeader({ column }: { column: any }) {
    const intl = useIntl();
    const initialFilterValue = column.getFilterValue() || [];
    const [selectedDifficulties, setSelectedDifficulties] = useState<(number | string)[]>(initialFilterValue);

    const difficulties = [1, 2, 3, 'N/A'];

    const toggleDifficulty = (difficulty: number | string) => {
        const updatedSelection = selectedDifficulties.includes(difficulty)
            ? selectedDifficulties.filter((d) => d !== difficulty)
            : [...selectedDifficulties, difficulty];

        setSelectedDifficulties(updatedSelection);
        column.setFilterValue(updatedSelection.length ? updatedSelection : undefined);
    };

    const clearFilter = () => {
        setSelectedDifficulties([]);
        column.setFilterValue(undefined);
    };

    const isOptionSelected = (value: number | string): boolean => {
        return selectedDifficulties.includes(value);
    };

    const formattedDifficulties = useMemo(() => formatDifficulties(selectedDifficulties), [selectedDifficulties]);

    return (
        <FilterWithClear
            value={formattedDifficulties}
            onChange={(newValue: string) =>
                setSelectedDifficulties(newValue.split(', ').map((v) => (isNaN(Number(v)) ? v : Number(v))))
            }
            onClear={clearFilter}
            placeholder={intl.formatMessage({ id: 'table_filter.placeholder' })}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='w-full flex items-center justify-between'>
                        <div>
                            {selectedDifficulties.length > 0 ? (
                                <span>{formattedDifficulties}</span>
                            ) : (
                                intl.formatMessage({ id: 'table_filter.placeholder' })
                            )}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-64' onCloseAutoFocus={(e) => e.preventDefault()}>
                    {difficulties.map((difficulty) => (
                        <DropdownMenuCheckboxItem
                            key={difficulty}
                            checked={isOptionSelected(difficulty)}
                            onCheckedChange={() => toggleDifficulty(difficulty)}
                        >
                            {typeof difficulty === 'number' ? (
                                <DifficultyBadge level={difficulty as 1 | 2 | 3} />
                            ) : (
                                <span>{difficulty}</span>
                            )}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </FilterWithClear>
    );
}

function formatDifficulties(difficulties: (number | string)[]): string {
    const numberDifficulties = difficulties.filter((d): d is number => typeof d === 'number').sort((a, b) => a - b);
    const nonNumberDifficulties = difficulties.filter((d): d is string => typeof d === 'string');

    const formattedNumbers: string[] = [];
    let rangeStart: number | null = null;
    let prev: number | null = null;

    let hasGaps = false;
    numberDifficulties.forEach((num, index) => {
        if (rangeStart === null) {
            rangeStart = num;
        } else if (prev !== null && num !== prev + 1) {
            hasGaps = true;
        }
        prev = num;
    });

    if (hasGaps) {
        formattedNumbers.push(...numberDifficulties.map(String));
    } else if (rangeStart !== null && prev !== null) {
        formattedNumbers.push(rangeStart === prev ? `${rangeStart}` : `${rangeStart}-${prev}`);
    }

    return [...formattedNumbers, ...nonNumberDifficulties].join(', ');
}

export default TaskDifficultyFilterTableHeader;
