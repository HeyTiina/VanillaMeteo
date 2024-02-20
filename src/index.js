function updateWeather(repsonse) {
  let cityElement = document.querySelector("#current-city");
  let tempElement = document.querySelector(".current-temperature-value");
  let humidityElement = document.querySelector("#humidity-value");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector(".current-temperature-icon");
  let descriptionElement = document.querySelector("#current-description");
  let date = new Date(responde.data.time * 100);
  let dateElement = document.querySelector("#current-date");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  descriptionElement.innerHTML = ` ${response.data.condition.description}`;
  dateElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "2a830c1f5845c71a9b8c68a49820t94o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="forecast-icon">🌤️</div>
        <div class="forecast-temperature">
            <div>
                <strong class="forecast-max">11</strong><strong>º</strong>
            </div>
            <div>
                 <span class="forecast-min">9</span>º
            </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#weekly-forecast");
  forecastElement.addEventListener("submit", handleSearchSubmit);
}

searchCity("Paris");
displayForecast();

/*function updateForecastWeather(response) {
  let forecastDateElement = document.querySelector(".forecast-date");
  let forecastIconElement = document.querySelector(".forecast-icon");
  let forecastMaxElement = document.querySelector(".forecast-max");
  let forecastMinElement = document.querySelector(".forecast-min");

  forecastIconElement.innerHTML = `<img src="${response.data.daily[0].condition.icon_url}" />`;
  forecastMaxElement.innerHTML = Math.round(
    response.data.daily[0].temperature.maximum
  );
  forecastMinElement.innerHTML = Math.round(
    response.data.daily[0].temperature.minimum
  );
}*/
