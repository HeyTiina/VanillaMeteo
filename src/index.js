async function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let tempElement = document.querySelector(".current-temperature-value");
  let humidityElement = document.querySelector("#humidity-value");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector(".current-temperature-icon");
  let conditionElement = document.querySelector("#current-condition");
  let forecastDateElement = document.querySelector(".forecast-date");
  let forecastIconElement = document.querySelector(".forecast-icon");
  let forecastMaxElement = document.querySelector(".forecast-max");
  let forecastMinElement = document.querySelector(".forecast-min");


  let apiKey = "2a830c1f5845c71a9b8c68a49820t94o";
  let tempApiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchInputElement.value}&key=${apiKey}&units=metric`;

  try {
    let response = await axios.get(tempApiUrl);

    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(response.data.temperature.current);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = response.data.wind.speed;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    conditionElement.innerHTML = ` ${response.data.condition.description}`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }

  try {
    let response = await axios.get(forecastApiUrl);

    //forecastDateElement.innerHTML = response.data.daily;
    forecastIconElement.innerHTML = `<img src="${response.data.daily.condition.icon_url}"/>`;
    forecastMaxElement.innerHTML = Math.round(
      response.data.daily.temperature.maximum
    );
    forecastMinElement.innerHTML = Math.round(
      response.data.daily.temperature.minimum
    );


  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

document.querySelector("#search-form").addEventListener("submit", search);

/* <div class="forecast-day">
                <div class="forecast-date">
                    Mon
                </div>
                <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" alt="" class="forecast-icon">
                <div class="forecast-temperature">
                    <div>
                        <strong class="forecast-max">11</strong><strong>º</strong>
                    </div>
                    <div>
                        <span class="forecast-min">9</span>º
                    </div>
                </div>
            </div> */

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

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
