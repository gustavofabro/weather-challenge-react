import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';

export const Container = styled.div`
  width: 100%;

  > span {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;

    span {
      width: 325px;

      @media (max-width: 680px) {
        width: 100%;
      }
    }
  }
`;
