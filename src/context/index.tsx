import React from 'react';
import { ErrorMessageProvider } from './error-message';

const AppProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => (
  <ErrorMessageProvider>
    {children}
  </ErrorMessageProvider>
);

export default AppProvider;
