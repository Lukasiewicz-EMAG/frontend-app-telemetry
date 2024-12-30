import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { difficultyBadgeVariant, difficultyClass, difficultyLabel } from '../../lib/utils';

interface UnsolvedTasksProps {
  unsolvedEasierTasks: {
    cards: {
      card_type: string;
      translation_key: string;
      value: {
        course_name: string;
        task_name: string;
        task_link: string;
        difficulty: number;
      };
    }[];
  };
}

export default function UnsolvedTasks({ unsolvedEasierTasks }: UnsolvedTasksProps) {
  const { cards } = unsolvedEasierTasks;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nieukończone zadania</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {cards.map((card, index) => (
            <Card key={index} className={difficultyClass(card.value.difficulty)}>
              <CardHeader>
                <CardTitle>Zadanie {card.value.task_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <a href={card.value.task_link} className='text-blue-600 hover:underline'>
                  {card.value.task_link}
                </a>
                <div className='mt-2'>
                  <Badge variant={difficultyBadgeVariant(card.value.difficulty)}>
                    Poziom trudności: {difficultyLabel(card.value.difficulty)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
