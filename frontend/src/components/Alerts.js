import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
// import './Alerts.css';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/alerts');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Alerts
        </Typography>
        <List>
          {alerts.map((alert, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`City: ${alert.city}`}
                secondary={`Temperature: ${alert.temp}°C, Condition: ${alert.main}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Alerts;
