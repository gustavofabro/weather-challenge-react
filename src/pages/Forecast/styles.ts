import styled from 'styled-components';

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

  @media (max-width: 680px) {
    padding: 20px;
  }
`;
