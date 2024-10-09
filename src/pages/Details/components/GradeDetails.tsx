import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Stat {
  title: string;
  value: string;
  progress?: number;
}

interface GradeDetailsProps {
  stats: Stat[];
}

const GradeDetails = ({ stats }: GradeDetailsProps) => {
  return (
    <div className='max-w-3xl mx-auto grid grid-cols-2 gap-4 mt-4'>
      <div className='col-span-2 flex justify-center'>
        <Card className='w-full max-w-[calc(50%-0.5rem)]'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-center break-words'>{stats[0].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-bold text-center break-words'>{stats[0].value}</div>
          </CardContent>
        </Card>
      </div>
      {stats.slice(1, 3).map((stat, index) => (
        <Card key={index}>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium break-words'>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold break-words'>{stat.value}</div>
            {stat.progress !== undefined && <Progress value={stat.progress} className='h-2 mt-2' />}
          </CardContent>
        </Card>
      ))}
      <div className='col-span-2 flex justify-center'>
        <Card className='w-full max-w-[calc(50%-0.5rem)]'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xs font-medium text-center break-words leading-tight'>
              {stats[3].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-center break-words'>{stats[3].value}</div>
            {stats[3].progress !== undefined && <Progress value={stats[3].progress} className='h-2 mt-2' />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradeDetails;
