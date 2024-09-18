import { SolvedTaskSeries } from '../../utils/frontendTypes';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const SolvedTaskInfo = ({ consecutiveDays }: SolvedTaskSeries) => {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Seria rozwiązanych zadań</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='leading-7 [&:not(:first-child)]:mt-6 text-center'>
          Udało Ci się rozwiązać zadanie w każdy z ostatnich
        </p>
        <h2 className=' mt-4 text-center text-2xl lg:text-4xl'>{consecutiveDays}</h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6 text-center'>
          dni roboczych. Rozwiąż dziś kolejne zadanie, aby kontynuować serię.
        </p>
      </CardContent>
    </Card>
  );
};
