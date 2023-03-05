import React from 'react';
import { Container } from './styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const WeatherForecastListLoader: React.FC = () => (
  <Container title="Loading weather forecast">
    <SkeletonTheme baseColor="#eeeeee" highlightColor='#d8d8d8'>
      <Skeleton inline count={7} style={ { borderRadius: '0.25rem', opacity: 0.6 } } height="190px"></Skeleton>
    </SkeletonTheme>
  </Container>
);

export default WeatherForecastListLoader;
