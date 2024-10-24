
# Weather Forecasting Application

Hosted Link: [Weather Forecasting App](https://chimerical-raindrop-14041e.netlify.app/)

## Overview

This Weather Forecasting Application allows users to check the current weather, forecast, and dominant weather condition for a selected city. It also incorporates user-defined thresholds and alerts for temperature exceedances. The app displays detailed weather data such as temperature, humidity, wind speed, and condition summaries for multiple forecast points throughout the day.

## Features

- **Current Weather Display:** Shows the latest weather data for a selected city.
- **5-Day Forecast:** Displays the forecast for the next few days at different time intervals.
- **Threshold Alerts:** Notifies users when the temperature exceeds a user-defined threshold for a specified number of consecutive updates.
- **Dominant Weather Condition:** Displays the most common weather condition over the forecast period.
- **Dynamic Background:** Changes the background based on the weather conditions (rainy, sunny, snowy, cloudy, etc.).
- **Temperature Unit Conversion:** Allows for temperature conversion between Celsius, Fahrenheit, and Kelvin.
- **Responsive Design:** Works on mobile and desktop devices.

## Dependencies

To run the application locally, you will need to have the following dependencies installed:

### Frontend

1. **Web Server**:
   - **Netlify**: If you want to host on Netlify like the current deployment.
   - **Local Development**: You can also use any local web server, such as **Live Server** in Visual Studio Code or **http-server** in Node.js.

2. **OpenWeather API**:
   - You need an API key from [OpenWeather](https://openweathermap.org/api) to fetch weather data.

### Backend (Optional)

This project is a frontend-only application, so a backend is not necessary unless you want to add features like saving user preferences, historical weather data, etc.

If you plan to add backend functionality, you could use:

- **Node.js** with **Express**: For building a simple backend API.
- **FastAPI**: If you prefer Python-based backend development.

### Containers (Optional)

You can containerize the app for easy deployment using **Docker** or **Podman**.

1. **Docker**:
   - Create a `Dockerfile` to run the frontend server.
   - Optionally, you can add backend services (Node.js/Express or FastAPI) as part of a multi-container setup.

Example `Dockerfile` for frontend:
```Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install -g http-server
CMD ["http-server", "-p", "8080"]
```

2. **Podman**:
   - Similar to Docker, you can use Podman to build and manage containers without requiring root access.

## Setup Instructions

### Clone the Repository

To get started, clone the repository:

```bash
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
```

### Environment Variables

You need to configure your API key from OpenWeather. Add the following to your `.env` file in the root directory:

```bash
REACT_APP_API_KEY=<Your OpenWeather API Key>
```

### Running Locally

To run the project locally:

1. Install the dependencies (if applicable):

   ```bash
   npm install
   ```

2. Run the web server:

   ```bash
   npx http-server .
   ```

3. Open the browser and go to `http://localhost:8080` to view the application.

### Deployment

For deploying to a platform like **Netlify**:

1. Push your project to a GitHub repository.
2. Go to [Netlify](https://www.netlify.com/), create an account, and connect your GitHub repository.
3. Configure the deployment settings and hit deploy.

Alternatively, use the following command if deploying to Docker:

```bash
docker build -t weather-forecast-app .
docker run -p 8080:8080 weather-forecast-app
```

## Design Choices

### API Integration

- **OpenWeather API** is used to fetch real-time weather data. The API provides extensive information including current weather conditions, 5-day forecasts, and weather icons.

### Dynamic Weather Background

- The app changes the background dynamically based on weather conditions (e.g., rain, sunny, snow). This was chosen to provide a more engaging user experience.

### Temperature Conversion

- Users can choose between Fahrenheit, Celsius, and Kelvin units, allowing for flexibility based on user preference.

### User Threshold Alerts

- The app compares the fetched weather data with user-defined thresholds (e.g., max temperature) and triggers alerts if the conditions are breached consecutively for a certain number of updates. This feature was designed for user safety and convenience.

### Forecast Summary

- A detailed forecast summary is generated and displayed to give users a clear understanding of weather conditions over the next few days, with temperature conversion applied based on user-selected units.

## Future Enhancements

- **Add Backend Support**: To store user preferences and historical data.
- **Enhanced UI**: Improve responsiveness and styling, especially for smaller devices.
- **Notifications**: Push notifications when weather alerts are triggered.
- **Multiple Language Support**: Add i18n support for global usage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
