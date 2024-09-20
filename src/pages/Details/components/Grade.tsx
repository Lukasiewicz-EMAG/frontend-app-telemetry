import { Star } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { useIntl } from "react-intl";

type Grade = {
    grade: string;
    numeric: number;
}

export const Grade = ({ grade }: { grade: Grade }) => {
    const intl = useIntl();
    const maxRating = 5;
    const rating = grade.numeric

    return (
        <Card className='mt-4'>
            <CardHeader>
                <CardTitle className="text-center">{intl.formatMessage({ id: 'details.grade.current_grade' })}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <p className="text-xl font-bold mb-2">{grade.grade}</p>
                    <div className="flex justify-center" aria-label={intl.formatMessage(
                        { id: 'details.grade.rating_aria_label' },
                        { rating, maxRating }
                    )}>
                        {[...Array(maxRating)].map((_, index) => (
                            <Star
                                key={index}
                                className={`w-5 h-5 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};