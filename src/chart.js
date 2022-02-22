import Chart from 'chart.js/auto'; //ссылка на chart.js

const jsHiden = document.querySelector('.js-hiden');
const chartBtnHide = document.querySelector('.chart--btn__show'); //лишка с текстом show Chart
const hideChart = document.querySelector('.hidden_title'); //лишка с текстом hide Chart
const showChart = document.querySelector('.chart--btn'); //ссылка на кнопку показать график
const hidenBtn = document.querySelector('.hidden_btn'); //ссылка на кнопку скрыть график
const chartView = document.querySelector('.chart--view'); //ссылка на блок с самим графиком
const ctx = document.querySelector('.myChart').getContext('2d'); //ссылка на canvas
console.log(ctx)
chartBtnHide.addEventListener('click', onShowBox)
showChart.addEventListener('click', onShowBox)
hideChart.addEventListener('click', onHideBox)
hidenBtn.addEventListener('click', onHideBox)
//Функция показывает блок графика
function onShowBox (e){
   jsHiden.classList.add('hidden') &
   chartView.classList.remove('hidden')
}
//Функция убирает блок графика
function onHideBox (e){
    chartView.classList.add('hidden') &
    jsHiden.classList.remove('hidden') 
 }

async function fetchWeather() {
  try {
      const APIKey = 'daa3c03c1253f276d26e4e127c34d058';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&exclude=hourly,minutely&units=metric&appid=${APIKey}`)
      const weatherList = await response.json()
      return weatherList.daily
  }
  catch (error) {
    console.log(error)
      }
}
//вызываю функцию запроса
fetchWeather().then((response)=>{
 const sliceDaily = response.slice(0,5)
 const dataToChart = processedData(sliceDaily)
 chartRender(dataToChart, ctx)
 
})
//обработчик данных для графика
const processedData = (obj)=>{
  const getDateTxt = data => new Date(data.dt * 1000).toDateString()
    const proData = {
      data: obj.map(elem=>getDateTxt(elem).slice(4,getDateTxt(elem).length)),
      temp: obj.map(elem=>elem.temp.day),
      humidity: obj.map(elem=>elem.humidity),
      speed: obj.map(elem=>elem.wind_speed),
      pressure: obj.map(elem=>elem.pressure),
    }
    return proData
  }


//Функция принимает массив объектов(уже готовых данных) и ссылку на график 
function chartRender(labels, link,){
  console.log(labels)
   const configCahrt = {
      type: 'line',
      data: {
          labels: labels.data,
          datasets: [{
              label: '— Temperature, C°'+resize(),
              data: labels.temp,
              tension: 0.2,
              fill: false,
              backgroundColor: 'rgba(255, 107, 9, 1)',
              borderColor: 'rgba(255, 107, 9, 1)',
              borderWidth: 1
          },
          {
            label: '— Humidity, %'+resize(),
            data: labels.humidity,
            tension: 0.2,
            fill: false,
            backgroundColor: 
                'rgba(9, 6, 235, 1)',
            borderColor: 
                'rgba(9, 6, 235, 1)',
            borderWidth: 1
        },
        {
          label: '— Wind Speed, m/s'+resize(),
          data: labels.speed,
          tension: 0.2,
          fill: false,
          backgroundColor: [
              'rgba(234, 154, 5, 1)',
          ],
          borderColor: [
              'rgba(234, 154, 5, 1)',
          ],
          borderWidth: 1
      },
      {
        label: '— Atmosphere Pressure, m/m',
        data: labels.pressure,
        tension: 0.2,
        fill: false,
        backgroundColor: 
            'rgba(6, 120, 6, 1)',
        borderColor:
            'rgba(6, 120, 6, 1)',
        borderWidth: 1
      }],
    },
    options: {
      layout: {
        padding: {
            left: 0,
            bottom: 20,
        }
    },
      plugins: {
        legend: {
          display: true,
          align: 'start',
          // fullSize: false,
          // maxWidth: 20,
          // maxHeight: 210,
          labels: {
            boxWidth: 15,
            boxHeight: 12,
            defaultFontColor: 'rgb(5, 120, 6)',
            color: 'rgba(247, 242, 242, 1)',
            padding:10,
          },
        
        },
        title: {
          display: false,
          text: 'Value of indicators',
          position: 'left',
          // padding: {
          //   top: 5,
          //   bottom: 5
          // },
          padding: 0,
          fullSize: false,
        },
        
      },
      
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(255, 255, 255, 1)'
          },
          ticks: {
            padding: 18,
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(255, 255, 255, 1)',
           
          },
          ticks: {
            padding: 18,
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
      },
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    }
   }
   const myChart = new Chart(link, configCahrt);
}

//это супер костыль (не трогать)
function resize(){
  if(window.outerWidth <= 767) {
    return "                                       "
 }else{
   return ''
 }
}




     










