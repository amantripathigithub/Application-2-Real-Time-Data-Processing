import React from 'react';
import WeatherSummary from './components/WeatherSummary';
import Alerts from './components/Alerts';
import SearchBar from './components/SearchBar';
import { Container, Typography } from '@mui/material';
import './App.css';

const App = () => {
  return (
    <Container>
      <Typography variant="h3" component="h3" gutterBottom>
        Weather Monitoring Dashboard
      </Typography>
      {/* <SearchBar /> */}
      <WeatherSummary />
      {/* <Alerts /> */}
    </Container>
  );
};

export default App;
