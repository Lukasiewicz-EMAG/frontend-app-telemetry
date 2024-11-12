import { useIntl } from 'react-intl';
import { Loader } from '../../../components/Loader/Loader';
import { UnfinishedCoursesSection } from '../../../components/UnfinishedCourses/UnfinishedCourses';
import UnsolvedTasks from '../../../components/UnsolvedTasks/UnsolvedTasks';
import TableRenderer from '../../../components/DataTable/TableRenderer';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { ColumnDefinition, RecomendationDataResponse, TasksToTrainData, UnfinishedCoursesData } from './types';
import { useGetData } from '../../../hooks/useGetData';
import NoDataToDisplay from '../../../components/NoDataToDisplay/NoDataToDisplay';

export const InfReferral = () => {
    const intl = useIntl();
    const { data, isLoading, error } = useGetData<RecomendationDataResponse>('/student/recommendations');

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <NoDataToDisplay title='no_data.student_general.title' desc='no_data.student_general.desc' />;
    }


    return (
        <>
            <h1 className='text-3xl font-bold'>{intl.formatMessage({ id: 'referral.continue_learning' })}</h1>
            <UnfinishedCoursesSection
                courses={data.unfinished_courses.data.map((item: any) => item.data as UnfinishedCoursesData)}
            />
            <TableRenderer
                data={data.tasks_to_train.data.map((item: any) => item.data as TasksToTrainData)}
                columns={data.tasks_to_train.columns as ColumnDefinition[]}
                label={data.tasks_to_train.label}
                description='referral.suggested_tasks_description'
            />
            <Card>
                <CardHeader>
                    <CardTitle>Problematyczne zagadnienia</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='mb-4'>
                        Poniżej zamieściliśmy analizę wykonanych przez Ciebie zadań na tle innych uczniów, którzy również wykonywali
                        te zadania. Analiza została oparta o dwie główne statystyki:
                    </p>
                    <ul className='list-disc list-inside mb-4'>
                        <li>czas wykonania zadań</li>
                        <li>liczba pomyłek przy wykonywaniu zadania</li>
                    </ul>
                    <p className='mb-4'>
                        Dane te zostały porównane z uśrednionymi statystykami pozostałych uczestników kursów. W oparciu o te dane,
                        poniżej przedstawiliśmy dla Ciebie rekomendacje zadań, które powinieneś powtórzyć w celu utrwalenia wiedzy.
                        Zadania są uszeregowane według różnicy pomiędzy Twoim wynikiem a średnią.
                    </p>
                    <TableRenderer
                        data={data.time_based_task_ranking.data.map((data: any) => data.data)}
                        columns={data.time_based_task_ranking.columns}
                        label={data.time_based_task_ranking.label}
                        displayInCard={false}
                    />
                    <TableRenderer
                        data={data.error_based_task_ranking.data.map((data: any) => data.data)}
                        columns={data.error_based_task_ranking.columns}
                        label={data.error_based_task_ranking.label}
                        displayInCard={false}
                    />
                </CardContent>
            </Card>

            <UnsolvedTasks
                unsolvedEasierTasks={{
                    cards: data.unsolved_easier_tasks.cards,
                }} />
        </>
    );
};
