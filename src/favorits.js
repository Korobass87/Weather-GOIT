// function renderFavoritsMarkup(value) {
//   const renderFavor = document.querySelector('.favorits');

//   let markup = value
//     .map(el => {
//       return `
//             <button>${el.onInputText.currentValue}</button>
//         `;
//     })
//     .join('');
//   renderFavor.insertAdjacentHTML('beforeend', markup);
// }

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 800;
const CURRENT_CITY_NAME = 'current-city-name';

const boxForm = document.querySelector('.find-form');
const favorBtn = document.querySelector('.add-favor-btn');

boxForm.addEventListener('input', debounce(onInputCity, DEBOUNCE_DELAY));
favorBtn.addEventListener('click', onClickAddFavor);

function onInputCity(e) {
  const currentCityName = e.target.value.trim();
  console.log('SET CITY NAME ON LOCAL STORAGE:', currentCityName);
  localStorage.setItem(CURRENT_CITY_NAME, currentCityName);
}

function onClickAddFavor(e) {
  e.preventDefault();

  // Backend data
  return onCityLocalFetch(CURRENT_CITY_NAME);
}

// Executive code
function onCityLocalFetch(name) {
  setTimeout(() => {
    const getCityName = localStorage.getItem(name);

    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${getCityName}&units=metric&lang=ru,en&appid=daa3c03c1253f276d26e4e127c34d058`,
    ).then(response => {
      if (!response.ok) {
        Notify.failure(`Sorry! This city doesn't exist. Enter valid city details`);
        throw new Error(response.status);
      }

      console.log('GET CITY NAME FROM LOCAL STORAGE:', getCityName);
      console.log(response);

      localStorage.removeItem(name);
      return response.json();
    });
  }, 800);
}
