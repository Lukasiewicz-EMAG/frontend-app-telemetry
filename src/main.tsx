import ReactDOM from 'react-dom';
import { initialize, subscribe, APP_READY, APP_INIT_ERROR, getConfig } from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { IntlProvider, configure } from '@edx/frontend-platform/i18n';
import { getLoggingService } from '@edx/frontend-platform/logging';
import './index.css';
import App from './App';
import { Suspense } from 'react';
import messages from './i18n/index';

function flattenMessages(nestedMessages: any, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages: any, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else if (value && typeof value === 'object' && 'defaultMessage' in value) {
      messages[prefixedKey] = value.defaultMessage;  // Extract the actual message
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

subscribe(APP_READY, () => {
  configure({
    messages,
    config: getConfig(),
    loggingService: getLoggingService(),
  });

  const supportedLocales = ['en', 'pl'];
  const defaultLocale = 'pl';
  const userLocale = (getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME || defaultLocale) as 'en' | 'pl';

  const locale = supportedLocales.includes(userLocale) ? userLocale : defaultLocale;


  const localeMessages = messages[locale] || messages[defaultLocale];
  const messagesFlatten = flattenMessages(localeMessages);

  ReactDOM.render(
    <AppProvider wrapWithRouter={false}>
      <IntlProvider locale={locale} messages={messagesFlatten}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </IntlProvider>
    </AppProvider>,
    document.getElementById('root')
  );
});


subscribe(APP_INIT_ERROR, (error: Error) => {
  console.error('APP_INIT_ERROR', error);
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  locale: 'pl',
  availableLocales: ['en', 'pl'],
});


