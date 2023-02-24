import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { mainTheme } from './styles/theme';
import { UserProvider } from './providers/UserContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={mainTheme}>
          <App />
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
