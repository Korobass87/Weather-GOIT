// import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 800;
const CURRENT_CITY_NAME = 'current-city-name';
let formData = [];

const form = document.querySelector('.find-form');
const input = document.querySelector('.input-value');
const button = document.querySelector('.add-favor-btn');
const renderFavor = document.querySelector('.favorits');

// const favorItem = document.querySelector('.favor-item');

// On loading page
// onCityLocalFetch(CURRENT_CITY_NAME);

button.addEventListener('click', onClickAddFavor);

function onClickAddFavor(e) {
  e.preventDefault();

  let cityName = input.value.trim();
  console.log('SET CITY NAME TO LOCAL STORAGE:', cityName);

  if (localStorage.getItem(CURRENT_CITY_NAME)) {
    formData = JSON.parse(localStorage.getItem(CURRENT_CITY_NAME));
  }

  if (cityName.length > 0 && !formData.includes(cityName) && cityName !== Number) {
    formData.push(cityName);

    // console.log(formData);
    localStorage.setItem(CURRENT_CITY_NAME, JSON.stringify(formData));
  } else if (formData.includes(cityName)) {
    Notify.failure(`Sorry! This city was add to favorits`);
  }

  onCityLocalFetch(CURRENT_CITY_NAME);

  return form.reset();
}

// Executive code
function onCityLocalFetch(name) {
  const getInfo = localStorage.getItem(name);
  // console.log(getInfo);
  const arrayCities = JSON.parse(getInfo);
  console.log('arrayCities', arrayCities);

  renderFavor.innerHTML = '';

  for (const city of arrayCities) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru,en&appid=daa3c03c1253f276d26e4e127c34d058`,
    ).then(response => {
      if (!response.ok) {
        Notify.failure(`Sorry! This city doesn't exist. Enter valid city name`);
        formData.pop();
        throw new Error(response.status);
      }

      console.log('GET API FROM LOCAL STORAGE:', city);
      console.log(response);

      // Рендер разметки
      renderFavoritsMarkup(city);

      // Кнопка удаления города из избранного
      const btnClose = document.querySelector('.btn-close');
      btnClose.addEventListener('click', onBtnClose);

      function onBtnClose(e) {
        e.preventDefault();
        renderFavor.innerHTML = '';

        const cityIndex = formData.indexOf(city);
        formData.splice(cityIndex, 1);
        console.log(arrayCities);

        return renderFavoritsMarkup(city);
      }

      return response.json();
    });
  }
}

function renderFavoritsMarkup(city) {
  let markup = `<li class="favor-item">
                  <a class="favor-item__btn" href=""><span class="span-text">${city}</span></a>
                  <button class="btn-close" id="${city}"></button>
                </li>`;
  renderFavor.insertAdjacentHTML('beforeend', markup);
}
