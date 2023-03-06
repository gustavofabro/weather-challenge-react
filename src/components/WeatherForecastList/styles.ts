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
  min-height: 230px;
  width: 325px;

  h2 {
    margin-bottom: 5px;
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;

export const ButtonSelectPeriodContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const ButtonSelectPeriod = styled.button<{ isSelected: boolean }>`
  border: 0;
  border-radius: 4px;
  padding: 5px;
  background-color: #a5cad9;
  color: #FFFFFF;
  font-size: 14px;

  & + & {
    margin-left: 5px;
  }

  ${props => props.isSelected && css`
    background-color: #369bcb;
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
`;

export const ForecastMainInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
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

  svg {
    font-size: 25px;
    color: #5858d5;
  }
`;


export const ForecastResume = styled.div`
  display: flex;
  margin-top: 5px;

  p {
    margin-left: 10px;
  }

  img {
    width: 80px;
    border-radius: 4px;
  }
`;
