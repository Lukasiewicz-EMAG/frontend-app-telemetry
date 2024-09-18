import React from 'react';
import ReactDOM from 'react-dom';
import { initialize, subscribe, APP_READY, APP_INIT_ERROR } from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import App from './App';
import './index.css';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <App />
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
});

