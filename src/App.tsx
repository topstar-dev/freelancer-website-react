import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SnackbarProvider } from "notistack";
import Router from "./content/Router";
import rootreducer from './core/reducers';

const store = configureStore({ reducer: rootreducer });

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>

  );
}

export default App;
