function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Thu", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="forecast-day">
                  ${day}</div>
                  <img
                    src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
                    alt="partly partly_cloudy"
                    class="forecast-icon"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="forecast-temp-max">41°</span>
                    <span class="forecast-temp-min">25°</span>
                  </div>
                </div>
                
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCoordinates(coordinates) {
  let apiKey = "42d967004f943c4e9a88d5763e34cc28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemperature(response) {
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#current-day-time");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);
  celsiusTemperature = response.data.main.temp;

  getCoordinates(response.data.coord);
}

function searchCity(city) {
  let apiKey = "42d967004f943c4e9a88d5763e34cc28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  currentTemperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function showCelsiusTemp(event) {
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("New York");
