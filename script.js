// script.js

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '13bd76c72eb560bf85bf54ba7e50c9bd'; // Replace with your OpenWeatherMap API key
    const fetchWeatherButton = document.getElementById('fetchWeatherButton');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.querySelector('.weather-info');
    const locationName = document.getElementById('locationName');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const feelsLike = document.getElementById('feelsLike');
    const pressure = document.getElementById('pressure');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');

    fetchWeatherButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        }
    });

    function fetchWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                    setWeatherBackground(data.weather[0].main.toLowerCase());
                } else {
                    alert('Location not found!');
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeather(data) {
        weatherInfo.classList.remove('hidden');
        locationName.textContent = `${data.name}, ${data.sys.country}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temperature.textContent = `Temperature: ${data.main.temp} °C`;
        conditions.textContent = `Conditions: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        feelsLike.textContent = `Feels Like: ${data.main.feels_like} °C`;
        pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
        sunrise.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
        sunset.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    }

    function setWeatherBackground(condition) {
        let backgroundUrl = '';

        switch (condition) {
            case 'clear':
                backgroundUrl = 'https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=';
                break;
            case 'clouds':
                case 'scattered clouds':
                backgroundUrl = 'https://images.unsplash.com/photo-1611928482473-7b27d24eab80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D';
                break;
            case 'rain':
            case 'drizzle':
                backgroundUrl = 'https://wallpapers.com/images/featured/rain-desktop-llmyo7uctnbg63uz.jpg';
                break;
            case 'snow':
                backgroundUrl = 'https://cdn.pixabay.com/photo/2018/03/23/17/32/snow-3254341_640.jpg';
                break;
            case 'haze':
                backgroundUrl = 'https://eoimages.gsfc.nasa.gov/images/imagerecords/145000/145827/globeindiasmog_lrg.jpg';
                break; 
            case 'mist':
                backgroundUrl = 'https://motionarray.imgix.net/preview-179147-YLf7f83OFg-high_0009.jpg?w=660&q=60&fit=max&auto=format';       
                break;
            default:
                backgroundUrl = 'https://t4.ftcdn.net/jpg/02/66/38/15/360_F_266381525_alVrbw15u5EjhIpoqqa1eI5ghSf7hpz7.jpg';
                break;
        }

        document.body.style.backgroundImage = `url(${backgroundUrl})`;
    }
});
