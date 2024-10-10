import { useIntl } from "react-intl";
import { Course } from "../types";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Progress } from "@radix-ui/react-progress";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";

export function UnfinishedCoursesSection({ courses }: { courses: Course[] }) {
    const intl = useIntl();

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {intl.formatMessage({ id: 'referral.unfinished_courses' })}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Description paragraph */}
                <p className="mb-4">
                    {intl.formatMessage({ id: 'referral.unfinished_courses_description' })}
                </p>

                {/* Accordion for courses */}
                <Accordion type="single" collapsible className="w-full">
                    {courses.map((course) => (
                        <AccordionItem key={course.course_base.id} value={course.course_base.id}>
                            <AccordionTrigger className="font-semibold text-left">
                                {course.course_base.name}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4">
                                    <Progress value={course.completion_percentage} className="mb-2" />
                                    <p>
                                        {intl.formatMessage(
                                            { id: 'referral.course_completion_percentage' },
                                            { percentage: course.completion_percentage }
                                        )}
                                    </p>
                                    <p>
                                        {intl.formatMessage(
                                            { id: 'referral.course_undone_tasks' },
                                            { count: course.num_undone_tasks }
                                        )}
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Additional text after the accordion */}
                <p className="mt-4">
                    {intl.formatMessage({ id: 'referral.complete_remaining_tasks' })}
                </p>
            </CardContent>
        </Card>
    );
}
