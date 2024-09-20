import { Home, FileText, Users } from 'lucide-react';
import { ReactNode } from 'react';
import { buttonVariants } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import Header from '@edx/frontend-component-header';
import FooterSlot from '@openedx/frontend-slot-footer';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isCurrentRoute = (path: string) => location.pathname === path;

  const getButtonStyles = (path: string) => {
    return buttonVariants({
      variant: isCurrentRoute(path) ? "default" : "ghost",
      size: "icon",
      className: `rounded-lg w-full h-full p-2 my-1 ${isCurrentRoute(path) ? "bg-black text-white hover:bg-black/90" : ""
        }`
    });
  };

  const getIconStyles = (path: string) => {
    return `size-5 ${isCurrentRoute(path) ? "text-white" : ""}`;
  };

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[53px]">
        <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-[53px] flex-col border-r">
          <nav className="grid gap-2 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className={getButtonStyles("/")}
                  aria-label="Home"
                >
                  <Home className={getIconStyles("/")} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Home
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/details"
                  className={getButtonStyles("/details")}
                  aria-label="Details"
                >
                  <FileText className={getIconStyles("/details")} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Details
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/referral"
                  className={getButtonStyles("/referral")}
                  aria-label="Referral"
                >
                  <Users className={getIconStyles("/referral")} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Referral
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 border-b bg-background px-4 w-full">
            <Header />
          </div>
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
          <div className="flex justify-end border-t">
            <FooterSlot />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};