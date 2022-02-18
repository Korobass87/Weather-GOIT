import './sass/main.scss';

import axios from 'axios';
const search = document.querySelector('form#search');
const searchBox = document.querySelector('input#search-box');

search.addEventListener('submit', onSearch);

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
  output.innerHTML = `
<span class="">Название города: ${weather.city.name}</span>
<span class="">Восход: ${weather.city.sunrise}</span>
<span class="">Закат: ${weather.city.sunset}</span>
<span class="">Температура: ${Math.ceil(weather.list[0].main.temp)}</span>
`;
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
