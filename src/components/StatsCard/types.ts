export interface Stat {
    title: string;
    value: string;
    progress?: number;
}

export interface OldStatCardsProps {
    stats: Stat[];
}