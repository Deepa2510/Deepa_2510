// script.js

document.getElementById("searchButton").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found. Please try again.");
                return;
            }
            
            displayWeather(data);
        })
        .catch(error => {
            alert("Error fetching data. Please try again later.");
            console.error(error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");

    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${weatherDescription}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;

    weatherInfo.style.display = "block";
}
