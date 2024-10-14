import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecommendationData } from '../types';

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

export default function UnsolvedTasks({ unfinished_courses, recommendations }: RecommendationData) {
  const { tasks_to_train, unsolved_easier_tasks } = recommendations;

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Nierozwiązane zadania</h2>
      <p className='mb-6'>
        Poniżej przedstawiliśmy zadania podobne do tych, które próbowałeś rozwiązać, jednak o niższym poziomie
        trudności. Spróbuj je wykonać zanim powrócisz do nierozwiązanych zadań.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {unsolved_easier_tasks.map((task, index) => (
          <Card key={index} className={difficultyClass(task.task_difficulty)}>
            <CardHeader>
              <CardTitle>Zadanie {task.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={task.link} className='text-blue-600 hover:underline'>
                {task.link}
              </a>
              <div className='mt-2'>
                <Badge variant={difficultyBadgeVariant(task.task_difficulty)}>
                  Poziom trudności: {difficultyLabel(task.task_difficulty)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
