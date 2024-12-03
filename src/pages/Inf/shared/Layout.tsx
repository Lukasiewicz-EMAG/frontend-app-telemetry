import Header from '@edx/frontend-component-header';
import FooterSlot from '@openedx/frontend-slot-footer';
import { cloneElement, ReactNode, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '../../../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import './Layout.scss';

interface NavigationItem {
  icon: JSX.Element;
  label: string;
  link: string;
  view?: string;
}

interface LayoutProps {
  children: ReactNode;
  navigation: NavigationItem[];
}

export const Layout = ({ children, navigation }: LayoutProps) => {
  const location = useLocation();
  const intl = useIntl();

  const params = new URLSearchParams(location.search);
  const currentPage = params.get('page');
  const currentView = params.get('view') || '';

  useEffect(() => {
    if (currentPage && currentPage.includes('admin')) {
      document.title = intl.formatMessage({ id: 'home.title.admin' });
    } else {
      document.title = intl.formatMessage({ id: 'home.title.student' });
    }
  }, [currentPage, intl]);

  const isCurrentRoute = (link: string) => {
    return location.search === link;
  };

  const getButtonStyles = (link: string) => {
    return buttonVariants({
      variant: isCurrentRoute(link) ? 'default' : 'ghost',
      size: 'icon',
      className: `rounded-lg w-full h-full p-3 my-1 ${
        isCurrentRoute(link) ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white hover:bg-black/90' : ''
      }`,
    });
  };

  const getIconStyles = (link: string) => {
    return `size-5 ${isCurrentRoute(link) ? 'text-white' : ''}`;
  };

  return (
    <TooltipProvider>
      <div className='flex flex-col lg:grid lg:h-screen w-full lg:grid-cols-[auto]'>
        <aside className='hidden lg:flex fixed top-0 left-0 z-30 h-full w-[72px] flex-col border-r bg-[#f4f7fd]'>
          <nav className='grid gap-2 p-2'>
            {navigation.map((navItem) => (
              <Tooltip key={navItem.link}>
                <TooltipTrigger asChild>
                  <Link
                    to={navItem.link}
                    className={getButtonStyles(navItem.link)}
                    aria-label={intl.formatMessage({ id: navItem.label })}
                  >
                    {cloneElement(navItem.icon, {
                      className: getIconStyles(navItem.link),
                    })}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  {intl.formatMessage({ id: navItem.label })}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className='lg:grid lg:grid-rows-[auto_1fr_auto] flex flex-1 flex-col lg:ml-[72px] bg-[#f4f7fd]'>
          <div className='border-b w-full lg:sticky lg:top-0 z-20'>
            <Header />
          </div>
          <div className='flex-1 overflow-auto'>
            <main className='p-4 mb-20 lg:mb-0'>
              <div className='container mx-auto p-4 space-y-8'>{children}</div>
            </main>
            {/* Footer */}
            <div className='border-t w-full hidden lg:block'>
              <FooterSlot />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='lg:hidden fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-white p-2'>
          {navigation.map((navItem) => (
            <Link
              key={navItem.link}
              to={navItem.link}
              className={getButtonStyles(navItem.link)}
              aria-label={intl.formatMessage({ id: navItem.label })}
            >
              {cloneElement(navItem.icon, {
                className: getIconStyles(navItem.link),
              })}
            </Link>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
