// https://api.openweathermap.org/data/3.0/onecall?lat=40.7128&lon=-74.0060&exclude=minutely&uni
// ts=metric&appid=YOUR_API_KEY


let apik = "3045dd712ffe6e702e3245525ac7fa38"

var datetimedaydis = document.getElementById('datetimedaydis');
var sky = document.getElementById('skyIcon');
var submitBtn = document.querySelector('#submitbtn');
var inputBox = document.querySelector('#input')
var weatherDisplay = document.querySelector('#weatherDisplay');
var currentweather = document.createElement('div');
var upcomingweather = document.createElement('div');

var currentLocation = document.getElementById('currentLocation');
datetimedaydis.classList.add('datetimedaydis');
currentweather.classList.add('currentweather');
upcomingweather.classList.add('currentweather');
let Obj;
let forecastObj;
let query;
let hour;
let formattedTime;
function updateTimeDisplay(){
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const day = now.getDay();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = weekdays[day];
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // 0 becomes 12
  formattedTime = `${hour12}:${min.toString().padStart(2, '0')} ${period}`;
  datetimedaydis.innerHTML = `<h1><strong>${dayName}</strong></h1>
  <h1><strong>${formattedTime}</strong></h1>`
  
}
updateTimeDisplay(); 


function setInitialBackground() {
  const now = new Date();
  const hour = now.getHours();
   
   document.body.classList.remove("morning", "afternoon", "evening", "night");
    console.log(currentweather);
    if (hour >= 5 && hour < 11) {
      // bottom
      document.body.classList.add("morning");
       sky.innerHTML = `
        <svg viewBox="0 0 64 64" class="sun-rays center-svg bottom-svg" fill="#FFC107">
          <circle cx="32" cy="32" r="12"/>
          <g stroke="#FFC107" stroke-width="2">
            <line x1="32" y1="4" x2="32" y2="16"/>
            <line x1="32" y1="48" x2="32" y2="60"/>
            <line x1="4" y1="32" x2="16" y2="32"/>
            <line x1="48" y1="32" x2="60" y2="32"/>
            <line x1="10" y1="10" x2="18" y2="18"/>
            <line x1="46" y1="46" x2="54" y2="54"/>
            <line x1="10" y1="54" x2="18" y2="46"/>
            <line x1="46" y1="18" x2="54" y2="10"/>
          </g>
        </svg>`;
    } else if (hour >= 11 && hour < 17) {
      // top
      document.body.classList.add("afternoon");
      sky.innerHTML = `
      <svg viewBox="0 0 64 64" class="sun-rays center-svg top-svg" fill="#FFC107">
        <circle cx="32" cy="32" r="12"/>
        <g stroke="#FFC107" stroke-width="2">
          <line x1="32" y1="4" x2="32" y2="16"/>
          <line x1="32" y1="48" x2="32" y2="60"/>
          <line x1="4" y1="32" x2="16" y2="32"/>
          <line x1="48" y1="32" x2="60" y2="32"/>
          <line x1="10" y1="10" x2="18" y2="18"/>
          <line x1="46" y1="46" x2="54" y2="54"/>
          <line x1="10" y1="54" x2="18" y2="46"/>
          <line x1="46" y1="18" x2="54" y2="10"/>
        </g>
      </svg>`;
    } else if (hour >= 17 && hour < 20) {
      // bottom
      document.body.classList.add("evening");
      sky.innerHTML = `
        <svg viewBox="0 0 64 64" class="moon-glow center-svg bottom-svg" fill="#FFF59D">
          <path d="M32 4a28 28 0 1021.2 47.2A24 24 0 0132 4z"/>
        </svg>`;
    } else {
      // top
      document.body.classList.add("night");
      sky.innerHTML = `
      <svg viewBox="0 0 64 64" class="moon-glow center-svg top-svg" fill="#FFF59D">
        <path d="M32 4a28 28 0 1021.2 47.2A24 24 0 0132 4z"/>
      </svg>`;
    }
  }
  
  setInitialBackground(hour)
  

