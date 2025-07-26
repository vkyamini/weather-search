
let apik = "3045dd712ffe6e702e3245525ac7fa38"
let apik2 = "1a7d50445be9f7e3f34e37489501e66c"
let url = "https://api.weatherstack.com/current?access_key=${apik}&query=${query}";
var datetimedaydis = document.getElementById('datetimedaydis');
var sky = document.getElementById('skyIcon');
var submitBtn = document.querySelector('#submitbtn');
var inputBox = document.querySelector('#input')
var weatherDisplay = document.querySelector('#weatherDisplay');
var astro = document.createElement('div');
var currentweather = document.createElement('div');
var upcomingweather = document.createElement('div');
var airQualityBtn = document.createElement('button');
var airqualitySectiondiv = document.createElement('div');//////

var currentLocation = document.getElementById('currentLocation');
datetimedaydis.classList.add('datetimedaydis');
currentweather.classList.add('currentweather');
upcomingweather.classList.add('upcomingweather');
airQualityBtn.classList.add('airQualityBtn');

let forecastrawdata;
let Obj;
let forecastObj;
let AirQualityObj;
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
function updateAirQualityObj(data){
  AirQualityObj = {
      type: data.request.type,
      query: data.request.query,
      language: data.request.language,
      unit: data.request.unit,
      name: data.location.name,
      country: data.location.country,
      region: data.location.region,
      lat: data.location.lat,
      lon: data.location.lon,
      timezone_id: data.location.timezone_id,
      localtime: data.location.localtime,
      localtime_epoch: data.location.localtime_epoch,
      utc_offset: data.location.utc_offset,
      observation_time: data.current.observation_time,
      temperature: data.current.temperature,
      weather_code: data.current.weather_code,
      weather_icons: data.current.weather_icons.join(", "),
      weather_descriptions: data.current.weather_descriptions.join(", "),
      sunrise: data.current.astro.sunrise,
      sunset: data.current.astro.sunset,
      moonrise: data.current.astro.moonrise,
      moonset: data.current.astro.moonset,
      moon_phase: data.current.astro.moon_phase,
      moon_illumination: data.current.astro.moon_illumination,
      co: data.current.air_quality.co,
      no2: data.current.air_quality.no2,
      o3: data.current.air_quality.o3,
      so2: data.current.air_quality.so2,
      pm2_5: data.current.air_quality.pm2_5,
      pm10: data.current.air_quality.pm10,
      // us_epa_index: data.current.air_quality.us-epa-index,
      // gb_defra_index: data.current.air_quality.gb-defra-index,
      wind_speed: data.current.wind_speed,
      wind_degree: data.current.wind_degree,
      wind_dir: data.current.wind_dir,
      pressure: data.current.pressure,
      precip: data.current.precip,
      humidity: data.current.humidity,
      cloudcover: data.current.cloudcover,
      feelslike: data.current.feelslike,
      uv_index: data.current.uv_index,
      visibility: data.current.visibility,
      is_day: data.current.is_day,
  
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
   console.log("forecast Obj for checking",data);
   forecastrawdata = data;
   UpdateForecastObj(data);
   Displayforecastweather(forecastObj)
  }).catch(error=>{
    return error.message;
  });
}

