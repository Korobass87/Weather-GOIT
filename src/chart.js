console.log(window)
import Chart from 'chart.js/auto';
const jsHiden = document.querySelector('.js-hiden');
const chartBtnHide = document.querySelector('.chart--btn__show'); //лишка с текстом show Chart
const hideChart = document.querySelector('.hidden_title'); //лишка с текстом hide Chart
const showChart = document.querySelector('.chart--btn'); //ссылка на кнопку показать график
const hidenBtn = document.querySelector('.hidden_btn'); //ссылка на кнопку скрыть график
const chartView = document.querySelector('.chart--view'); //ссылка на блок с самим графиком
const ctx = document.querySelector('.myChart').getContext('2d'); //ссылка на canvas
chartBtnHide.addEventListener('click', onShowBox)
showChart.addEventListener('click', onShowBox)
hideChart.addEventListener('click', onHideBox)
hidenBtn.addEventListener('click', onHideBox)
function onShowBox (e){
   jsHiden.classList.add('hidden') &
   chartView.classList.remove('hidden')
}
function onHideBox (e){
    chartView.classList.add('hidden') &
    jsHiden.classList.remove('hidden') 
 }

//Запрос к api на 5 дней
 async function getWeatherApi (sity){
    const searchParams = new URLSearchParams({
        q: sity,
        units: "metric",
        lang: "ru",
        appid: "daa3c03c1253f276d26e4e127c34d058",
      });
      console.log(searchParams.toString())
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchParams}`)
    const parseRes = await response.json();
    return parseRes
 }
//Вызываем функцию запроса к api
 getWeatherApi('lipetsk').then((response)=>{
    // помещаем массив данных на 5 дней 
    const fiveDaysWeather = parseDatesFiveDays(response);
    console.log(fiveDaysWeather)
    chartRender(fiveDaysWeather, ctx)
   
 })

//получаем массив дат  из прогноза на 5 дней
const parseDatesFiveDays = response => {
   const getDate = (data) => {return new Date(data.dt_txt).toDateString()}; // получаем дату для графика
   const dates = response.list
     .map(element => getDate(element))
     //фильтром делаем поис уникальных дат
     .filter((el, idx, arr) => arr.indexOf(el) === idx)
     // отрезаем последний элемент массива для получения массива с 5-ю датами
     const resDates = dates.splice(dates.length -1, 1)
     // выплевываем массив дат с обрезанными названиями дней недель
     return fersSpliceElem(dates)
}


function chartRender(labels, link){
   const configCahrt = {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
         title: {
           display: true,
           text: 'Value of indicators',
           position: 'left',
         },
         legend: {
           display: true,
           align: 'start',
   
           labels: {
             boxWidth: 13,
             boxHeight: 12,
             defaultFontColor: 'rgb(5, 120, 6)',
             padding: 10,
           },
         },
         scales: {
           xAxes: [
             {
               gridLines: {
                 color: 'rgba(255, 255, 255, 0.541)',
               },
               ticks: {
                 padding: 20,
               },
             },
           ],
           yAxes: [
             {
               gridLines: {
                 color: 'rgba(255, 255, 255, 0.541)',
                 stepSize: 0.5,
                 zeroLineColor: 'rgba(255, 255, 255, 0.541)',
               },
               ticks: {
                 padding: 18,
               },
               y: { // defining min and max so hiding the dataset does not change scale range
                  min: 0,
                  max: 100
                },
             },
           ],
         },
         responsive: true,
         maintainAspectRatio: false,
      }
   }
   const myChart = new Chart(link, configCahrt);
}
function fersSpliceElem(array){
   let newArray = []
   for(let i of array){
      newArray.push(i.slice(4, i.length))
   }
   return newArray
}





     










