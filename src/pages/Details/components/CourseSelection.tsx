import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCourseSelection } from "../context/CourseSelectionContext";
import { useIntl } from 'react-intl';

export default function CourseSelection() {
    const { courses, selectedCourse, setSelectedCourse } = useCourseSelection();
    const intl = useIntl();

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-64 py-4 space-y-2">
                <h2 className="text-xl font-bold text-center">
                    {intl.formatMessage({ id: 'courseSelection.title', defaultMessage: 'Wybierz kurs' })}
                </h2>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                        <SelectValue placeholder={intl.formatMessage({ id: 'courseSelection.placeholder', defaultMessage: 'Wybierz kurs' })} />
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
