// To do:
// Find an international weather API - DONE
// Read documentation and create API call - DONE
// Add basic forecast to index.html - DONE
// Figure out how to select a forecast by location (read https://openweathermap.org/api/geocoding-api) - DONE
// Create a form for user to select their chosen location's forecast
// Figure out how to let user see and choose options for their city (e.g. which 'London' do they mean)?
// Use flexbox and CSS to improve page layout
// Add dynamic page background, selected by keywords in shortForecast

function getLocation() {
  // TO DO: move city name to a parameter of this function
  return (
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=886b4d9fa52f373586e1ac5a100c5cf1')
      .then(response => response.json())
      .then(json => {
        const locations = json;
        console.log('Locations: ', locations);
        // return the lat and lon of the first location in locations array
        const latLon = [locations[0].lat, locations[0].lon];
        return latLon;
      })
      .then(latLon => {
        const [lat, lon] = latLon;
        return getForecast(lat, lon);
      })
      .catch((error) => console.error(error))
      );
}

function getForecast(lat, lon) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=886b4d9fa52f373586e1ac5a100c5cf1`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch((error) => console.error(error))
}

function main() {
  getLocation()
  .then(response => {
      const forecast = response;

      console.log("forecast object: ", forecast)

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
  .catch(error => console.error(error));
}

main();
