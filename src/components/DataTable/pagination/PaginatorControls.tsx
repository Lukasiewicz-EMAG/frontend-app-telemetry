import { PaginationState } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import Paginator from "./Paginator";

interface PaginationControlsProps {
    pagination: PaginationState;
    table: any;
    dispatch: any;
    availablePageSizes: number[];
    dataLength: number;
}

const PaginationControls = ({
    pagination,
    table,
    dispatch,
    availablePageSizes,
    dataLength,
}: PaginationControlsProps) => {
    return (
        <div className="flex items-center justify-end py-4">
            <Select
                value={pagination.pageSize.toString()}
                onValueChange={(value) => {
                    const newSize = parseInt(value, 10);
                    dispatch({
                        type: 'UPDATE_PAGE_SIZE_AND_INDEX',
                        payload: {
                            newSize,
                            newPageIndex: Math.min(
                                Math.floor((pagination.pageIndex * pagination.pageSize) / newSize),
                                Math.max(0, Math.ceil(dataLength / newSize) - 1),
                            ),
                            dataLength,
                        },
                    });
                }}
            >
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder={pagination.pageSize.toString()} />
                </SelectTrigger>
                <SelectContent>
                    {availablePageSizes.map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                            {size}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Paginator
                currentPage={pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                onPageChange={(page) =>
                    dispatch({ type: 'SET_PAGE_INDEX', payload: page - 1 })
                }
                showPreviousNext
            />
        </div>
    );
}


export default PaginationControls;