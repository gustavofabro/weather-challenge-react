import React from 'react';
import Forecast from '../pages/Forecast';
import { Routes, Route } from 'react-router-dom';

const routes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Forecast />} />
  </Routes>
);

export default routes;
