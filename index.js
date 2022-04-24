// To do:
// Find an international weather app - DONE
// Read documentation and create API call - DONE
// Add basic forecast to index.html - DONE
// Figure out how to select a forecast by location (read https://openweathermap.org/api/geocoding-api)
// Create a form for user to select their chosen location's forecast
// Use flexbox and CSS to improve page layout
// Add dynamic page background, selected by keywords in shortForecast


function getForecast() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=886b4d9fa52f373586e1ac5a100c5cf1')
    .then(response => response.json())
    .then(json => {

      // import part
      const forecast = json;

      console.log("forecast object: ", forecast)
      console.log("Short forecast: ", forecast.weather[0].description)
      console.log("Current temperature: ", forecast.main.temp,"°c")
      console.log("Feels like: ", forecast.main.feels_like,"°c")
      console.log("Current wind speed: ", forecast.wind.speed,"km/h")

      const shortForecast = forecast.weather[0].description
      const currentTemp = Math.round(forecast.main.temp)
      const feelsLike = Math.round(forecast.main.feels_like)
      const currentWindSpeed = Math.round(forecast.wind.speed)

      const myDiv = document.querySelector('#api-spot')

      const header = document.createElement("h1")
      header.innerText = `Current weather in [location TBA]:`

      const newForecast = document.createElement("p")
      newForecast.innerText = `Quick description: ${shortForecast}`

      const newTemp = document.createElement("p")
      newTemp.innerText = `Current temperature: ${currentTemp} °c`

      const newFeelsLike = document.createElement("p")
      newFeelsLike.innerText = `Feels like: ${feelsLike} °c`

      const newWindSpeed = document.createElement("p")
      newWindSpeed.innerText = `Current windspeed: ${currentWindSpeed} km/h`

      myDiv.appendChild(header)
      myDiv.appendChild(newForecast)
      myDiv.appendChild(newTemp)
      myDiv.appendChild(newFeelsLike)
      myDiv.appendChild(newWindSpeed)

    })
    .catch((error) => console.error(error))
}

getForecast();


