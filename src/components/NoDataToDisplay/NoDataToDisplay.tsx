import { Box } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function NoDataToDisplay({
  title,
  desc,
  show = {
    title: true,
    desc: true,
    icon: true,
  },
}: {
  title?: string;
  desc?: string;
  show?: {
    title: boolean;
    desc: boolean;
    icon: boolean;
  };
}) {
  const intl = useIntl();
  title = intl.formatMessage({
    id: title || 'no_data.default.title',
    defaultMessage: 'No data to display',
  });
  desc = desc
    ? intl.formatMessage({
        id: desc,
        defaultMessage: '',
      })
    : '';

  return (
    <div className='flex flex-col items-center justify-center gap-4 py-12 md:py-16'>
      {show.icon && <Box className='h-16 w-16 text-muted' />}
      <div className='space-y-2 text-center'>
        {show.title && <h3 className='text-2xl font-semibold'>{title}</h3>}
        {show.desc && <p className='text-muted-foreground'>{desc}</p>}
      </div>
    </div>
  );
}
