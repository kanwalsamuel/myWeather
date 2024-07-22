const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener("click", () => {
    const APIkey = "6c460940de6b0d8ffd2579d07ccf08b5";
    const city = document.querySelector(".search-box input").value;

    if (city === "") {
        alert('Please enter a location.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or invalid API request.');
            }
            return response.json();
        })
        .then(json => {
            const image = document.querySelector(".weather-box img");
            const cityName = document.querySelector(".weather-box .city-name");
            const temperature = document.querySelector(".weather-box .tempreture");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            if (json.weather[0].main === "Clear") {
                image.src = "images/clear.png";
            } else if (json.weather[0].main === "Rain") {
                image.src = "images/rain.jpeg";
            } else if (json.weather[0].main === "Mist") {
                image.src = "images/mist.jpeg";
            } else if (json.weather[0].main === "Snow") {
                image.src = "images/snow.jpeg";
            } else if (json.weather[0].main === "Haze") {
                image.src = "images/mist.jpeg";
            } else if (json.weather[0].main === "Clouds") {
                image.src = "images/cloud.png";
            } else {
                image.src = "images/front.png"; // Default image
            }

            cityName.innerHTML = city;
            temperature.innerHTML = `${json.main.temp}°C`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} km/h`;

            weatherBox.style.display = "block";
            weatherDetails.style.display = "flex";

            // Voice effect based on weather
            const synth = window.speechSynthesis;
            const utterThis = new SpeechSynthesisUtterance(`The weather in ${city} is ${json.weather[0].description} with a temperature of ${json.main.temp} degrees Celsius.`);
            synth.speak(utterThis);
        })
        .catch(err => {
            console.error("Error fetching weather data:", err);
            alert(`Error fetching weather data: ${err.message}`);
        });
});
