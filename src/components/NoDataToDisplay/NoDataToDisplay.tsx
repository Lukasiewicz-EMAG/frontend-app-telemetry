import { Box } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function NoDataToDisplay({ title, desc }: { title?: string; desc?: string }) {
    const intl = useIntl();
    title = intl.formatMessage({ id: title || 'no_data.default.title', defaultMessage: 'No data to display' });
    desc = intl.formatMessage({ id: desc || 'no_data.default.desc', defaultMessage: '' }); {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-12 md:py-16">
                <Box className="h-16 w-16 text-muted" />
                <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="text-muted-foreground">{desc}</p>
                </div>
            </div>
        );
    }
}
