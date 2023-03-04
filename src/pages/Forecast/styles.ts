import styled, { css } from 'styled-components';

/* TODO: centralize breakpoints */
/* TODO: centralize colors */

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background: linear-gradient(90deg, #7474BF 10%, #348AC7 90%);
  min-height: 100vh;

  h1 {
    font-weight: bold;
    color: #FFFFFF;
    font-size: 34px;
  }

  @media (max-width: 550px) {
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
    padding: 5px 15px;
    border-radius: 4px;
  }

  @media (max-width: 550px) {
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

  @media (max-width: 550px) {
    padding: 10px;
    width: 100%;
    margin-left: 0;
  }
`;
