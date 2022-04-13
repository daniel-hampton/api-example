/** this version would print Hello World before the todo */
function main() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => console.log(response.json()))
    .catch((error) => console.error(error))

  console.log("Hello world");
}

/** this version would print Hello World after the todo */
async function main1() {
  // Await tells the program to pause within this function, until the promise
  // resolves before continuing on within this function. Outside of this function,
  // code can still run.
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/2')
    // This line of code will only execute if the promise is resolved.
    console.log(response.json())
  } catch (err) {
    // This block will execute only if the promise is rejected.
    console.log(err)
  }

  console.log("main 1");
}
/** this version would print Hello World after the todo */
async function main2() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/3')
  console.log(response.json())

  console.log("main 2");
}
/** this version would print Hello World after the todo */
async function main3() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/4')
  console.log(response.json())

  console.log("main 3");
}


// main();
// main1();
// main2();
// main3();


function getForecast() {
  fetch('https://api.weather.gov/gridpoints/TOP/31,80/forecast')
    .then(response => response.json())
    .then(json => {
      // just for exploring
      console.log("response", json);
      console.log("body", json.body); // not on json object, only on response object
      console.log("status", json.status) // not on json object, only on response object
      // import part
      const forecast = json;

      console.log("forcast", forecast)

      const todaysForecast = forecast.properties.periods[0]
      console.log("today", todaysForecast)

      const shortForecast = todaysForecast.shortForecast
      console.log("description: ", shortForecast)
      console.log("long forecast", todaysForecast.detailedForecast)

      const myDiv = document.querySelector('#api-spot')
     
      const newImage = document.createElement("img")
      newImage.src = todaysForecast.icon
      newImage.alt = "todays weather"

      const newForecast = document.createElement("p")
      newForecast.innerText = shortForecast


      myDiv.appendChild(newImage)
      myDiv.appendChild(newForecast)

    })
    .catch((error) => console.error(error))
}

getForecast();
