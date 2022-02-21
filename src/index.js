import './sass/main.scss';

import axios from 'axios';
const search = document.querySelector('form#search');
const searchBox = document.querySelector('input#search-box');

// закоментировал для работы блока 7

//==

// search.addEventListener('submit', onSearch);

window.onload = function londonIsTheCapitalOfGreatBritain() {
  const query = 'London';
  fetchWeather(query);
};

function onSearch(event) {
  event.preventDefault();
  const query = searchBox.value;
  console.log(query);
  fetchWeather(query);
}

async function fetchWeather(query) {
  const output = document.querySelector('.output');
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  );
  const weather = await response.data;
  // закоментировал для работы блока 7

  //==
  //   output.innerHTML = `
  // <span class="">Название города: ${weather.city.name}</span>
  // <span class="">Восход: ${weather.city.sunrise}</span>
  // <span class="">Закат: ${weather.city.sunset}</span>
  // <span class="">Температура: ${Math.ceil(weather.list[0].main.temp)}</span>
  // `;
  fetchImages(weather);
  fetchRandomQuote();
}

async function fetchImages(weather) {
  const body = document.querySelector('body');
  const response = await axios.get(
    `https://pixabay.com/api/?key=25583037-a5404a14e1dce136772e20a61&q=${weather.city.name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=10`,
  );
  const images = await response.data;
  if (images.totalHits === 0) {
    body.style.backgroundImage = `linear-gradient(0.56deg, #000000 -13.48%, rgba(0, 0, 0, 0) 78.75%), url("https://pixabay.com/get/g1d0b17cb976faae8811031a1de2990bc7b92b078e5b70fc6a9fd1f7283822d54c40125658c84edd840558a16c725096e2e98bb3d5e9e813d0b80ff1a14670ba9_1280.jpg")`;
    return;
  }
  body.style.backgroundImage = `linear-gradient(0.56deg, #000000 -13.48%, rgba(0, 0, 0, 0) 78.75%), url("${
    images.hits[Math.floor(Math.random() * 10)].largeImageURL
  }")`;
}

async function fetchRandomQuote() {
  const quote = document.querySelector('.quote');
  const response = await axios.get('https://www.quotepub.com/api/widget/?type=rand&limit=1');
  const data = await response.data;
  quote.innerHTML = `
  <span class="quote__text">
  ${data[0].quote_body}
  </span>
  <span class="quote__author">
  ${data[0].quote_author}
  </span>
  `;
  return quote;
}

//block 7

const dayNowRef = document.querySelector('.date__day');
const monthNowRef = document.querySelector('.date__month');
const timeNowRef = document.querySelector('.date__time');

const moment = require('moment-timezone');

const nth = function (d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const intervalId = setInterval(() => {
  const date = new Date();
  const changeDate = oneDayData.timezone
    ? moment(date).utcOffset(oneDayData.timezone / 60)
    : moment(date);
  const dayNow = date.getDate();

  const weekDayNow = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);

  dayNowRef.innerHTML = `${dayNow}<sup class="date__day--nth">${nth(dayNow)}</sup> ${weekDayNow}`;

  monthNowRef.textContent = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  timeNowRef.textContent =
    pad(changeDate.hours()) + ':' + pad(changeDate.minutes()) + ':' + pad(changeDate.seconds());
}, 1000);

function pad(value) {
  return String(value).padStart(2, '0');
}

const dateSunriseTime = document.querySelector('.date__sunrise--time');
const dateSunsetTime = document.querySelector('.date__sunset--time');

function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
const renderSunTime = (sunrise, sunset) => {
  sunrise = oneDayData.timezone
    ? moment(sunrise).utcOffset(oneDayData.timezone / 60)
    : moment(sunrise);
  sunset = oneDayData.timezone
    ? moment(sunset).utcOffset(oneDayData.timezone / 60)
    : moment(sunrise);
  const sunriseHours = addZero(sunrise.hours());
  const sunriseMinutes = addZero(sunrise.minutes());
  const sunsetHours = addZero(sunset.hours());
  const sunsetMinutes = addZero(sunset.minutes());
  dateSunriseTime.textContent = sunriseHours + ':' + sunriseMinutes;
  dateSunsetTime.textContent = sunsetHours + ':' + sunsetMinutes;
};

let oneDayData = {};

const renderOneDayWeather = data => {
  oneDayData = data;
  if (!document.querySelector('.temperature-box')) {
    renderSunTime(oneDayData.sunrise, oneDayData.sunset);
  } else {
    document.querySelector('.temperature-box').remove();
    refs.contentBox.insertAdjacentHTML('afterbegin', oneDayTemp(oneDayData));
    renderSunTime(oneDayData.sunrise, oneDayData.sunset);
  }
};

renderOneDayWeather(oneDayData);
