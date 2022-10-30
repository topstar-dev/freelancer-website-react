import React from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from "notistack";
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n/i18nextConf';
import './index.css';

const TRACKING_ID = "G-6V10ZL15WZ";
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={1}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
