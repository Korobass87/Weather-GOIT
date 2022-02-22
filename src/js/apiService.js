import axios from "axios";
import fetchImages from "./randomImg"
import renderOneDayWeather from "./timenow"
import fetchMoreInfo from './more-info.js';

const formRef = document.querySelector('.search-city');
const inputRef = document.querySelector('.search-form');
const output = document.querySelector('.output');
const geoBtn = document.querySelector('.geo-btn');

formRef.addEventListener('submit', onSearch);
geoBtn.addEventListener('click', getLocationByIP);
navigator.geolocation.getCurrentPosition(success, onError);

function onSearch(event) {
event.preventDefault();
const query = inputRef.value;
  fetchWeather(query);
}


function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetchWeatherByCoords(lat,lon) 
}

 function onError() {
  const query = 'Moscow';
  fetchWeather(query);
};

async function getLocationByIP() {
  const response = await axios.get(`https://ipapi.co/json/`);
  const locationByIP = await response.data;
  const query = locationByIP.city;
  fetchWeather(query);
  
}

async function fetchWeatherByCoords(lat,lon) {
  const output = document.querySelector('.output');
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  );
  const weather = await response.data;
  output.innerHTML = `
<span class="">Название города: ${weather.city.name}</span>
<span class="">Восход: ${weather.city.sunrise}</span>
<span class="">Закат: ${weather.city.sunset}</span>
<span class="">Температура: ${Math.ceil(weather.list[0].main.temp)}</span>
`;
  
}

async function fetchWeather(query) {
  const output = document.querySelector('.output');
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  );
  const weather = await response.data;
  
  fetchImages(weather)
  renderOneDayWeather(weather)
  fetchMoreInfo(weather)
  output.innerHTML = `
<span class="">Название города: ${weather.city.name}</span>
<span class="">Восход: ${weather.city.sunrise}</span>
<span class="">Закат: ${weather.city.sunset}</span>
<span class="">Температура: ${Math.ceil(weather.list[0].main.temp)}</span>
`;
}

// fetchImages(weather);
// fetchRandomQuote();