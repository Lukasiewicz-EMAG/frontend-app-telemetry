import ReactDOM from 'react-dom';
import { initialize, subscribe, APP_READY, APP_INIT_ERROR } from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import './index.css';
import { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from './i18n/index.ts';
import { General } from './pages/General/General.tsx';
import { Layout } from './modules/Layout.tsx';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <p>test</p>,
    // <AppProvider >
    //   <IntlProvider messages={messages.pl} locale="pl-PL" defaultLocale="pl">
    //     <Suspense fallback={null}>
    //       <Layout>
    //         <General />
    //       </Layout>
    //     </Suspense>
    //   </IntlProvider>
    // </AppProvider>,
    document.getElementById('root')
  );
});

subscribe(APP_INIT_ERROR, (error: Error) => {
  console.error('APP_INIT_ERROR', error);
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: messages,
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  locale: 'pl-PL',
  availableLocales: ['en', 'pl-PL'],
});