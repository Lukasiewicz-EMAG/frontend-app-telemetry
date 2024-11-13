import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OldStatCardsProps } from "./types";
import { CardsData } from "../../pages/Inf/Referral/types";
import { useIntl } from "react-intl";


//TODO remove when backend for admin also uses cards
const OldCards = ({ stats }: OldStatCardsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        {stat.progress !== undefined && (
                            <Progress
                                value={stat.progress}
                                className="h-2 mt-2"
                            />
                        )}
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

    const cards = stats.cards.map((card) => {
        if (card.card_type === 'time') {
            const hours = card.value.hours == 0 ? null : `${card.value.hours}h`;
            const minutes = `${card.value.minutes}m`;
            const fullTime = hours ? `${hours} ${minutes}` : minutes;
            return {
                title: intl.formatMessage({ id: "cards." + card.translation_key }),
                value: fullTime,
                progress: undefined,
            };
        } else if (card.card_type === 'percentage') {
            return {
                title: intl.formatMessage({ id: "cards." + card.translation_key }),
                value: `${card.value}%`,
                progress: card.value,
            };
        }
        return null;
    }).filter((card) => card !== null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
            {cards.map((card, index) => (
                card && (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            {card.progress !== undefined && (
                                <Progress
                                    value={card.progress}
                                    className="h-2 mt-2"
                                />
                            )}
                        </CardContent>
                    </Card>
                )
            ))}
        </div>
    );
};

export { StatsCards, OldCards };
