const apiKey = "a29dab1ab2f64ee8a76163537250510";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=yes&alerts=no`;

  fetch(currentUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
      document.getElementById("feelslike").innerText = data.current.feelslike_c;
      document.getElementById("temperature").innerText = data.current.temp_c;
      document.getElementById("condition").innerText = data.current.condition.text;
      document.getElementById("humidity").innerText = data.current.humidity;
      document.getElementById("wind").innerText = data.current.wind_kph;
      document.getElementById("icon").src = `https:${data.current.condition.icon}`;


      const dateObj = new Date(data.location.localtime);
      const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
      document.getElementById("date").innerText = dateObj.toLocaleDateString(undefined, options);
    })
    .catch((err) => {
      console.error("Error fetching current weather:", err);
      alert("Error fetching weather data. Please check the city name.");
    });


  fetch(forecastUrl)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        const day = data.forecast.forecastday[i];
        const card = document.getElementById(`day${i + 1}`);

        const date = new Date(day.date);
        const dayName = date.toLocaleDateString(undefined, { weekday: "long" });

        const iconUrl = `https:${day.day.condition.icon}`;
        const iconImg = `<img src="${iconUrl}" alt="weather icon" class="forecast-icon">`;

        card.innerHTML = `
          <h3>${dayName}</h3>
          ${iconImg}
          <p class="day-temp">${day.day.avgtemp_c} °C</p>
          <p class="day-condition">${day.day.condition.text}</p>
          <p class="day-humidity">Humidity: ${day.day.avghumidity}%</p>
          <p class="day-wind">Wind: ${day.day.maxwind_kph} kph</p>
        `;
      }
    })
    .catch((err) => {
      console.error("Error fetching forecast:", err);
      alert("Could not retrieve forecast data. Please try again.");
    });
}