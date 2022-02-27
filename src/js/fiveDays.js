import fetchMoreInfo from "./more-info"
import runChart from "./chart"
const fiveDayList = document.querySelector('.fiveDays__list')
const fiveDayCitiesName = document.querySelector('.fiveDays__citiesName')
const fiveDayContainer = document.querySelector('.fiveDays--container')
const weatherInfo = document.querySelector('.more-info');
let latForFiveDays = ''
let lonForFiveDays = ''
let nameForFiveDays = ''
let countryForFiveDays = ''
let listForMore = {}
// мой тестовый запрос по городу /////////////////////

export default async function test(testList) {
    //       const APIKey = 'daa3c03c1253f276d26e4e127c34d058'
    //     const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=london&appid=${APIKey}`)
    // const testList = await response.json()

// добавить в общий запрос:
    /////////////
    let infoAboutCity = testList.city
    
   latForFiveDays = infoAboutCity.coord.lat
   lonForFiveDays = infoAboutCity.coord.lon
   nameForFiveDays = infoAboutCity.name
    countryForFiveDays = infoAboutCity.country
    openFiveDays()
   ///////// // 
    // return testList
   listForMore = testList
}

// test()

// имитация кнопки 5days////////////////////////////////
// fiveDayContainer.insertAdjacentHTML('beforebegin', '<button type="button" class="fiveDays__test">more info</button>')
// const btn5days = document.querySelector('.fiveDays__test')


// вешаю слушатель на мою сымитированную кнопку - типа 5days////////////////
// btn5days.addEventListener('click', openFiveDays)


function openFiveDays() {
    creatingFiveDays()
    changeNameForFiveDays()
    // showFiveDays()
}

// запрос на сервер
async function fetchWeatherForFiveDays() {
    try {
        const APIKey = 'daa3c03c1253f276d26e4e127c34d058'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latForFiveDays}&lon=${lonForFiveDays}&exclude=hourly,minutely&units=metric&appid=${APIKey}`)
        const weatherList = await response.json()
        
        
        // runChart(weatherList)
        return weatherList.daily
    }
    catch (error) {
            // Notify.failure("Sorry, there are no cyties matching your search query. Please try again.")
            
        }
}

// создание разметки
async function creatingFiveDays() {
    await fetchWeatherForFiveDays()
        .then(daily => {
            createMarkupFiveDays(daily)  
            runChart(daily)
    })
   
}



// разметка
async function createMarkupFiveDays(weathers) {
    
    fiveDayList.innerHTML = '';
    let MarkupFiveDays = await weathers.slice(1,6).map(weather => {
        const dateForFiveDays = createDateForFiveDays(weather)
        const iconFiveDays = weather.weather[0].icon
        const altFiveDays= weather.weather[0].description
   
        return ` <li class="fiveDays__item">
        <span class="fiveDays__weekDay">${dateForFiveDays[0]}</span>
    
        <span class="fiveDays__date">${dateForFiveDays[1]} ${dateForFiveDays[2]}</span>
        <div class="fiveDays__div"><img class="fiveDays__img" src="https://openweathermap.org/img/wn/${iconFiveDays}@2x.png" 
   width="50px" height="50px" alt="${altFiveDays}"></div>
        <div class="fiveDays__range--common">
            <div class="fiveDays__range fiveDays__range--border">
                <span class="fiveDays__range--limit">min</span>
                <span class="fiveDays__range--limitNumber">${Math.round(weather.temp.min)}&#176</span>
            </div>
            <div class="fiveDays__range">
                <span class="fiveDays__range--limit">max</span>
                <span class="fiveDays__range--limitNumber">${Math.round(weather.temp.max)}&#176</span>
            </div>
        </div>
        <button type="button" class="fiveDays__btn" id="${dateForFiveDays[1]}">more info</button>
    </li>`
    }).join('')
    

    
    return await fiveDayList.insertAdjacentHTML('beforeend', MarkupFiveDays) 
}

// работа с датой
function createDateForFiveDays(weather) {
    
        const date = new Date(weather.dt * 1000)
        const day = date.getDate()

        const indexMonth = date.getMonth()
        const arrayOfMonthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const month = arrayOfMonthes[indexMonth]
        
        const indexWeekDay = date.getDay()
        const arrayOfWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const weekDay = arrayOfWeekDays[indexWeekDay]
    
    return [weekDay, day, month]
}

// смена города и страны которые возвращаются от самого первого вызова к бэку
function changeNameForFiveDays() {
    fiveDayCitiesName.innerHTML = ''
    fiveDayCitiesName.textContent = `${nameForFiveDays}, ${countryForFiveDays}`
   
}

// отображение контейнера 5 дней
export function showFiveDays() {
    fiveDayContainer.classList.remove('is-hidden')
    clearColorWeekDay()
}

// скрытие контейнера 5 дней - добавить  на кнопку today)))/////
function hideFiveDays() {
    fiveDayContainer.classList.add('is-hidden')
}

// смена цвета дня по клику на moreinfo 
// (сюда можно воткнуть функцию отображения
//   почасового контейнера::::://////

fiveDayList.addEventListener('click', changeColorWeekDay)
let isChosenWeekDay = null
function changeColorWeekDay(evt) {
    if (evt.target.nodeName !== 'BUTTON') {
        return;
    }
    clearColorWeekDay()
    fetchMoreInfo(listForMore, evt.target.id)
    weatherInfo.classList.remove('is-hidden')
    // console.dir(evt.target.id)
   
    const chosenWeekDay = evt.target.parentNode.firstElementChild
    chosenWeekDay.classList.add('fiveDays--selected')

    if (!evt.target || !isChosenWeekDay) {
        return
    }
    if (evt.target.parentNode === isChosenWeekDay.parentNode) {             
        chosenWeekDay.classList.remove('fiveDays--selected')
        weatherInfo.classList.add('is-hidden')
        
        // сюда нужно добавить функцию скрытия почасосого окна
    }
}
    

// удаление цвета дня (добавить скрытие почасового контейнера)
function clearColorWeekDay() {
    isChosenWeekDay = document.querySelector('.fiveDays--selected')
    if (isChosenWeekDay) {
        isChosenWeekDay.classList.remove('fiveDays--selected')

    }
          
}









