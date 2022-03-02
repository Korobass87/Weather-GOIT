import axios from 'axios';

import fetchImages from './randomImg';
import fetchRandomQuote from './randomQuote';
import renderOneDayWeather from './timenow';
import fetchMoreInfo from './more-info.js';
import renderCurrentWeather from "./today"
import test from './fiveDays'
import {onCityLocalFetch, onClickAddFavor, renderFavor} from './favorits'

  
onCityLocalFetch('current-city-name')

const formRef = document.querySelector('.search-city');
const inputRef = document.querySelector('.search-form');
const button = document.querySelector('.search-city__form-btn')
const geoBtn = document.querySelector('.geo-btn');

formRef.addEventListener('submit', onSearch);
geoBtn.addEventListener('click', getLocationByIP);
button.addEventListener('click', onClickAddFavor)
navigator.geolocation.getCurrentPosition(success, onError);

function onSearch(event) {
  event.preventDefault();
  const query = inputRef.value;
  fetchWeather(query);
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetchWeatherByCoords(lat, lon);
}

function onError() {
  const query = 'Moscow';
  fetchWeather(query);
}

async function getLocationByIP() {
  const response = await axios.get(`https://ipapi.co/json/`);
  const locationByIP = await response.data;
  const query = locationByIP.city;
  inputRef.value =query;
  
  fetchWeather(query);
}

async function fetchWeatherByCoords(lat, lon) {
  const output = document.querySelector('.output');
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  );
  const weather = await response.data;
  renderCurrentWeather(weather)
  
  renderOneDayWeather(weather);
  fetchMoreInfo(weather);
  fetchImages(weather);
  fetchRandomQuote()
  test(weather)
  
  
}

async function fetchWeather(query) {
  const output = document.querySelector('.output');
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  );
  const weather = await response.data;
  renderCurrentWeather(weather)
  fetchImages(weather);
  renderOneDayWeather(weather);
  fetchMoreInfo(weather);
  fetchRandomQuote()
  test(weather)
  
 
}
