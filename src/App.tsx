import AppProvider from 'context';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyle from './styles/global';


const App: React.FC = () => (
  <AppProvider>
    <BrowserRouter>
      <Routes />
      <GlobalStyle />
    </BrowserRouter>
  </AppProvider>
);

export default App;
