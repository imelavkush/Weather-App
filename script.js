const apiKey = "df776a7074e5c040caffe65a3028f53c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherCard = document.querySelector(".weather-card");

async function getWeather(city) {
    try {
        const response = await fetch(apiUrl + encodeURIComponent(city + ",IN") + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".description").innerText = data.weather[0].description;

        document.querySelector(".feels").innerText = Math.round(data.main.feels_like) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + " m/s";
        document.querySelector(".pressure").innerText = data.main.pressure + " hPa";

        weatherCard.classList.remove("hidden");
    } catch (error) {
        alert("City not found or error fetching data.");
    }
}

// Button click search
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        getWeather(city);
    }
});

// Load default city
window.addEventListener("load", () => {
    getWeather("New Delhi");
});
