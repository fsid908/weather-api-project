# weather-api-project
A clean and simple web app providing real-time weather data, including temperature, humidity, and a 5-day forecast for any city worldwide.

Weather-App
A simple, fast, and feature-rich web application that provides real-time current weather conditions and a 5-day forecast for any location worldwide.

Built by: Farhan Siddiqui

Features
Current Weather: Displays the city name, country, temperature ("Feels Like" included), weather condition, humidity, and wind speed.

5-Day Forecast: Provides a multi-day outlook with daily average temperatures and weather details.

Dynamic UI: Uses pure JavaScript, HTML, and CSS for a clean, responsive interface.

Robust Error Handling: Alerts the user when an invalid city is entered or if there is an issue fetching data.

Technologies Used
HTML5 (Structure)

CSS3 (Styling)

JavaScript (ES6+) (Logic and API calls)

 (Default Weather Data Source)

Getting Started
Follow these steps to get a local copy of the project up and running.

Prerequisites
You must have a valid API Key from  (or the alternative API mentioned below).

Installation
Clone the repository:

Set up the API Key:

Open the main JavaScript file (script.js).

Replace the placeholder value with your actual API key on the first line:

Run the application:

Open the index.html file in your web browser.

Switching the API (If Forecast Fails)
If you encounter issues getting the 5-day forecast data with the default API, you may need to switch to an alternative.

A highly recommended alternative with a generous free tier that supports 5-day forecasts is OpenWeatherMap.

Steps to Switch to OpenWeatherMap
Get a Key: Sign up for a free account at  to get your new API key.

Update script.js: You will need to rewrite the API fetch logic in script.js to use the OpenWeatherMap endpoint and structure the data according to their response format.

Old WeatherAPI Endpoint (Example):

OpenWeatherMap Endpoint (5-day/3-hour forecast):

OpenWeatherMap uses one endpoint for 5-day forecasts, but the forecast data is in 3-hour intervals, which you would need to process into daily averages.

Crucially, you must update the data parsing: Lines 15-22 and 38-56 in your current script.js will need to be changed to match the property names (res.data.location.name, res.data.current.temp_c, etc.) provided by the new OpenWeatherMap API response.

Contribution
Contributions are welcome! If you have suggestions for new features or improvements:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add new feature X').

Push to the branch (git push origin feature/your-feature).

Open a Pull Request.

Contact:
Builder: Farhan Siddiqui

GitHub Profile: [https://github.com/fsid908]

Linked-in Profile: [https://www.linkedin.com/in/farhan-siddiqui-279136319]

Email: [fsid738@gmail.com]

Lucknow, Uttar Pradesh, India
