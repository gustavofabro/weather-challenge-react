import React, { createContext, useCallback, useState } from 'react';
import { ErrorMessageContextData } from './error-message-context-data.interface';

const ErrorMessageContext = createContext<ErrorMessageContextData>({} as ErrorMessageContextData);

const ErrorMessageProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const updateErrorMessage = useCallback((message: string | null): void => {
    setError(message);
  }, []);

  return (
    <ErrorMessageContext.Provider value={{ error, updateErrorMessage }}>
      {children}
    </ErrorMessageContext.Provider>
  );
};

export { ErrorMessageProvider, ErrorMessageContext };
