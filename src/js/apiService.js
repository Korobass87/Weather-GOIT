import axios from 'axios';

import fetchImages from './randomImg';
import fetchRandomQuote from './randomQuote';
import renderOneDayWeather from './timenow';
import fetchMoreInfo from './more-info.js';
import renderCurrentWeather from "./today"
import test from './fiveDays'


///// for favor
const renderFavor = document.querySelector('.siema')
const CURRENT_CITY_NAME = 'current-city-name'
let seachCityBtn
let formData
//////
onCityLocalFetch('current-city-name')

 

  function seachCityApi(e) {
  console.dir(e.target)
  if (e.target.nodeName === "A") {
    console.dir(e.target.innerText)
    let city = e.target.innerText
    fetchWeather(city)
  }
}

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

/////Избраное

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Siema from 'siema';




if (localStorage.getItem(CURRENT_CITY_NAME)) {
    formData = JSON.parse(localStorage.getItem(CURRENT_CITY_NAME));
} else {
  formData = [];
  }


// const form = document.querySelector('.find-form');
const input = document.querySelector('.search-form');
// const button = document.querySelector('.output');
;

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
                  <a class="favor-item__btn" href="#">${city}</a>
                  <button class="btn-close" id="${city}"></button>
                </div>`;
  renderFavor.insertAdjacentHTML('beforeend', markup);

  // const mySiema = new Siema({ perPage: 1, duration: 600 });
  // const prev = document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
  // const next = document.querySelector('.next').addEventListener('click', () => mySiema.next());
 seachCityBtn = document.querySelectorAll('.favor-item')
  addAllListener();
}

function addAllListener() {
  const btnClose = document.querySelectorAll('.btn-close');
  const seachCityBtn = document.querySelectorAll('.favor-item')
  seachCityBtn.forEach(city => {
    city.addEventListener('click', seachCityApi);
  })
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
