$(document).ready(() => {
  const apiKey = "33f3676a719069fdfef3fee0bb88c451";

  $("#weather-form").submit(function(event) {
      event.preventDefault();

      const city = $("#city-input").val().trim();
      const weatherContainer = $("#weather-container");
      const errorMessage = $("#error-message");

      weatherContainer.html("");
      errorMessage.text("");

      if (!city) {
          errorMessage.text("Please enter a city name.");
          return;
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      $.getJSON(apiUrl)
          .done((data) => {
              weatherContainer.html(`
                  <div class="weather-card">
                      <h2>${data.name}, ${data.sys.country}</h2>
                      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                  </div>
              `);
          })
          .fail(() => {
              errorMessage.text("City not found. Please check the city name and try again.");
          });
  });
});


  
