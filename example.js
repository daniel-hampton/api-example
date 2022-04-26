// without async/await syntax
function getLocation() {
  // later you can move the city name to a paramter of this function.
  return (
    fetch(
      'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&APPID=886b4d9fa52f373586e1ac5a100c5cf1'
    )
      .then(response => response.json())
      .then(json => {
        console.log('getLocation:', json);

        const locations = json;
        const latLon = [locations[0].lat, locations[0].lon];
        return latLon; // this return value go into the next .then callback.
      })
      // This is the part where you chain the results of one promise based function into another.
      .then(latLon => {
        const [lat, lon] = latLon;
        // Here we have to call getForecast within a .then() callback of getLocation,
        // because we need to ensure it executes after getLocation resolves.
        // Notice how this begins to nest function calls more and more. You may here this refered to as "callback hell" 🤣
        return getForecast(lat, lon);
      })
  );
}

function getForecast(lat, lon) {
  // notice the return
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=886b4d9fa52f373586e1ac5a100c5cf1`
  )
    .then(response => response.json())
    .then(json => {
      // notice another return so we can use the result later.
      return json;
    })
    .catch(error => console.error(error));
}

// This is just to organize or contain our main app logic.
function main() {
  getLocation()
    // we can now access the forecast because of the chain of returns and promises
    .then(forecast => {
      console.log('forecast', forecast);
      console.log(
        'first weather report: 🌦️',
        forecast.list[0].weather[0].description
      );
    })
    .catch(error => console.error(error));
}

// actionally running the main function, when this file loads in this case.
main();

// ASYNC / AWAIT VERSION
/** Here's the async/await syntax version that makes the above easier to read */

async function getLocationAsync() {
  // await keyword tells us to stop and wait for the fetch promise to resolve before continuing. No need to use a .then callback
  const response = await fetch(
    'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&APPID=886b4d9fa52f373586e1ac5a100c5cf1'
  );
  const json = await response.json();
  console.log('ASYNC_AWAIT getLocation:', json);
  const location = json;
  const latLon = [location[0].lat, location[0].lon];
  return latLon; // this return value can be used elsewhere.
}

async function getForecastAsync(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=886b4d9fa52f373586e1ac5a100c5cf1`
  );
  const json = await response.json();
  const forecast = json; // just for readability
  return forecast;
}

// Organize our two functions in another function. This one just calls the other two, prints some logs
async function mainAsync() {
  // we can await our getLocationAsync since it returns a promise (all async functions by definition return a promise)
  // we pass the returned values to our next function, just like "normal" synchronous code.
  const latlon = await getLocationAsync();
  const [lat, lon] = latlon;  // this could be done in the same line as 80, but it's okay to use multiple lines for readability.
  const forecast = await getForecastAsync(lat, lon);

  console.log('ASYNC_AWAIT forecast:', forecast);
  console.log(
    'ASYNC_AWAIT first weather report: 🌦️',
    forecast.list[0].weather[0].description
  );
}

// We call the async/await version to run it.
mainAsync();
