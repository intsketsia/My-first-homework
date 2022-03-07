function correctDate(date) {
  let currentTime = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0$${minutes}`;
  }
  let dayInfo = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[dayInfo]} ${hours}:${minutes}`;
}

let h1 = document.querySelector("#date");
h1.innerHTML = correctDate(new Date());

function convertToFareinheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = (temperature * 9) / 5 + 32;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFareinheit);

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "878909eed8d640e06db145231e865aab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
}

function searchCity(city) {
  let apiKey = "878909eed8d640e06db145231e865aab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function showResults(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let cityElement = document.querySelector("#city");
let cityInput = document.querySelector("#city-input");
let h2 = document.querySelector("h2");
h2.innerHTML = `${cityInput.value}`;
cityElement.innerHTML = cityInput.value;

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = response.data.main.temp;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showResults);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocation);
searchCity("Ottawa");