function UpdatecurrentObj(data){ // for fetching with query
  Obj = {
    lon: data.coord.lon,
    lat: data.coord.lat,
    id: data.id,
    main: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    base: data.base,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    sea_level: data.main.sea_level,
    grnd_level: data.main.grnd_level,
    visibility: data.visibility,
    speed: data.wind.speed,
    deg: data.wind.deg,
    all: data.clouds.all,
    dt: data.dt,
    type: data.sys.type,
    country: data.sys.country,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
    name: data.name,
    cod: data.cod,
  };
}
function UpdateForecastObj(data){
  forecastObj = {
    cod: data.cod,
    message: data.message,
    cnt: data.cnt,
    dt: data.list[39].dt,
    temp: data.list[39].main.temp,
    feels_like: data.list[39].main.feels_like,
    temp_min: data.list[39].main.temp_min,
    temp_max: data.list[39].main.temp_max,
    pressure: data.list[39].main.pressure,
    sea_level: data.list[39].main.sea_level,
    grnd_level: data.list[39].main.grnd_level,
    humidity: data.list[39].main.humidity,
    temp_kf: data.list[39].main.temp_kf,
    id: data.city.id,
    main: data.list[39].weather[0].main,
    description: data.list[39].weather[0].description,
    icon: data.list[39].weather[0].icon,
    all: data.list[39].clouds.all,
    speed: data.list[39].wind.speed,
    deg: data.list[39].wind.deg,
    gust: data.list[39].wind.gust,
    visibility: data.list[39].visibility,
    pop: data.list[39].pop,
    pod: data.list[39].sys.pod,
    dt_txt: data.list[39].dt_txt,
    name: data.city.name,
    lat: data.city.coord.lat,
    lon: data.city.coord.lon,
    country: data.city.country,
    population: data.city.population,
    timezone: data.city.timezone,
    sunrise: data.city.sunrise,
    sunset: data.city.sunset,
   }

}
submitBtn.addEventListener("click",()=>{
  query = inputBox.value.trim();
  if (query !== "") {
    Fetchdetails();    // current weather
    fetchForecast(); 
    // 5-day forecast
  }
 })
