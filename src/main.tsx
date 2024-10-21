import ReactDOM from 'react-dom';
import { initialize, subscribe, APP_READY, APP_INIT_ERROR } from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import './index.css';
import App from './App';
import { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from './i18n/index.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './hooks/query.ts';

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

const languagePreference = getCookie('openedx-language-preference');
const locale = languagePreference === 'en' ? 'en' : 'pl';


subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="pl">
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </IntlProvider>
      </QueryClientProvider>
    </AppProvider>,
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
  locale: locale,
  availableLocales: ['en', 'pl-PL'],
});