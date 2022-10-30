import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Router from './pages/Router';
import './App.css';
import { useAppSelector } from './redux/hooks';

function App() {
  const { language } = useAppSelector(state => state.resources)
  const enFamily = ["Roboto"].join(',');
  const chFamily = ["SourceHanSansSC"].join(',');
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#336def"
      }
    },
    typography: {
      fontFamily: language === 'zh-CN' ? chFamily : enFamily
    }
  });

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