currentLocation.addEventListener('click',()=>{
  console.log("clicked currentLocation");
  navigator.geolocation.getCurrentPosition(
    (position) => {
     const lat = position.coords.latitude;
     const lon = position.coords.longitude;
      FetchNameWithLatandLon(lat, lon);  // ✅ Call it *after* coordinates are ready
    },
    (error) => {
      console.log("Location error:", error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
});

function FetchNameWithLatandLon(lat, lon){
  fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apik}`)
  .then(res => res.json())
  .then(function (data){
    console.log(data)
    query = data[0].name;
    Fetchdetails();
    fetchForecast();
    
  }).catch(error=>{
    return error.message;
  });
}
function Fetchdetails(){
  console.log("triggered Fetching",query)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apik}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if(data.cod !== 200){
      var errmes =data.message
     
      weatherDisplay.innerHTML =`<strong style="color: #e63946; font-size: 1rem; display: block; text-align: center; margin-top: 1rem;">
     Oops!! ${errmes}, please try again
     </strong>`;
   
       return;
    }
   
   console.log("current Obj for checking",data);
   UpdatecurrentObj(data);
   Displaycurrentweather(Obj)
  }).catch(function (error) {
    
    console.error(error);
  });
}
function fetchForecast(){
  console.log("forcast fetching",query)
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apik}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   UpdateForecastObj(data);
   Displayforecastweather(forecastObj)
  }).catch(error=>{
    return error.message;
  });
}


function Displaycurrentweather(Obj){
  if(Obj && Object.keys(Obj).length > 0){
    document.body.classList.remove("morning", "afternoon", "evening", "night"); // removes background color
        sky.innerHTML ="";
        datetimedaydis.innerHTML ="";
        weatherDisplay.innerHTML ="";
        console.log("current Obj",Obj);
        weatherDisplay.append(currentweather);
       
        var tempdata = Obj.temp;
        let desc;
        let recommendations;

       

        if (tempdata <= 0) {
          desc = "Freezing 🧊";
          recommendations = "🚫 Do not go out — it's freezing cold. Stay warm indoors!";
          document.body.classList.add("freezing");
      } else if (tempdata <= 11) {
          desc = "Cold 🥶";
          recommendations = "Dress warmly with layers. A hot drink might help!";
          document.body.classList.add("cold");
        } else if (tempdata <= 18) {
          desc = "Cool";
          recommendations= "🧣 Light jacket recommended. It's a bit chilly.";
          document.body.classList.add("coolt");
        } else if (tempdata <= 25) {
          desc = "Pleasant";
          recommendations = "🌤️ Perfect weather for a walk or outdoor activities.";
          document.body.classList.add("pleasant");
        } else if (tempdata <= 32) {
          desc = "Warm 🌤";
          recommendations = "Stay hydrated and wear light clothing.";
          document.body.classList.add("warm");
        } else if (tempdata <= 38) {
          desc = "Hot 🔥";
          recommendations = "🥵 Avoid heavy outdoor activity. Drink water regularly.";
          document.body.classList.add("hot");
        } else {
          desc = "Extreme Heat ☠️";
          recommendations = " Dangerously hot — stay indoors with cooling if possible.";
          document.body.classList.add("xhot");
        }

        currentweather.innerHTML = `
        <div class="weathercard">
            <p><span class="cityname">${Obj.name},${Obj.country} </span><br> <span class="description">${Obj.description}</span> </p>
            <span id="displaysvg"></span>
          

            <div class="flexcol">
                <div><p class="headingcard"><span id="wh"> wind</span><br><img src="./images/wind.svg" alt="Wind" class="icon-svg" ></img> <span class="carddis">${(Obj.speed* 3.6).toFixed(1)}<span class="unitstyle">km/h</span> </span></p></div>
                <div id="trial">
                  <p class="headingcard"><span id="vh">Visibility</span> <br>
                    <img src="./images/visibility.svg" alt="visibility" class="icon-svg" ></img> 
                    <span class="carddis">${(Obj.visibility / 1000).toFixed(1)}</span><span class="unitstyle">km</span>
                  </p>
                </div>
                <div id="temptrial"><p><strong>H: </strong>${Math.round(Obj.temp_max)}<span class="unitstyle">°C </span><br> <strong>L: </strong>${Math.round(Obj.temp_min)}<span class="unitstyle">°C </span> </p></div>
            </div>
          
            <div class="flexcol"> 
              <div> <p class="headingcard">Air pressure <br><img src="./images/pressure.svg" alt="air" class="icon-svg" ></img><span class="carddis">${Obj.pressure}<span class="unitstyle"> hPa</span></span></p></div>
              <div id="humidty"> <p class="headingcard"><span id="hh">Humidity</span> <br><img src="./images/humidity.svg" alt="humidity" class="icon-svg" ></img><span class="carddis">${Obj.humidity}<span class="unitstyle"> %</span></span></p></div>
              <div id="temp">${Math.round(Obj.temp)}<span id="cel" class="degree">°C</span><br></div>
            </div>
            <div class="recstyle">Feels Like ${Math.round(Obj.feels_like)}<span class="unitstyle">°C</span><br>It's ${desc} - ${recommendations}</div>
        <div> `
  }
}


function Displayforecastweather(forecastObj){
  if(forecastObj && Object.keys(forecastObj).length > 0){
    document.body.classList.remove("morning", "afternoon", "evening", "night"); // removes background color
    sky.innerHTML ="";
    datetimedaydis.innerHTML ="";
    console.log("forecast Obj",forecastObj);
   
  }
}











