import {
  getLocation,
  getWeatherInfo,
  getCityImage,
  getTheDifference,
} from "./application.js";

//Async function
const postData = async (url = "", data = {}) => {
  try {
    console.log("hello from postData");
    console.log(data);
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * @description Get the stored information about the trip from the server and display them to the user
 */
const updateUI = async () => {
  const request = await fetch("http://localhost:8081/all");
  try {
    const response = await request.json();
    console.log(response);
    let location = response;
    console.log(response);

    //Displaying the trip information to the user
    let img = document.getElementById("city_image");
    img.setAttribute("src", location.image);
    img.setAttribute("width", "200");
    img.setAttribute("height", "200");
    document.getElementById("title").innerHTML =
      "Your trip to: " + location.cityName + ", " + location.countryName;
    document.getElementById("departing").innerHTML =
      "Departing: " + location.dateFrom;
    document.getElementById("tripDuration").innerHTML =
      "Trip duration: " + location.tripDuration;
    document.getElementById("text").style.display = "block";
    document.getElementById("temp").innerHTML =
      "High " + location.highTemp + ",  Low " + location.lowTemp;
    document.getElementById("weather_desc").innerHTML =
      location.weatherDescription;
  } catch (error) {
    console.log("Error", error);
  }
};

/**
 * @description This function is used to call all the imported function that call the external API's
 */
const handleSubmit = async (event) => {
  event.preventDefault();

  // Getting the user inputs
  let cityName = document.getElementById("name").value;
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const dateFrom = document.getElementById("from").value;
  const dateTo = document.getElementById("to").value;

  let location = {};

  var isNameValid = Client.checkForName(cityName);
  // var isDateFromValid = Client.checkForDates(dateFrom);
  // var isDateToValid = Client.checkForDates(dateFrom);

  // if (!isNameValid || isDateFromValid !== null || isDateToValid !== null) {
  if (!isNameValid) {
    alert("Please fill all fields");
  } else {
    try {
      //Calling the geoNames API to git the longitude and latitude:
      location = await getLocation(cityName);
      location.cityName = cityName;
      location.dateFrom = dateFrom;
      location.dateTo = dateTo;

      //Get the date difference:
      const tripDuration = getTheDifference(dateFrom, dateTo);
      const currentDate = new Date();
      const daysRemaining = getTheDifference(currentDate, dateFrom);
      location.tripDuration = tripDuration;

      //Calling the Weatherbit API to get the weather info:
      if (daysRemaining <= 7) {
        const weatherInfo = await getWeatherInfo(
          location.latitude,
          location.longitude,
          1
        );
        console.log(weatherInfo);
        location.weatherDescription = weatherInfo.data[0].weather.description;
        location.highTemp = weatherInfo.data[0].high_temp;
        location.lowTemp = weatherInfo.data[0].low_temp;
        console.log(location);
      } else {
        const weatherInfo = await getWeatherInfo(
          location.latitude,
          location.longitude,
          daysRemaining
        );
        console.log(weatherInfo);
        location.weatherDescription = weatherInfo.data[0].weather.description;
        location.highTemp = weatherInfo.data[0].high_temp;
        location.lowTemp = weatherInfo.data[0].low_temp;
        console.log(location);
      }

      //Calling the Pixabay API to get the image:
      const cityImage = await getCityImage(cityName, location.countryName);
      location.image = cityImage.hits[0].webformatURL;

      //Post trip info to the server:
      console.log("Location object : " + JSON.stringify(location));
      postData("http://localhost:8081/postInfo", location).then(function () {
        updateUI();
      });
    } catch (err) {
      alert("Sorry. There was an error in submitting your input\n" + err);
    }
  }
};

export { handleSubmit };
