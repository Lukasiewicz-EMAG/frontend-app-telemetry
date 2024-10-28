import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useIntl } from "react-intl";
import { useSelection } from "./CourseSelectionContext";

export default function CourseSelection(props: { displayKey: string }) {
    const { items, selectedItem, setSelectedItem } = useSelection();
    const { formatMessage } = useIntl();

    return (
        <div className="flex justify-center items-center">
            <div className="w-64 py-4 space-y-2">
                <h2 className="text-xl font-bold text-center">
                    {formatMessage({ id: 'course_selection.title' })}
                </h2>
                <Select value={selectedItem} onValueChange={setSelectedItem}>
                    <SelectTrigger>
                        <SelectValue placeholder={formatMessage({ id: 'course_selection.placeholder' })} />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item: any) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item[props.displayKey]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}


