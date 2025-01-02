interface TimeCard {
  card_type: 'time';
  translation_key: string;
  value: { hours: number; minutes: number };
}

interface PercentageCard {
  card_type: 'percentage';
  translation_key: string;
  value: number | { percentage: number };
}

interface PercentageWithCountCard {
  card_type: 'percentage_with_count';
  translation_key: string;
  value: { percentage: number; count: number };
}

interface UserTimeCard {
  card_type: 'user_time';
  translation_key: string;
  value: { hours: number; minutes: number };
  user_name?: string;
}

interface UserIntCard {
  card_type: 'user_int';
  translation_key: string;
  value: number;
  user_name?: string;
}

interface IntCard {
  card_type: 'int';
  translation_key: string;
  value: number;
}

export type CardData =
  | TimeCard
  | PercentageCard
  | PercentageWithCountCard
  | UserTimeCard
  | UserIntCard
  | IntCard;