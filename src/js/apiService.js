import axios from "axios";

const formRef = document.querySelector('.search-city');
const inputRef = document.querySelector('.search-form');
const output = document.querySelector('.output');
const geoBtn = document.querySelector('.search-city__geo-btn');

formRef.addEventListener('submit', onSearch);
navigator.geolocation.getCurrentPosition(success, londonIsTheCapitalOfGreatBritain);

function onSearch(event) {
    event.preventDefault();
    const query = inputRef.value;
  console.log(query);
  fetchWeather(query);
}


const getGeoLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(success, londonIsTheCapitalOfGreatBritain);
}
geoBtn.addEventListener('click', getGeoLocation);

 function londonIsTheCapitalOfGreatBritain() {
  const query = 'London';
  fetchWeather(query);
};

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetchWeatherByCoords(lat,lon) 
}

async function fetchWeatherByCoords(lat,lon) {
  const output = document.querySelector('.output');
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  );
  const weather = await response.data;
  output.innerHTML = `
<span class="">Название города: ${weather.city.name}</span>
<span class="">Восход: ${weather.city.sunrise}</span>
<span class="">Закат: ${weather.city.sunset}</span>
<span class="">Температура: ${Math.ceil(weather.list[0].main.temp)}</span>
`;
  
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
}

