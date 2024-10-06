import { CaretSortIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { useIntl } from "react-intl";
import { Button } from "../ui/button";

interface SortableColumnHeaderProps {
    column: Column<any, unknown>;
    translationKey: string;
}

export const SortableColumnHeader: React.FC<SortableColumnHeaderProps> = ({ column, translationKey }) => {
    const intl = useIntl();

    return (
        <Button
            className="w-full flex [justify-content:normal]"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {intl.formatMessage({ id: translationKey })}
            <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
    );
};