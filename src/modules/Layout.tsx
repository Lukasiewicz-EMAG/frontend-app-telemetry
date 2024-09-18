import { Home, FileText, Users } from 'lucide-react';
import { ReactNode } from 'react';
import { buttonVariants } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Link } from 'react-router-dom';
import Header from '@edx/frontend-component-header';
import './Layout.scss';
import FooterSlot from '@openedx/frontend-slot-footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[53px]">
        <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-[53px] flex-col border-r">
          <nav className="grid gap-2 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "rounded-lg w-full h-full p-2 my-1"
                  })}
                  aria-label="Home"
                >
                  <Home className="size-5" />
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
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "rounded-lg w-full h-full p-2 my-1"
                  })}
                  aria-label="Details"
                >
                  <FileText className="size-5" />
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
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "rounded-lg w-full h-full p-2 my-1"
                  })}
                  aria-label="Referral"
                >
                  <Users className="size-5" />
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
            {/* <h1 className="text-xl font-semibold">Dashboard</h1> */}
            <Header />

          </div>
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </TooltipProvider>
  );
};



// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import ReactDOM from 'react-dom';

// import {
//   APP_INIT_ERROR, APP_READY, subscribe, initialize,
// } from '@edx/frontend-platform';
// import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
// import Header from '@edx/frontend-component-header';
// import FooterSlot from '@openedx/frontend-slot-footer';
// import messages from './i18n';
// import ExamplePage from './example/ExamplePage';

// import './index.scss';

// subscribe(APP_READY, () => {
//   ReactDOM.render(
//     <AppProvider>
//       <Header />
//       <ExamplePage />
//       <FooterSlot />
//     </AppProvider>,
//     document.getElementById('root'),
//   );
// });

// subscribe(APP_INIT_ERROR, (error: Error) => {
//   ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
// });

// initialize({
//   messages,
// });
