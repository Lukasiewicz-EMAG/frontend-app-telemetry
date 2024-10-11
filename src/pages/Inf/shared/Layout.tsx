import Header from '@edx/frontend-component-header';
import FooterSlot from '@openedx/frontend-slot-footer';
import { FileText, Home, Users } from 'lucide-react';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '../../../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const getQueryParams = (queryString: string) => {
    return new URLSearchParams(queryString);
  };

  const params = getQueryParams(location.search);
  const currentPage = params.get('page');
  const currentView = params.get('view') || '';

  const isCurrentRoute = (page: string, view: string) => {
    return currentPage === page && currentView === view;
  };

  const getButtonStyles = (page: string, view: string) => {
    return buttonVariants({
      variant: isCurrentRoute(page, view) ? 'default' : 'ghost',
      size: 'icon',
      className: `rounded-lg w-full h-full p-2 my-1 ${
        isCurrentRoute(page, view) ? 'bg-black text-white hover:bg-black/90' : ''
      }`,
    });
  };

  const getIconStyles = (page: string, view: string) => {
    return `size-5 ${isCurrentRoute(page, view) ? 'text-white' : ''}`;
  };

  return (
    <TooltipProvider>
      <div className='flex flex-col lg:grid lg:h-screen w-full lg:grid-cols-[auto_1fr]'>
        <aside className='hidden lg:flex lg:relative inset-y-0 left-0 z-20 h-full w-[53px] lg:w-[72px] flex-col border-r bg-white lg:bg-transparent'>
          <nav className='grid gap-2 p-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={`?page=${currentPage}`} className={getButtonStyles('inf', '')} aria-label='Home'>
                  <Home className={getIconStyles('inf', '')} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Home
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={`?page=${currentPage}&view=details`}
                  className={getButtonStyles('inf', 'details')}
                  aria-label='Details'
                >
                  <FileText className={getIconStyles('inf', 'details')} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Details
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={`?page=${currentPage}&view=referral`}
                  className={getButtonStyles('inf', 'referral')}
                  aria-label='Referral'
                >
                  <Users className={getIconStyles('inf', 'referral')} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Referral
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        {/* Main content */}
        <div className='lg:grid lg:grid-rows-[auto_1fr_auto] flex flex-1 flex-col overflow-hidden'>
          {/* Header */}
          <div className='border-b bg-background w-full'>
            <Header />
          </div>
          <div className='flex-1 overflow-auto '>
            {/* Main Content Area */}

            <main className='p-4 mb-20 lg:mb-0'>
              <div className='container mx-auto p-4 space-y-8'>{children}</div>
            </main>
            {/* Footer */}
            <div className='border-t w-full hidden lg:block'>
              <FooterSlot />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className='lg:hidden fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-white p-2'>
          <Link to='?page=inf' className={getButtonStyles('inf', '')} aria-label='Home'>
            <Home className={getIconStyles('inf', '')} />
          </Link>
          <Link to='?page=inf&view=details' className={getButtonStyles('inf', 'details')} aria-label='Details'>
            <FileText className={getIconStyles('inf', 'details')} />
          </Link>
          <Link to='?page=inf&view=referral' className={getButtonStyles('inf', 'referral')} aria-label='Referral'>
            <Users className={getIconStyles('inf', 'referral')} />
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
};
