let geolocation = navigator.geolocation;
const APP_ID = 'f29abc6c7bccf2d95097b39e11d3941d';
const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const time = document.querySelector('.time');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  function CastWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log(lat,lon,data);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
            let Month=moment.unix(data.dt).format('MMMM').slice(0,3);
            let Day=moment.unix(data.dt).format('DD');
            let times=moment.unix(data.dt).format(' H:mm')
            time.innerHTML=Month+" "+Day+" ,"+times || DEFAULT_VALUE;
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
        });
  }
  geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
  function onGeoSuccess(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    CastWeather(lat,lon);
  }
  
  function onGeoError(error) {
    let detailError;
    
    if(error.code === error.PERMISSION_DENIED) {
      detailError = "User denied the request for Geolocation.";
    } 
    else if(error.code === error.POSITION_UNAVAILABLE) {
      detailError = "Location information is unavailable.";
    } 
    else if(error.code === error.TIMEOUT) {
      detailError = "The request to get user location timed out."
    } 
    else if(error.code === error.UNKNOWN_ERROR) {
      detailError = "An unknown error occurred."
    }
    
    $("#error").innerHTML = `Error: ${detailError}`;
  }
    