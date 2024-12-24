import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const difficultyLabel = (difficulty: number) => {
  switch (difficulty) {
    case 1:
    case 2:
      return 'łatwy';
    case 3:
    case 4:
      return 'średni';
    case 5:
      return 'trudny';
    default:
      return 'nieznany';
  }
};

const difficultyClass = (difficulty: number) => {
  if (difficulty <= 2) return 'border-b-[5px] border-b-green-500';
  if (difficulty <= 4) return 'border-b-[5px] border-b-orange-500';
  if (difficulty === 5) return 'border-b-[5px] border-b-red-500';
  return '';
};

const difficultyBadgeVariant = (difficulty: number) => {
  if (difficulty <= 2) return 'secondary';
  if (difficulty <= 4) return 'default';
  if (difficulty === 5) return 'destructive';
  return 'default';
};

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