function airquality(){
  console.log("click air quality");
      fetch(`https://api.weatherstack.com/current?access_key=${apik2}&query=${query}`)
    .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   console.log("from second API",data);
   updateAirQualityObj(data);
   console.log(AirQualityObj);

  

   weatherDisplay.removeChild(airQualityBtn);
   weatherDisplay.append(airqualitySectiondiv);
   weatherDisplay.append(astro);
   airqualitySectiondiv.classList.add('airqualitySectiondiv');
   astro.classList.add('astrodiv')

    const pm25 = parseFloat(AirQualityObj.pm2_5);
    let airEmoji = "";
    let airAdvice = "";
    let rec;
   
    if (pm25 <= 12) {
      airEmoji = "✅";
      airAdvice = "Air quality is good. Enjoy the fresh air!";
      } else if (pm25 <= 35) {
      airEmoji = "⚠️";
      airAdvice = "Moderate air quality.It is recommended to limit long exposure.";
      } else if (pm25 <= 55) {
      airEmoji = "😷";
      airAdvice = "Unhealthy for sensitive groups. Limit outdoor activities.";
      } else if (pm25 <= 150) {
      airEmoji = "☠️";
      airAdvice = "Unhealthy air — best to stay indoors.";
      } else {
      airEmoji = "🛑";
      airAdvice = "Very unhealthy! Stay inside and wear a mask if you must go out.";
      }
      const limits = {
        co: 9,
        no2: 53,
        o3: 100,
        so2: 75,
        pm2_5: 12,
        pm10: 50,
       
      };

      function colorText(value, limit) {
        const num = parseFloat(value);
        if (num > limit) {
          return `<span style="color: red;">${num}</span>`;
        } else {
          return `<span style="color: green;">${num}</span>`;
        }
      }
      function UV(value){
        var UVimg = "./images/sunset.svg";
        const num = parseFloat(value);
          if (num <= 2) {
            rec = "UVI - 🟢🧢 Minimal risk, safe to be outdoors - Wear sunglasses if bright";
            return `<span style="color:rgb(4, 2, 120);"> ${num}-L</span>`; // Green
          } else if (num <= 5) {
            rec = "UVI - ⚠️ Moderate risk of harm - 	Use SPF 30+, seek shade at midday";
            return `<span style="color:rgb(85, 87, 2);"> ${num}-M</span>`; // Yellow
          } else if (num <= 7) {
            rec = "UVI - 🔶 Increased risk of skin damage - Reduce sun exposure, wear hat/sunglasses";
            return `<span style="color: #e67e22;"> ${num}-H</span>`; // Orange
          } else if (num <= 10) {
            rec = "UVI - 🔴 Serious risk, quick skin damage - Stay in shade, SPF 50+, wear full protection";
            return `<span style="color: #e74c3c;"> ${num}-VH</span>`; // Red
          } else {
            rec = "UVI - ☠️ Dangerous exposure -	Avoid the sun completely if possible";
            return `<span style="color:rgb(255, 0, 0);"> ${num}-EX</span>`; // Purple
          }
      }

      const moonPhaseEmojis = {
        "New Moon": "🌑",
        "Waxing Crescent": "🌒",
        "First Quarter": "🌓",
        "Waxing Gibbous": "🌔",
        "Full Moon": "🌕",
        "Waning Gibbous": "🌖",
        "Last Quarter": "🌗",
        "Waning Crescent": "🌘"
      };
      const moonPhase = AirQualityObj.moon_phase;
      const moonEmoji = moonPhaseEmojis[moonPhase] || "🌙";

   airqualitySectiondiv.innerHTML = `
   <div id="airqualitycard"> 
 
      <p id="CO">CO ${colorText(AirQualityObj.co, limits.co)}</p>
      <p id="NO2">NO₂ ${colorText(AirQualityObj.no2, limits.no2)}</p>
      <p id="PM25">PM₂₅ ${colorText(AirQualityObj.pm2_5, limits.pm2_5)}</p>
      <p id="PM10">PM₁₀ ${colorText(AirQualityObj.pm10, limits.pm10)}</p>
      <p id="SO2">SO₂ ${colorText(AirQualityObj.so2, limits.so2)}</p>
      <p id="O3">O₃ ${colorText(AirQualityObj.o3, limits.o3)}</p>
      <p id="UV">UV ${UV(AirQualityObj.uv_index)}</p>
  </div>
  `;
   astro.innerHTML = `
   <div class= "astro">
   <p>
   <span><img src="./images/sunrise.svg" alt="sunrise" class="icon-svg" >
   </img>Sunrise: ${AirQualityObj.sunrise}</span>
   <span id="astrosunset"><img src="./images/sunset.svg" alt="sunrise" class="icon-svg" >
   </img> Sunset: ${AirQualityObj.sunset}</span><br><br>
   <span><img src="./images/moonrise.svg" alt="moonrise" class="icon-svg" >
   </img>MoonRise: ${AirQualityObj.moonrise}</span>
   <span id="astromoonset"><img src="./images/moonset.svg" alt="moonset" class="icon-svg" >
   </img>MoonSet: ${AirQualityObj.moonset}</span><br><br>
   <span>It's ${moonEmoji}${AirQualityObj.moon_phase} phase</span>
   <span id="MoonIllumination">with Illumination of ${AirQualityObj.moon_illumination}%</span>
   </p>
   </div>
  <p  id="airqualitycardadvice">1.${airEmoji}${airAdvice}<br><br>2.${rec}</p> 
  `;
  }).catch(function(error){
     console.log("this is data",error);
   })
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
         </div>
        `
        
        
        airQualityBtn.addEventListener("click",()=>{
          airquality()
        });
      }
}

function getWeatherEmoji(iconCode) {
const map = {
  "01d": "☀️", "01n": "🌙",
  "02d": "🌤️", "02n": "🌤️",
  "03d": "☁️", "03n": "☁️",
  "04d": "☁️", "04n": "☁️",
  "09d": "🌧️", "09n": "🌧️",
  "10d": "🌦️", "10n": "🌧️",
  "11d": "⛈️", "11n": "⛈️",
  "13d": "❄️", "13n": "❄️",
  "50d": "🌫️", "50n": "🌫️"
};
return map[iconCode] || "❓";
}

function Displayforecastweather(forecastObj){
  if(forecastObj && Object.keys(forecastObj).length > 0){
    document.body.classList.remove("morning", "afternoon", "evening", "night"); // removes background color
    sky.innerHTML ="";
    datetimedaydis.innerHTML ="";
    console.log("forecast Obj",forecastObj);
    console.log("forecastrawdata",forecastrawdata);
    weatherDisplay.append(upcomingweather);
    upcomingweather.innerHTML = `
   <div id="upcomingweathercard" class="scroll-container"></div>
   <div id="dailyForecast" class="scroll-container"></div>
   <div id="airqualitySection"></div>
    `;

    const container = document.getElementById("upcomingweathercard");

      for (let i = 0; i < 8; i++) {
        const item = forecastrawdata.list[i]; // assuming `forecastrawdata` is global and available
        const dt = new Date(item.dt * 1000);
        const hour = dt.getHours();
        const timeLabel = i === 0 ? "Now" : `${hour % 12 || 12}${hour >= 12 ? 'PM' : 'AM'}`;
        const emoji = getWeatherEmoji(item.weather[0].icon);
        const temp = Math.round(item.main.temp);
        const pop = Math.round((item.pop || 0) * 100);

        const div = document.createElement("div");
        div.className = "forecast-item";
        div.innerHTML = `
          <div>${timeLabel}</div>
          <div style="font-size: 24px;">${emoji}${temp}°</div>
          <div>P - ${pop}%</div>
        `;
        container.appendChild(div);
        }

    const dailyContainer = document.getElementById("dailyForecast");

          const dailyMap = {};
          forecastrawdata.list.forEach(item => {
            const [dateStr, timeStr] = item.dt_txt.split(" ");
            if (timeStr === "12:00:00" && !dailyMap[dateStr]) {
              dailyMap[dateStr] = item;
            }
          });

        const dates = Object.keys(dailyMap).slice(0, 5);
        dates.forEach(dateStr => {
          const item = dailyMap[dateStr];
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString("en-US", { weekday: "short" });
          const emoji = getWeatherEmoji(item.weather[0].icon);
          const temp = Math.round(item.main.temp);
          const tempmax = Math.round(item.main.temp_max);
          const tempmin = Math.round(item.main.temp_min);
          const pop = Math.round((item.pop || 0) * 100);

          const div = document.createElement("div");
          div.className = "forecast-item";
          div.innerHTML = `
            <div>${day}</div>
            <div style="font-size: 24px;">${emoji}${temp}°</div>
            <div style="font-size: 12px;">H:${tempmax}°&nbsp;&nbsp;L:${tempmin}°</div>
            <div>P - ${pop}%</div>
          `;
          dailyContainer.appendChild(div);
        });
   
        weatherDisplay.append(airQualityBtn);
        airQualityBtn.textContent = "More Info"
  }



}








