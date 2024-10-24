let weather = {
  apiKey: YOUR_API_KEY,

  userPreferences: {
    thresholds: {
      temperature: {
        max_temp: 35, // Maximum temperature threshold
      },
      consecutive_limit: 2, // Number of consecutive updates to trigger alert
      consecutive_exceedance_count: 0, // Tracks consecutive exceedances
    },
  },

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.displayWeather(data);
        this.displayDominantWeather(data);
        this.checkThresholds(data.list);
        this.generateForecastSummary(data.list);
        this.predictConditionSummary(data.list);
      });
  },

  //temperature converter
  convertTemp: function (temp, unit) {
    if (unit === "F") {
      return ((temp * 9) / 5 + 32).toFixed(2);
    } else if (unit === "K") {
      return (temp + 273.15).toFixed(2);
    } else {
      return temp.toFixed(2);
    }
  },

  //display weather function
  displayWeather: function (data) {
    const { name } = data.city;
    const { icon, description } = data.list[0].weather[0];
    const { temp, feels_like, humidity, temp_min, temp_max } =
      data.list[0].main;
    const { speed } = data.list[0].wind;
    const datetime = data.list[0].dt_txt;
    console.log(name, icon, description);
    const weatherDescription = description.toLowerCase();
    const body = document.querySelector("body");
    if (weatherDescription.includes("rain")) {
      body.style.backgroundImage = "url('./media/rainy.jpg')";
    } else if (
      weatherDescription.includes("sunny") ||
      weatherDescription.includes("clear")
    ) {
      body.style.backgroundImage = "url('./media/sunny.jpg')";
    } else if (weatherDescription.includes("cloud")) {
      body.style.backgroundImage = "url('./media/cloudy.jpg')";
    } else if (weatherDescription.includes("snow")) {
      body.style.backgroundImage = "url('./media/snow.jpg')";
    } else {
      body.style.backgroundImage = "url('./media/default.jpg')";
    }
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".dt").innerText = "last updated:  " + datetime;

    const convertTemp = (temp, unit) => {
      if (unit === "F") {
        return ((temp * 9) / 5 + 32).toFixed(2);
      } else if (unit === "K") {
        return (temp + 273.15).toFixed(2);
      } else {
        return temp.toFixed(2);
      }
    };

    const selectedUnit = ttt;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".dt").innerText = "Last updated: " + datetime;

    document.querySelector(".temp").innerText =
      convertTemp(temp, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".temp-feels-like").innerText =
      "Feels like: " +
      convertTemp(feels_like, selectedUnit) +
      " °" +
      selectedUnit;
    document.querySelector(".temp-avg").innerText =
      "Avg Temp: " +
      convertTemp((temp_min + temp_max) / 2, selectedUnit) +
      " °" +
      selectedUnit;
    document.querySelector(".temp-min").innerText =
      "Min Temp: " + convertTemp(temp_min, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".temp-max").innerText =
      "Max Temp: " + convertTemp(temp_max, selectedUnit) + " °" + selectedUnit;

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");

    document.querySelector(".icon1").src =
      "https://openweathermap.org/img/wn/" +
      data.list[6].weather[0].icon +
      ".png";
    document.querySelector(".temp1").innerText =
      convertTemp(data.list[6].main.temp, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".dt1").innerText = data.list[6].dt_txt;

    document.querySelector(".icon2").src =
      "https://openweathermap.org/img/wn/" +
      data.list[12].weather[0].icon +
      ".png";
    document.querySelector(".temp2").innerText =
      convertTemp(data.list[12].main.temp, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".dt2").innerText = data.list[12].dt_txt;

    document.querySelector(".icon3").src =
      "https://openweathermap.org/img/wn/" +
      data.list[18].weather[0].icon +
      ".png";
    document.querySelector(".temp3").innerText =
      convertTemp(data.list[18].main.temp, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".dt3").innerText = data.list[18].dt_txt;

    document.querySelector(".icon4").src =
      "https://openweathermap.org/img/wn/" +
      data.list[24].weather[0].icon +
      ".png";
    document.querySelector(".temp4").innerText =
      convertTemp(data.list[24].main.temp, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".dt4").innerText = data.list[24].dt_txt;

    document.querySelector(".icon5").src =
      "https://openweathermap.org/img/wn/" +
      data.list[30].weather[0].icon +
      ".png";
    document.querySelector(".temp5").innerText =
      convertTemp(data.list[30].main.temp, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".dt5").innerText = data.list[30].dt_txt;
  },
  displayDominantWeather: function (data) {
    const weatherConditions = {};

    // Count occurrences of each weather condition
    data.list.forEach((item) => {
      const condition = item.weather[0].description; // Get weather condition
      if (weatherConditions[condition]) {
        weatherConditions[condition]++;
      } else {
        weatherConditions[condition] = 1;
      }
    });

    // Determine the dominant weather condition
    let dominantCondition = "";
    let maxCount = 0;
    for (const condition in weatherConditions) {
      if (weatherConditions[condition] > maxCount) {
        maxCount = weatherConditions[condition];
        dominantCondition = condition;
      }
    }

    // Display the dominant weather condition on the webpage
    document.querySelector(
      ".dominant-condition"
    ).innerText = `Dominant Weather Condition: ${dominantCondition}`;
  },

  //check threshold function

  checkThresholds: function (forecast) {
    // Check temperature in the forecast for alerts
    const currentTemp = forecast[0].main.temp;

    // If the temperature exceeds the user-defined threshold
    if (currentTemp > this.userPreferences.thresholds.temperature.max_temp) {
      this.userPreferences.thresholds.consecutive_exceedance_count++;
      console.log(
        `Alert: Temperature exceeds ${this.userPreferences.thresholds.temperature.max_temp}°C`
      );
    } else {
      // Reset the count if the threshold is not exceeded
      this.userPreferences.thresholds.consecutive_exceedance_count = 0;
    }

    // Check if the count exceeds the consecutive limit
    if (
      this.userPreferences.thresholds.consecutive_exceedance_count >=
      this.userPreferences.thresholds.consecutive_limit
    ) {
      alert(
        `Warning! The temperature has exceeded ${this.userPreferences.thresholds.temperature.max_temp}°C for ${this.userPreferences.thresholds.consecutive_limit} consecutive updates.`
      );
      this.userPreferences.thresholds.consecutive_exceedance_count = 0; // Reset count after alert
    }
  },

  // Generates a summary of the forecast for the next 5 updates
  generateForecastSummary: function (forecast) {
    let summary = "";
    const self = this; // Capture `this`
    for (let i = 0; i < 5; i++) {
      const { dt_txt, main, weather } = forecast[i];
      const condition = weather[0].description;

      // Convert dt_txt (timestamp) to a more readable format
      const date = new Date(dt_txt);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero if necessary
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Adjust for 12-hour format
      const formattedTime = `${hours}:${minutes} ${ampm}`;

      // Build the forecast summary with converted temperature
      summary += `${formattedTime}: Temp = ${self.convertTemp(
        main.temp,
        ttt
      )}°${ttt}, Condition = ${condition}\n`;
    }
    console.log(summary);
    document.querySelector(".forecast-summary").innerText = summary;
  },

  // Predicts conditions (hottest, coldest, most common) based on forecast
  predictConditionSummary: function (forecast) {
    let hottest = { temp: -Infinity, time: "" };
    let coldest = { temp: Infinity, time: "" };
    const weatherCount = {};

    forecast.forEach((item) => {
      const temp = item.main.temp;
      const time = item.dt_txt;
      const condition = item.weather[0].description;

      // Convert dt_txt to a more readable format
      const date = new Date(time);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero if necessary
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Adjust for 12-hour format
      const formattedTime = `${hours}:${minutes} ${ampm}`;
      const convertedTemp = this.convertTemp(temp, ttt);

      // Check for hottest and coldest temperatures
      if (convertedTemp > hottest.temp) {
        hottest = { temp: convertedTemp, time: formattedTime };
      }
      if (convertedTemp < coldest.temp) {
        coldest = { temp: convertedTemp, time: formattedTime };
      }

      // Count occurrences of each weather condition
      if (weatherCount[condition]) {
        weatherCount[condition]++;
      } else {
        weatherCount[condition] = 1;
      }
    });

    let mostCommonCondition = "";
    let maxCount = 0;
    for (const condition in weatherCount) {
      if (weatherCount[condition] > maxCount) {
        maxCount = weatherCount[condition];
        mostCommonCondition = condition;
      }
    }

    const summary = `Hottest: ${hottest.temp}°C at ${hottest.time}\nColdest: ${coldest.temp}°C at ${coldest.time}\nMost Common Condition: ${mostCommonCondition}`;
    console.log(summary);
    document.querySelector(".predicted-conditions").innerText = summary;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
var ttt = "C";
document.querySelector("select").addEventListener("change", function (evt) {
  ttt = evt.target.value;
  console.log(ttt);
  weather.fetchWeather(
    document.querySelector(".city").innerText.split("Weather in ")[1] ||
      "Bangalore"
  );
});

weather.fetchWeather("Bangalore");
