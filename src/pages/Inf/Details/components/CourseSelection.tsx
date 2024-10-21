import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { useCourseSelection } from "../context/CourseSelectionContext";
import { useIntl } from "react-intl";

export default function CourseSelection() {
    const { courses, selectedCourse, setSelectedCourse } = useCourseSelection();
    const { formatMessage } = useIntl();

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-64 py-4 space-y-2">
                <h2 className="text-xl font-bold text-center">
                    {formatMessage({ id: 'course_selection.title' })}
                </h2>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                        <SelectValue placeholder={formatMessage({ id: 'course_selection.placeholder' })} />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map(course => (
                            <SelectItem key={course.id} value={course.id}>
                                {course.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
