import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// MUI theme setup
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js'

// Roboto font for MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import store from './redux/store';

import App from './components/App/App';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider 
          theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);
