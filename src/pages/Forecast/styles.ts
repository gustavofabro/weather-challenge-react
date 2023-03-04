import styled, { css } from 'styled-components';

/* TODO: centralize breakpoints */
/* TODO: centralize colors */

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;

  @media (max-width: 500px) {
    padding: 20px;
  }
`;

export const FormContainer = styled.section`
  width: 500px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  @media (max-width: 500px) {
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
    border: 1px solid #737373;
    width: 100%
  }

  span[role='alert'] {
    margin-top: 5px;
    color: #FF3333;
  }

  ${props => props.hasError && css`
    input {
      border-color: #FF3333;
    }
  `}
`;

export const ButtonSumit = styled.button<{ isLoading: boolean}>`
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

  @media (max-width: 500px) {
    padding: 10px;
    width: 100%;
    margin-left: 0;
  }
`;
