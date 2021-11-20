function showCurrentTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "42d967004f943c4e9a88d5763e34cc28";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCurrentTemperature);
