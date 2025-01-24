document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const city = document.getElementById('city-input').value.trim();
    const weatherContainer = document.getElementById('weather-container');
    const errorMessage = document.getElementById('error-message');
  
    weatherContainer.innerHTML = '';
    errorMessage.textContent = '';
  
    if (!city) {
      errorMessage.textContent = 'Please enter a city name.';
      return;
    }
  
    const apiKey = 'YOUR_API_KEY_HERE'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found. Please check the city name and try again.');
        }
        return response.json();
      })
      .then(data => {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        weatherCard.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        `;
        weatherContainer.appendChild(weatherCard);
      })
      .catch(error => {
        errorMessage.textContent = `Error: ${error.message}`;
      });
  });
  
