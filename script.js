// ===== GLOBAL VARIABLES =====
const apiKey = "492a7d81b4b62560810900c6bf5a006d";
let forecastTemps = [];
let currentTemp = 0;
let isCelsius = true;


// ===== HIDE ICONS INITIALLY =====
document.getElementById("icon").style.display = "none";

document.querySelectorAll(".day-icon").forEach(icon=>{
icon.style.display = "none";
});


// ===== AUTO LOCATION WEATHER =====
function getLocationWeather(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async function(position){

const lat = position.coords.latitude;
const lon = position.coords.longitude;


// CURRENT WEATHER
const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const res = await fetch(weatherURL);
const data = await res.json();

updateCurrentWeather(data);


// FORECAST
const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const forecastRes = await fetch(forecastURL);
const forecastData = await forecastRes.json();

updateForecast(forecastData);

});

}

}



// ===== CITY SEARCH WEATHER =====
async function getWeather(){

const city = document.getElementById("cityInput").value.trim();

if(!city){
alert("Please enter a city name");
return;
}


// CURRENT WEATHER
const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const res = await fetch(weatherURL);
const data = await res.json();

updateCurrentWeather(data);


// FORECAST
const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const forecastRes = await fetch(forecastURL);
const forecastData = await forecastRes.json();

updateForecast(forecastData);

}



// ===== UPDATE CURRENT WEATHER UI =====
function updateCurrentWeather(data){

document.getElementById("location").innerText = data.name;

currentTemp = data.main.temp;

document.getElementById("temperature").innerText =
currentTemp.toFixed(1);

document.getElementById("feelslike").innerText =
data.main.feels_like;

document.getElementById("condition").innerText =
data.weather[0].description;

document.getElementById("humidity").innerText =
data.main.humidity;

document.getElementById("wind").innerText =
data.wind.speed;


// ICON
const iconCode = data.weather[0].icon;

const icon = document.getElementById("icon");

icon.src =
`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

icon.style.display = "block";


// DATE + TIME
const today = new Date();

const options = {
weekday:"long",
year:"numeric",
month:"short",
day:"numeric",
hour:"2-digit",
minute:"2-digit"
};

document.getElementById("date").innerText =
today.toLocaleDateString("en-US",options);

}



// ===== UPDATE FORECAST =====
function updateForecast(forecastData){

const days = ["day1","day2","day3","day4","day5"];

for(let i=0;i<5;i++){

const item = forecastData.list[i*8];

const card = document.getElementById(days[i]);

const iconCode = item.weather[0].icon;

const iconEl = card.querySelector(".day-icon");

iconEl.src =
`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

iconEl.style.display="block";

forecastTemps[i] = item.main.temp;

card.querySelector(".day-temp").innerText =
forecastTemps[i].toFixed(1) + " °C";

card.querySelector(".day-condition").innerText =
item.weather[0].description;

card.querySelector(".day-humidity").innerText =
"Humidity: " + item.main.humidity + "%";

card.querySelector(".day-wind").innerText =
"Wind: " + item.wind.speed + " kph";

}

}



// ===== TEMPERATURE TOGGLE =====
document.getElementById("toggleTemp").addEventListener("click",function(){

const tempEl = document.getElementById("temperature");
const unitEl = document.getElementById("unit");

if(isCelsius){

// const f = (currentTemp * 9/5) + 32;

let f = (currentTemp * 9/5) + 32;
tempEl.innerText = f.toFixed(1);
unitEl.innerText = "°F";

document.querySelectorAll(".day-temp").forEach((el,i)=>{
let fTemp = (forecastTemps[i] * 9/5) + 32;
el.innerText = fTemp.toFixed(1) + " °F";
});

}else{

tempEl.innerText = currentTemp.toFixed(1);
unitEl.innerText = "°C";

document.querySelectorAll(".day-temp").forEach((el,i)=>{
el.innerText = forecastTemps[i].toFixed(1) + " °C";
});

}

isCelsius = !isCelsius;

});



// ===== AUTO LOAD WEATHER =====
window.onload = function(){

getLocationWeather();

};