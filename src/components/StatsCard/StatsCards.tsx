import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import React from 'react';
import { useIntl } from 'react-intl';
import { CardsData } from '../../pages/Inf/Referral/types';
import { CardData } from './types';
import { formatFloatValue } from '../../lib/utils';

interface StatsCardsProps {
  stats: CardsData;
}

const StatsCards = ({ stats }: StatsCardsProps) => {

  const intl = useIntl();

  const orderMap = {
    time_spent_in_course: 1,
    interactive_percentage: 2,
    only_re_percentage: 5,
    re_error_rate: 6,
    only_swe_percentage: 3,
    swe_error_rate: 4,
  };

  const cards = stats.cards
    .map((card: CardData) => {
      switch (card.card_type) {
        case 'time': {
          const { hours, minutes } = card.value;
          const hoursDisplay = hours === 0 ? null : `${hours}h`;
          const minutesDisplay = `${minutes}min`;
          const fullTime = hoursDisplay ? `${hoursDisplay} ${minutesDisplay}` : minutesDisplay;

          return {
            title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
            value: fullTime,
            progress: undefined,
          };
        }

        case 'percentage': {
          const percentage = typeof card.value === 'number' ? card.value : card.value.percentage;

          return {
            title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
            value: `${formatFloatValue(percentage)}%`,
            progress: percentage,
          };
        }

        case 'percentage_with_count': {
          const { percentage, count } = card.value;

          return {
            title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
            value: `${count} (${formatFloatValue(percentage)}%)`,
            progress: percentage,
          };
        }

        case 'user_time': {
          const { hours, minutes } = card.value;
          const hoursDisplay = hours === 0 ? null : `${hours}h`;
          const minutesDisplay = `${minutes}min`;
          const userName = card.user_name;
          const fullTime = hoursDisplay ? `${hoursDisplay} ${minutesDisplay}` : minutesDisplay;
          const value = userName ? `${userName} (${fullTime})` : fullTime;

          return {
            title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
            value,
            progress: undefined,
          };
        }

        case 'user_int': {
          const userName = card.user_name;
          const value = userName ? `${userName} (${card.value})` : card.value;

          return {
            title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
            value,
            progress: undefined,
          };
        }

        case 'int': {
          return {
            title: intl.formatMessage({ id: 'cards.' + card.translation_key }),
            value: card.value,
            progress: undefined,
          };
        }

        default:
          throw new Error(`Unknown card type: '${(card as any).card_type}'`);
      }
    })
    .filter((card) => card !== null)
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
      {cards.map((card, index) => (
        <React.Fragment key={index}>
          <Card className='md:col-span-1'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{card.value}</div>
              {card.progress !== undefined && <Progress value={card.progress} className='h-2 mt-2 ' />}
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
};

export { StatsCards };
