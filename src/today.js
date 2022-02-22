
// для теста
import axios from 'axios';
const query = 'Moscow';

async function fetchWeatherToday(query) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  );
  const weather = await response.data;
  renderCurrentWeather(weather);
}

//функция рендера текущей погоды
function renderCurrentWeather(weather) {
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
      <img class="today__img" src= "http://openweathermap.org/img/wn/${
        weather.list[0].weather[0].icon
      }.png">
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
fetchWeatherToday(query);

// добавление класса на неактивную кнопку

const fivedayBtn = document.querySelector ('.fiveday__btn')
const todayBtn = document.querySelector ('.today__btn')

fivedayBtn.addEventListener ('click', removeCurrentClass);
todayBtn.addEventListener ('click', addCurrentClass);

function removeCurrentClass() {
    fivedayBtn.classList.remove('current');
    todayBtn.classList.add('current');

}

function addCurrentClass() {
    todayBtn.classList.remove('current');
    fivedayBtn.classList.add('current');

}