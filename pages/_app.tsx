import React from 'react';
import type { AppProps } from 'next/app';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import '../styles/globals.css';
import 'normalize.css';
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
    grecaptcha: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />;
      </SnackbarProvider>
    </Provider>
  );
}
