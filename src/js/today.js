import openFiveDays from "./fiveDays";
import showFiveDays from './fiveDays'
const fiveDayContainer = document.querySelector('.fiveDays--container')
const todaySection = document.querySelector(".today__section")
const chartShow = document.querySelector('.chart--show')
const quoteSection = document.querySelector('.quote-section')
let dateContainer = document.querySelector(".date-container")
const containerChart = document.querySelector('.container-chart')

export default function renderCurrentWeather(weather) {
  addCurrentClass()
  const todayWrapper = document.querySelector('.today__wrapper');
  let aboveZero = '';
  if (
    (Number(weather.list[0].main.temp) < 0) |
    (Number(weather.list[0].main.temp_min) < 0) |
    (Number(weather.list[0].main.temp_max) < 0)
  ) {
    aboveZero = '';
  } else {
    aboveZero = '';
  }
  todayWrapper.innerHTML = `
  <div class="today__div">
   <img class="today__img" src= "https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png">
  </div>
  <p class="today__city__name">${weather.city.name}, ${weather.city.country}</p>
      <div class="today__temp__info">
      <p class="today__temp">${aboveZero}${Math.ceil(weather.list[0].main.temp)}</p>
      <ul class="today__temp__list">
          <li class="today__temp__item">
              <p class = "today__temp__progress">min</p>
              <p class="today__temp__figure">${aboveZero}${Math.ceil(
    weather.list[0].main.temp_min,
  )}°</p>
          </li>
          <li class="today__temp__item">
              <p class = "today__temp__progress">max</p>
              <p class="today__temp__figure">${aboveZero}${Math.ceil(
    weather.list[0].main.temp_max,
  )}°</p>
          </li>
      </ul>
    </div>
    `;
}
// fetchWeatherToday(query);

// добавление класса на неактивную кнопку

const fivedayBtn = document.querySelector ('.fiveday__btn')
const todayBtn = document.querySelector ('.today__btn')
const btnList = document.querySelector ('.today__button__list')

fivedayBtn.addEventListener('click', removeCurrentClass);
// fivedayBtn.addEventListener('click', openFiveDays);
todayBtn.addEventListener ('click', addCurrentClass);


function removeCurrentClass() {

    fivedayBtn.classList.remove('current');
  todayBtn.classList.add('current');
  fiveDayContainer.classList.remove("is-hidden")
  todaySection.classList.add("is-hidden")
  dateContainer.classList.add("is-hidden")
  chartShow.classList.remove("is-hidden")
  quoteSection.classList.add("is-hidden")
  containerChart.classList.remove("is-hidden")
  btnList.classList.add("curent");

  // showFiveDays()

}

function addCurrentClass() {
    todayBtn.classList.remove('current');
  fivedayBtn.classList.add('current');
  fiveDayContainer.classList.add("is-hidden")
  todaySection.classList.remove("is-hidden")
dateContainer.classList.remove("is-hidden")
  chartShow.classList.add("is-hidden")
  quoteSection.classList.remove("is-hidden")
  containerChart.classList.add("is-hidden")
  btnList.classList.remove("curent");
}