import Cal from '../CalendarHeatmap/CalenderHeatmap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ActivityData {
  date: string;
  minutesSpent: number;
}

export interface ActivityCalenderProps {
  data: ActivityData[];
}

export const ActivityCalender = ({ data }: ActivityCalenderProps) => {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Kalendarz aktywności</CardTitle>
        <CardDescription>
          Na poniższym kalendarzu stopień nasycenia koloru wskazuje czas, który poświęciłeś na rozwiązywanie zadań.
          Kolor biały odpowiada brakowi aktywności, natomiast im ciemniejsza zieleń, tym więcej czasu poświęciłeś/aś na
          naukę
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Cal data={data} />
      </CardContent>
    </Card>
  );
};
