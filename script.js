async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'c3f6a7e09a90d5a4e21c11f27750ef3b';
    const weatherDataDiv = document.getElementById('weatherData');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherInfo = document.querySelector('.weather-info');
  
    if (!city) {
      weatherDataDiv.innerHTML = "Please enter a city.";
      return;
    }
  
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
  
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
  
      // Animate icon out
      weatherInfo.classList.remove('animate-info');
      weatherInfo.classList.add('animate-icon');
  
      // Wait for animation to finish before changing content
      await new Promise(resolve => setTimeout(resolve, 500));
  
      weatherDataDiv.innerHTML = `
        <h3>${city}</h3>
        <p>${temp}°C, ${description}</p>
      `;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
      // Animate info in
      weatherInfo.classList.remove('animate-icon');
      weatherInfo.classList.add('animate-info');
  
    } catch (error) {
      weatherDataDiv.innerHTML = "City not found.";
      weatherIcon.src = "assets/cloud_icon.png";
    }
  }
  