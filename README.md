# Weather Monitoring System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Alerts](#alerts)

- [Screenshots](#screenshots)

## Introduction
The Weather Monitoring System is a web application that fetches real-time weather data for multiple cities from the OpenWeatherMap API, stores it in a MongoDB database, and displays it in a React frontend. The application also triggers alerts when certain weather conditions exceed predefined thresholds.

## Features
- Fetches and displays current weather data for multiple cities.
- Stores weather data in MongoDB.
- Provides real-time updates of weather information.
- Displays historical weather data.
- Triggers alerts for high temperature, humidity, and wind speed.
- Interactive charts to visualize weather trends.

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, Material-UI, Chart.js
- **API:** OpenWeatherMap API

## Installation
### Prerequisites
- Node.js and npm installed
- MongoDB database (MongoDB Atlas or local MongoDB instance)

### Steps
1. Clone the repository:
   ```bash
   - git clone https://github.com/amantripathigithub/Application-2-Real-Time-Data-Processing.git

   
   - cd Application-2-Real-Time-Data-Processing

   






## Install backend dependencies:
   - cd backend
   - npm install


## Install frontend dependencies:
    - cd frontend
    - npm install



## Running the Application

   - Start the Backend Server
      - cd backend
      - node index.js
      
   - Start the Frontend Server
      - cd frontend
      - npm start

      
## API Endpoints
 - GET /
   - Returns a simple message indicating that the server is running.

 - GET ----/api/weather-summary
   - Fetches the summarized weather data for the tracked cities.

- GET /api/alerts
  - Placeholder for future alerts endpoint.

## Alerts
 - Alerts are generated when the following thresholds are exceeded:

 - Temperature: > 35°C
 - Humidity: > 60%
 - Wind Speed: > 7 m/s

## Backend: 
 - The server fetches weather data from the OpenWeatherMap API every 5 minutes and updates the MongoDB database with the latest data.
## Frontend: 
 - The React application fetches weather data every 20 seconds from the backend API and displays it in a user-friendly interface with live chart updations.
## Alerts: 
 - The frontend checks for conditions exceeding the thresholds and displays alerts for affected cities.


## screenshots

![Screenshot (2382)](https://github.com/user-attachments/assets/9e21d2a4-b960-42e4-b886-657dd27a865e)
![Screenshot (2381)](https://github.com/user-attachments/assets/cd6159a0-c3c2-46ec-98c7-297dcb91456a)
![Screenshot (2380)](https://github.com/user-attachments/assets/7d69e2fa-10dd-4415-b0ea-b79df33e54ed)

