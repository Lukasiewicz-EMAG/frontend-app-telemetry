import { difficultyClass } from '../../lib/utils';

import { useIntl } from 'react-intl';
import { difficultyLabel } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TaskLink {
  text: string;
  href: string;
}

interface TaskData {
  task_id: string;
  task_link: TaskLink;
  task_difficulty: number;
}

interface VisitedTask {
  data: TaskData;
}

export default function VisitedTasks({ data }: { data: VisitedTask[] }) {
  const intl = useIntl();
  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>{intl.formatMessage({ id: 'visited_tasks.title' })}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.map((item, index) => (
          <Card key={index} className={`${difficultyClass(item.data.task_difficulty)} h-full`}>
            <div className='flex flex-col h-full'>
              <CardHeader>
                <CardTitle>
                  <a
                    href={item.data.task_link.href}
                    className='text-blue-600 hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item.data.task_link.text}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col flex-1'>
                <div className='mt-auto pt-3'>
                  <Badge variant='secondary'>
                    {intl.formatMessage({ id: 'visited_tasks.difficulty_level' })}
                    {difficultyLabel(item.data.task_difficulty)}
                  </Badge>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
