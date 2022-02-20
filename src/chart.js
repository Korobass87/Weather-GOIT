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
        // cnt:5,
      });
      console.log(searchParams.toString())
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchParams}`)
    const parseRes = await response.json();
    return parseRes
 }
//Вызываем функцию запроса к api
 getWeatherApi('lipetsk').then((response)=>{
    //помещаем массив данных на 5 дней 
    const finalDate = dataProcessingFiveDays(response).list
    console.log(finalDate)
    processedData(finalDate)
    console.log(new Date(response.list[0].dt * 1000).getDate())
    console.log(response.list[0].dt)
    chartRender(processedData(finalDate), ctx)
   
 })
const processedData = (obj)=>{
  const proData = {
    data: obj.map(elem=>elem.date),
    temp: obj.map(elem=>elem.temp),
    humidity: obj.map(elem=>elem.humidity),
    speed: obj.map(elem=>elem.speed),
    pressure: obj.map(elem=>elem.pressure),
  }
  return proData
}


// Обработка данных на 5 дней
let fiveDayData = {};
const getDate = data => new Date(data.dt * 1000).getDate(); // Находим число 
//fiveData - возвращает массив с уникальными днями
const fiveData = (response) =>{
  const araryFiveday = response.list.map(elem => getDate(elem)) //выводит массив дней [20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25]
  const uniqueFiveDays = araryFiveday.filter((el, indx, arr)=> arr.indexOf(el) === indx) // возвращает копию массива с уникальными днями
  return uniqueFiveDays 
}
const dataProcessingFiveDays = response => {
  
  const list = fiveData(response)
    .map(el => response.list.filter(elem => getDate(elem) === el))
    .map(element => ({
      date: new Date(element[0].dt_txt).toDateString().slice(4,element[0].dt_txt.length), //юерем дату для графика и срезаем первые 4 сим
      temp: element[0].main.temp,
      humidity: element[0].main.humidity,
      speed: element[0].wind.speed,
      pressure: element[0].main.pressure,
      
    }));
    console.log(list)
  if (list[5]) {
    list.shift();
  }
  const changedData = {
    ...response,
    list,
  };
  fiveDayData = changedData;
  return fiveDayData;
};


function chartRender(labels, link,){
console.log(labels.temp)
   const configCahrt = {
      type: 'line',
    
      data: {
          labels: labels.data,
          
          datasets: [{
              label: '— Temperature, C°'+"             ",
              data: labels.temp,
              tension: 0.2,
              fill: false,
              backgroundColor: 'rgba(255, 107, 9, 1)',
              borderColor: 'rgba(255, 107, 9, 1)',
              borderWidth: 1
          },
          {
            label: '— Humidity, %                       ',
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
          label: '— Wind Speed, m/s                   ',
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
            left: 0
        }
    },
      plugins: {
        legend: {
          display: true,
          align: 'start',
          // maxHeight: 1220,
          // maxWidth: 1220,
          labels: {
            boxWidth: 15,
            boxHeight: 12,
            defaultFontColor: 'rgb(5, 120, 6)',
            color: 'rgba(247, 242, 242, 1)',
            padding:10,
          
          },
        },
        title: {
          display: true,
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
    
      },
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    

    // aspectRatio: 3,
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





     










