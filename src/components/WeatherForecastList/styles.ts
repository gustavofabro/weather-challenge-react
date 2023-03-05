import styled, { css } from 'styled-components';

/* TODO: centralize breakpoints */
/* TODO: centralize colors */

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

export const CardsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 10px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.25);
  min-height: 190px;
  width: 325px;

  h2 {
    margin-bottom: 15px;
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;

export const ButtonSelectPeriodContainer = styled.div`
  display: flex;
`;

export const ButtonSelectPeriod = styled.button<{ isSelected: boolean }>`
  border: 0;
  border-radius: 4px;
  padding: 5px;
  background-color: #247ba0;
  color: #FFFFFF;
  font-size: 14px;

  & + & {
    margin-left: 5px;
  }

  ${props => props.isSelected && css`
    background-color: #006494;
  `}
`;

export const WeatherInfoContainer = styled.div`
  margin-top: 10px;
`;

export const DayPeriod = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 24px;
  }
`;

export const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    font-size: 25px;
    color: #5858d5;
  }

  div {
    display: flex;
    align-items: center;

    div {
      margin-left: 10px;

      span {
        display: flex;
        align-items: center;
        font-size: 15px;
      }

      span + span {
        margin-left: 5px;
      }
    }
  }

  p {
    margin-top: 5px;
  }
`;
