import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardHeader, Typography, Avatar, Badge, List, ListItem, ListItemText } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensure you have the correct import for Chart.js

const WeatherSummary = () => {
  const [weatherData, setWeatherData] = useState([]);

  const thresholds = {
    temperature: 35, // example threshold
    humidity: 60, // example threshold
    windSpeed: 7, // example threshold
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather-summary');
        const sortedData = response.data.sort((a, b) => a.city.localeCompare(b.city)); // Sort by city name
        setWeatherData(sortedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

    // Fetch weather data every minute
    const intervalId = setInterval(fetchWeatherData, 20000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!Array.isArray(weatherData)) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: weatherData.map(item => item.city),
    datasets: [
      {
        label: 'Temperature',
        data: weatherData.map(item => item.averageTemp || 0),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Max Temperature',
        data: weatherData.map(item => item.maxTemp || 0),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Min Temperature',
        data: weatherData.map(item => item.minTemp || 0),
        fill: false,
        borderColor: 'rgba(54,162,235,1)',
      },
      {
        label: 'Feels Like',
        data: weatherData.map(item => item.averageFeelsLike || 0),
        fill: false,
        borderColor: 'rgba(255,206,86,1)',
      },
    ],
  };

  const convertToGMTPlus530 = (dateString) => {
    const date = new Date(dateString);
    const offset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
    const gmtPlus530Date = new Date(date.getTime() + offset);
    return gmtPlus530Date;
  };

  const generateAlerts = (item) => {
    const alerts = [];
    if (item.averageTemp > thresholds.temperature) {
      alerts.push(`High temperature: ${item.averageTemp.toFixed(2)}°C`);
    }
    if (item.averageHumidity > thresholds.humidity) {
      alerts.push(`High humidity: ${item.averageHumidity.toFixed(2)}%`);
    }
    if (item.averageWindSpeed > thresholds.windSpeed) {
      alerts.push(`High wind speed: ${item.averageWindSpeed.toFixed(2)} m/s`);
    }
    return alerts;
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Line data={data} />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {weatherData.map((item, index) => {
          const gmtPlus530Date = convertToGMTPlus530(item.date);
          const weatherIconUrl = `http://openweathermap.org/img/wn/${item.icon}.png`;
          const alerts = generateAlerts(item);

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ backgroundColor: '#f5f5f5', padding: '10px', position: 'relative' }}>
                {alerts.length > 0 && (
                  <Badge badgeContent={alerts.length} color="error" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Avatar style={{ backgroundColor: '#ff6f61' }}>!</Avatar>
                  </Badge>
                )}
                <CardHeader
                  title={item.city}
                  subheader={gmtPlus530Date.toLocaleDateString()}
                  style={{ backgroundColor: '#9da3a6', color: '#fff' }}
                />
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Avatar
                        src={weatherIconUrl}
                        alt={item.dominantWeather}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="body2" component="p">
                        Date: {gmtPlus530Date.toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Time: {item.time}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Temperature: {(item.averageTemp || 0).toFixed(2)}°C
                      </Typography>
                      <Typography variant="body2" component="p">
                        Max Temperature: {(item.maxTemp || 0).toFixed(2)}°C
                      </Typography>
                      <Typography variant="body2" component="p">
                        Min Temperature: {(item.minTemp || 0).toFixed(2)}°C
                      </Typography>
                      <Typography variant="body2" component="p">
                        Feels Like: {(item.averageFeelsLike || 0).toFixed(2)}°C
                      </Typography>
                      <Typography variant="body2" component="p">
                        Weather: {item.dominantWeather || 'N/A'}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Description: {item.description || 'N/A'}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Pressure: {(item.averagePressure || 0).toFixed(2)} hPa
                      </Typography>
                      <Typography variant="body2" component="p">
                        Humidity: {(item.averageHumidity || 0).toFixed(2)}%
                      </Typography>
                      <Typography variant="body2" component="p">
                        Wind Speed: {(item.averageWindSpeed || 0).toFixed(2)} m/s
                      </Typography>
                    </Grid>
                  </Grid>
                  {alerts.length > 0 && (
                    <List>
                      {alerts.map((alert, i) => (
                        <ListItem key={i}>
                          <ListItemText primary={alert} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default WeatherSummary;
