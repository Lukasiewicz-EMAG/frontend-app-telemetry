import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useIntl } from 'react-intl';
import { formatFloatValue } from '../../lib/utils';
import { CardsData } from '../../pages/Inf/Referral/types';
import { OldStatCardsProps } from './types';

//TODO remove when backend for admin also uses cards
const OldCards = ({ stats }: OldStatCardsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full'>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            {stat.progress !== undefined && <Progress value={stat.progress} className='h-2 mt-2' />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface StatsCardsProps {
  stats: CardsData;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const intl = useIntl();

  const orderMap = {
    time_spent_in_course: 1,
    visited_units_percentage: 2,
    interactive_percentage: 3,
    only_swe_percentage: 4,
    swe_error_rate: 5,
    only_re_percentage: 6,
    re_error_rate: 7,
  };

  const cards = stats.cards
    .map((card) => {
      if (card.card_type === 'time') {
        const hours = card.value.hours == 0 ? null : `${card.value.hours}h`;
        const minutes = `${card.value.minutes}m`;
        const fullTime = hours ? `${hours} ${minutes}` : minutes;
        return {
          title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
          value: fullTime,
          progress: undefined,
        };
      } else if (card.card_type === 'percentage') {
        return {
          title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
          value: `${formatFloatValue(typeof card.value === 'number' ? card.value : card.value.percentage)}%`,
          progress: typeof card.value === 'number' ? card.value : card.value.percentage,
        };
      } else if (card.card_type === 'percentage_with_count') {
        return {
          title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
          value: `${typeof card.value === 'number' ? 0 : card.value.count} (${formatFloatValue(
            typeof card.value === 'number' ? card.value : card.value.percentage,
          )}%)`,
          progress: typeof card.value === 'number' ? card.value : card.value.percentage,
        };
      }
      return null;
    })
    .filter((card) => card !== null)
    // Dodajemy sortowanie kart
    .sort((a, b) => {
      const keyA = stats.cards.find(
        (c) => intl.formatMessage({ id: 'cards.' + c.translation_key }) === a?.title,
      )?.translation_key;
      const keyB = stats.cards.find(
        (c) => intl.formatMessage({ id: 'cards.' + c.translation_key }) === b?.title,
      )?.translation_key;
      return (orderMap[keyA as keyof typeof orderMap] || 999) - (orderMap[keyB as keyof typeof orderMap] || 999);
    });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full'>
      {cards.map(
        (card, index) =>
          card && (
            <Card key={index} className={cards.length % 2 !== 0 && index === 0 ? 'md:col-span-2' : ''}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{card.value}</div>
                {card.progress !== undefined && <Progress value={card.progress} className='h-2 mt-2 ' />}
              </CardContent>
            </Card>
          ),
      )}
    </div>
  );
};

export { OldCards, StatsCards };
