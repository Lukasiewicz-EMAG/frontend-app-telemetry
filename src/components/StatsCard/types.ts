export interface Stat {
    title: string;
    value: string;
    progress?: number;
}

export interface StatsCardsProps {
    stats: Stat[];
}