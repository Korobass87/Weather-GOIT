import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchImages from './randomImg';
import fetchRandomQuote from './randomQuote';
import renderOneDayWeather from './timenow';
import fetchMoreInfo from './more-info.js';
import renderCurrentWeather from "./today"
import test from './fiveDays'


///// for favor
// const renderFavor = document.querySelector('.siema')
// const CURRENT_CITY_NAME = 'current-city-name'
// let seachCityBtn
// let formData
// //////
// onCityLocalFetch('current-city-name')

 

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
// button.addEventListener('click', onClickAddFavor)
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
  let response

 try { response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
 );
   
    const weather =  response.data;
  renderCurrentWeather(weather)
  fetchImages(weather);
  renderOneDayWeather(weather);
  fetchMoreInfo(weather);
  fetchRandomQuote()
  test(weather)
  }
  catch (error) {
    Notify.failure(`Sorry! This city doesn't exist. Enter valid city name`)
  }
  // const response = await axios.get(
  //   `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&lang=en&appid=daa3c03c1253f276d26e4e127c34d058`,
  // );
  // console.log(response)
  // if (!response.data) {
  //   console.log("не нашел");
  // }
  
  
 
  
 
}

/////Избраное

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import Siema from 'siema';




// if (localStorage.getItem(CURRENT_CITY_NAME)) {
//     formData = JSON.parse(localStorage.getItem(CURRENT_CITY_NAME));
// } else {
//   formData = [];
//   }



// const input = document.querySelector('.search-form');

// ;



// function onClickAddFavor(e) {
  
  

//   let cityName = input.value.trim();
  

//   if (localStorage.getItem(CURRENT_CITY_NAME)) {
//     formData = JSON.parse(localStorage.getItem(CURRENT_CITY_NAME));
//   }

//   if (cityName.length > 0 && !formData.includes(cityName) && cityName !== Number) {
//     formData.push(cityName);

   
//     localStorage.setItem(CURRENT_CITY_NAME, JSON.stringify(formData));
//   } else if (formData.includes(cityName)) {
//     Notify.failure(`Sorry! This city was add to favorits`);
//   }

//   onCityLocalFetch(CURRENT_CITY_NAME);

  
// }

// // // Executive code
// function onCityLocalFetch(name) {
   
//   const getInfo = localStorage.getItem(name);
//   const arrayCities = JSON.parse(getInfo);
  
//   renderFavor.innerHTML = '';
//    if (localStorage.getItem(CURRENT_CITY_NAME)) {
//     for (const city of arrayCities) {
  

      

//       renderFavoritsMarkup(city);

     
//   }
  
//   }
// }

// function renderFavoritsMarkup(city) {
//   let markup = `<div class="favor-item">
//                   <a class="favor-item__btn" href="#">${city}</a>
//                   <button class="btn-close" id="${city}"></button>
//                 </div>`;
//   renderFavor.insertAdjacentHTML('beforeend', markup);

//   // const mySiema = new Siema({ perPage: 1, duration: 600 });
//   // const prev = document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
//   // const next = document.querySelector('.next').addEventListener('click', () => mySiema.next());
//  seachCityBtn = document.querySelectorAll('.favor-item')
//   addAllListener();
// }

// function addAllListener() {
//   const btnClose = document.querySelectorAll('.btn-close');
//   const seachCityBtn = document.querySelectorAll('.favor-item')
//   seachCityBtn.forEach(city => {
//     city.addEventListener('click', seachCityApi);
//   })
//   btnClose.forEach(oneBtn => {
//     oneBtn.addEventListener('click', onBtnClose);
//   });
// }



// function onBtnClose(e) {
//   e.preventDefault();

  
//   const eventClose = e.target.id;
//   renderFavor.innerHTML = '';

//   const cityIndex = formData.indexOf(eventClose);

//   formData.splice(cityIndex, 1);
  

//   localStorage.setItem(CURRENT_CITY_NAME, JSON.stringify(formData));
//   formData.forEach(city => {
//     return renderFavoritsMarkup(city);
//   });
// }

const seachInput = document.querySelector('.search-form')
const seachFavList = document.querySelector(".seach-favorite-list")
const favorBtn = document.querySelector(".search-city__form-btn")
favorBtn.addEventListener('click', addToFav)
const seachBackBtn = document.querySelector(".back-btn")
seachBackBtn.addEventListener("click", prevSeachElem)
const seachFrwBtn = document.querySelector(".frw-btn")
seachFrwBtn.addEventListener("click", nextSeachElem)

