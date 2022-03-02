import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Siema from 'siema';

const CURRENT_CITY_NAME = 'current-city-name';
let formData
if (localStorage.getItem(CURRENT_CITY_NAME)) {
    formData = JSON.parse(localStorage.getItem(CURRENT_CITY_NAME));
} else {
  formData = [];
  }


// const form = document.querySelector('.find-form');
const input = document.querySelector('.search-form');
// const button = document.querySelector('.output');
const renderFavor = document.querySelector('.siema');

// // On loading page
// onCityLocalFetch(CURRENT_CITY_NAME);

// button.addEventListener('click', onClickAddFavor);

function onClickAddFavor(e) {
  
  

  let cityName = input.value.trim();
  

  if (localStorage.getItem(CURRENT_CITY_NAME)) {
    formData = JSON.parse(localStorage.getItem(CURRENT_CITY_NAME));
  }

  if (cityName.length > 0 && !formData.includes(cityName) && cityName !== Number) {
    formData.push(cityName);

   
    localStorage.setItem(CURRENT_CITY_NAME, JSON.stringify(formData));
  } else if (formData.includes(cityName)) {
    Notify.failure(`Sorry! This city was add to favorits`);
  }

  onCityLocalFetch(CURRENT_CITY_NAME);

  
}

// // Executive code
function onCityLocalFetch(name) {
   
  const getInfo = localStorage.getItem(name);
  const arrayCities = JSON.parse(getInfo);
  
  renderFavor.innerHTML = '';
   if (localStorage.getItem(CURRENT_CITY_NAME)) {
    for (const city of arrayCities) {
    // fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru,en&appid=daa3c03c1253f276d26e4e127c34d058`,
    // ).then(response => {
    //   if (!response.ok) {
    //     Notify.failure(`Sorry! This city doesn't exist. Enter valid city name`);
    //     formData.pop();
    //     throw new Error(response.status);
    //   }

      

      renderFavoritsMarkup(city);

      // return response.json();
    // })
  }
  
  }
}

function renderFavoritsMarkup(city) {
  let markup = `<div class="favor-item">
                  <a class="favor-item__btn" href="#"><span class="span-text">${city}</span></a>
                  <button class="btn-close" id="${city}"></button>
                </div>`;
  renderFavor.insertAdjacentHTML('beforeend', markup);

  // const mySiema = new Siema({ perPage: 1, duration: 600 });
  // const prev = document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
  // const next = document.querySelector('.next').addEventListener('click', () => mySiema.next());

  addAllListener();
}

function addAllListener() {
  const btnClose = document.querySelectorAll('.btn-close');
 
  btnClose.forEach(oneBtn => {
    oneBtn.addEventListener('click', onBtnClose);
  });
}

function onBtnClose(e) {
  e.preventDefault();

  
  const eventClose = e.target.id;
  renderFavor.innerHTML = '';

  const cityIndex = formData.indexOf(eventClose);

  formData.splice(cityIndex, 1);
  

  localStorage.setItem(CURRENT_CITY_NAME, JSON.stringify(formData));
  formData.forEach(city => {
    return renderFavoritsMarkup(city);
  });
}
export {onCityLocalFetch, onClickAddFavor, renderFavor}