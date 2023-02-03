import React from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from "notistack";
import { Provider } from 'react-redux';
import { Crisp } from "crisp-sdk-web";
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'dayjs/locale/zh-cn';
import './i18n/i18nextConf';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

Crisp.configure("a38aac52-0516-4039-921f-c1c14a21cfdf");

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
