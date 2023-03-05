import styled, { css } from 'styled-components';

/* TODO: centralize breakpoints */
/* TODO: centralize colors */

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 15px;
  border-radius: 4px;
  width: 500px;

  @media (max-width: 680px) {
    padding: 0;
    width: 100%;
  }
`;

export const AddressInputContainer = styled.div<{ hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;

  input {
    padding: 10px;
    border-radius: 4px;
    border: 0;
    width: 100%
  }

  span[role='alert'] {
    border: 1px solid #bb0000;
    border-radius: 4px;
    background: #cc0000;
    color: #FFFFFf;
    padding: 5px 10px;
    margin-top: 5px;
    font-size: 16px;
  }

  ${props => props.hasError && css`
    input {
      border-color: #FF3333;
    }
  `}
`;

export const ButtonSubmit = styled.button<{ isLoading: boolean}>`
  border: 0;
  border-radius: 4px;
  padding: 10px;
  width: 180px;
  background-color: #6CA3FF;
  margin-top: 20px;
  color: #FFFFFF;
  font-weight: bold;

  svg {
    animation: spin infinite 3s linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  ${props => props.isLoading && css`
    cursor: auto;
  `}

  @media (max-width: 680px) {
    padding: 10px;
    width: 100%;
    margin-left: 0;
  }
`;
