import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'daa3c03c1253f276d26e4e127c34d058';

const query = 'London';

const moreButton = document.querySelector('.more-info__button');
const weatherInfo = document.querySelector('.more-info');
const weatherInfoList = document.querySelector('.more-info__list');

moreButton.addEventListener("click", fetchInfoWeather);

async function fetchMoreInfo(query) {
    const response = await axios.get(`${BASE_URL}/forecast?q=${query}&units=metric&cnt=7&lang=ru&appid=${API_KEY}`)
        const data = response.data;
    const item = response.data.list.map(elem =>  
       ` <li class="time-weather">
        <p class="time-weather__time">${getCurrentTime(elem.dt)}</p>
        <p class="time-weather__temp">
            <img src="${'http://openweathermap.org/img/wn/' + elem.weather[0].icon + '.png'}" alt="${elem.weather[0].description}" class="time-weather__temp-icon">
            <span class="time-weather__span">${Math.round(elem.main.temp)} °</span>
        </p>    
    <ul class="time-weather__data">
        <li class="time-weather__pressure">
        <div class="time-weather__icon-pressure"></div>
            ${Math.round(elem.main.pressure / 1.33322)} mm</li>
        <li class="time-weather__humidity">
        <div class="time-weather__icon-humidity"></div>
            ${elem.main.humidity} %</li>
        <li class="time-weather__wind">
        <div class="time-weather__icon-wind"></div>
            ${Number(elem.wind.speed.toFixed(1))} m/s</li>
    </ul>
</li>`
    );
;   //console.log(item);
    weatherInfoList.innerHTML = item.join("");
    return item;
}
 
function fetchInfoWeather(event) {
    event.preventDefault();
   
     weatherInfo.classList.remove('is-hidden');
     fetchMoreInfo(query);
    
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