let favoritItems = []
function addToFav() {
    if (localStorage.getItem("favor")) {
        favoritItems = JSON.parse(localStorage.getItem('favor'))
        if (seachInput.value.length > 0 && !favoritItems.includes(seachInput.value)) { favoritItems.push(seachInput.value) } 
        else if (favoritItems.includes(seachInput.value)) {
            alert( "город уже в вашем списке избраного")
        }

        localStorage.setItem("favor", JSON.stringify(favoritItems))

    } else {
        if (seachInput.value.length > 0) { favoritItems.push(seachInput.value) }

        localStorage.setItem("favor", JSON.stringify(favoritItems))
    }
    
countFav()
}

async function renderFavList(render) {
    
    // seachFavList.innerHTML = ""
    
        
        // <svg class="close-btn" width="10" height="10">
        //   <use href="/Weather-GOIT/symbol-defs.9b32fae7.svg#icon-close"></use>
        // </svg>

        
        
        let renderFavItem = render.map(item=>`<li id="${item}" class="seach-favorite-item">
        <a class="seach-favorite-link" href="#">${item}</a>
        <div class="close-btn"></div>
        
      </li>`).join("")
        
    seachFavList.innerHTML = await renderFavItem
    if (JSON.parse(localStorage.getItem("favor")).length) {

        renderFwdBackBtn()
    }
    

    }
    
function renderFwdBackBtn() {
        
      
        let favoritItems = JSON.parse(localStorage.getItem("favor"))

        if (favoritItems.indexOf(seachFavList.lastChild.id) === (favoritItems.length - 1) && !seachFrwBtn.classList.contains("visually-hidden")) {
            
            seachFrwBtn.classList.add("visually-hidden")
    }
    
    if (favoritItems.indexOf(seachFavList.lastChild.id) !== (favoritItems.length - 1)) {
            seachFrwBtn.classList.remove("visually-hidden")
    }
    
    
        
     
     if (favoritItems.indexOf(seachFavList.firstChild.id) === 0) {
            
         seachBackBtn.classList.add("visually-hidden")
         
     }
     else if (seachBackBtn.classList.contains("visually-hidden")) {
        seachBackBtn.classList.remove("visually-hidden") 
    }
    
    if (!seachBackBtn.classList.contains("visually-hidden")) {
        seachFavList.style.marginLeft = "10px"
    } else {
        seachFavList.style.marginLeft = "51px"
    }    
}


function action(e) {
    console.log(e.target.nodeName)
    let favoritItems = JSON.parse(localStorage.getItem("favor"))
    if (e.target.nodeName === "DIV") {
        console.log(e.currentTarget.id)
        let idxOfDelElem = favoritItems.indexOf(`${e.currentTarget.id}`)
    
        favoritItems.splice(idxOfDelElem, 1)
        localStorage.setItem("favor", JSON.stringify(favoritItems))
    
        countFav ()
    } else {fetchWeather(e.currentTarget.id);}
}

async function countFav () {

     if  (localStorage.getItem("favor")) {


        let favoritItems = JSON.parse(localStorage.getItem("favor"))

        if (window.outerWidth <= 767 && favoritItems.length > 2) {
            
            favoritItems.splice(2)
          
         } else if (window.outerWidth > 767 && favoritItems.length > 4) {
            
            favoritItems.splice(4)
          
         }
         

         await renderFavList(favoritItems)
         
         
        const FavElem = document.querySelectorAll(".seach-favorite-item")
        
        FavElem.forEach(x=>x.addEventListener("click", action))
    }

    
}

async function nextSeachElem() {
    let favoritItems = JSON.parse(localStorage.getItem("favor"))   
    

    if (favoritItems.indexOf(seachFavList.lastChild.id) !== (favoritItems.length - 1)) {

        if (window.outerWidth <= 767 ) {
            
            favoritItems = favoritItems.splice(favoritItems.indexOf(seachFavList.lastChild.id), 2)
         
        } else if ((window.outerWidth > 767)) {
            favoritItems = favoritItems.splice(favoritItems.indexOf(seachFavList.lastChild.id)-2, 4)
        }

    } else {console.log("Это конец") }
        await renderFavList(favoritItems)
        const FavElem = document.querySelectorAll(".seach-favorite-item")
        
        FavElem.forEach(x=>x.addEventListener("click", action))


    
    
}

async function prevSeachElem() {
    let favoritItems = JSON.parse(localStorage.getItem("favor")) 
    

    

        if (window.outerWidth <= 767) {
            
            favoritItems = favoritItems.splice((favoritItems.indexOf(seachFavList.firstChild.id) - 1), 2)
            
        } else if (window.outerWidth > 767) {
            
            favoritItems = favoritItems.splice((favoritItems.indexOf(seachFavList.firstChild.id) - 1), 4)
            
        }

     
        await renderFavList(favoritItems)
        const FavElem = document.querySelectorAll(".seach-favorite-item")
        
        FavElem.forEach(x=>x.addEventListener("click", action))
    
}

countFav()