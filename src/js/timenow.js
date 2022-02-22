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
  const changeDate=moment(date).utcOffset(oneDayData.timezone / 60)
 
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
  const daterise = new Date(sunrise * 1000)
  const sunrisechange = moment(daterise).utcOffset(oneDayData.timezone / 60)
    
  const dateset = new Date(sunset * 1000)
  const sunsetchange = moment(dateset).utcOffset(oneDayData.timezone / 60)
  
  const sunriseHours = addZero(sunrisechange.hours());
  const sunriseMinutes = addZero(sunrisechange.minutes());
  const sunsetHours = addZero(sunsetchange.hours());
  const sunsetMinutes = addZero(sunsetchange.minutes());
  dateSunriseTime.textContent = sunriseHours + ':' + sunriseMinutes;
  dateSunsetTime.textContent = sunsetHours + ':' + sunsetMinutes;
};

let oneDayData = {};

export default function renderOneDayWeather(data) {
   oneDayData = data.city;
  // if (!document.querySelector('.temperature-box')) {
   
  //   renderSunTime(oneDayData.sunrise, oneDayData.sunset);
  // } else {
  //   document.querySelector('.temperature-box').remove();
  //   refs.contentBox.insertAdjacentHTML('afterbegin', oneDayTemp(oneDayData));
    // 
    renderSunTime(oneDayData.sunrise, oneDayData.sunset);
  // }
};

