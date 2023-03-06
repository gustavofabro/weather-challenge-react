import { ErrorMessageContext } from 'context/error-message';
import { ErrorMessageContextData } from 'context/error-message/error-message-context-data.interface';
import { useContext } from 'react';

function useErrorMessage(): ErrorMessageContextData {
  return useContext(ErrorMessageContext);
}

export default useErrorMessage;
