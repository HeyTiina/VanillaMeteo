async function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let tempElement = document.querySelector(".current-temperature-value");
  let humidityElement = document.querySelector("#humidity-value");
  let windSpeedElement = document.querySelector("#wind-speed");

  let apiKey = "2a830c1f5845c71a9b8c68a49820t94o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;

  try {
    let response = await axios.get(apiUrl);

    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(response.data.temperature.current);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = response.data.wind.speed;

    console.log(response.data.temperature.current);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

document.querySelector("#search-form").addEventListener("submit", search);

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
