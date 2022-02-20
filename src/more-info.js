import axios from 'axios';
import InfoWeatherTpl from './templates/more-info.hbs'; 

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'daa3c03c1253f276d26e4e127c34d058';

let moreInfoWeather = {};

const query = 'London';

const divButton = document.querySelector('.button');
const moreButton = document.querySelector('.more-info__button');
const weatherInfo = document.querySelector('.more-info');
const weatherInfoList = document.querySelector('.more-info__list');

moreButton.addEventListener("click", fetchInfoWeather);

let forecast = {};



async function fetchMoreInfo(query) {
    const response = await axios.get(`${BASE_URL}/forecast?q=${query}&units=metric&cnt=7&lang=ru&appid=${API_KEY}`)
        const data = await response.data;
    const item = await response.data.list.map(elem => {
        forecast.time = getCurrentTime(elem.dt);
        forecast.temp = Math.round(elem.main.temp);
        forecast.humidity = elem.main.humidity;
        forecast. pressure = Math.round(elem.main.pressure / 1.33322);
        forecast.speed = Number(elem.wind.speed.toFixed(1));
        forecast.icon = 'http://openweathermap.org/img/wn/' + elem.weather[0].icon + '.png';
        forecast.iconDescription = elem.weather[0].description;
    });
return forecast;
};
console.log(forecast);    

  
function fetchInfoWeather(event) {
    event.preventDefault();
    const target = event.target;
    console.log(target);
     
     fetchMoreInfo(query);
    if (target.nodeName == 'BUTTON') {
       
        renderInfoWeather(target);
    } 
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const getCurrentTime = data => {
    let dataTime = new Date(data * 1000);
    let hours = addZero(dataTime.getHours());
    let minutes = addZero(dataTime.getMinutes());
    let time = hours + ':' + minutes;
    return time;
};


function renderInfoWeather(target) {
  weatherInfo.classList.remove('is-hidden');
  const day = Number(target.dataset.day);
  const moreDaysItem = document.querySelectorAll('.time-weather');
  if (moreDaysItem) {
    moreDaysItem.forEach(elem => elem.remove());
  }
  weatherInfoList.innerHTML = InfoWeatherTpl(forecast);
}