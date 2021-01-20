import {
  getLocation,
  getWeatherInfo,
  getCityImage,
  getTheDifference,
} from "./application.js";

//Async function
const postData = async (url = "", data = {}) => {
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
  console.log("After fetching");
  try {
    const tripData = await response.json();
    console.log("trip data");
    console.log(tripData);
    return tripData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log("All data is :");
    console.log(allData);
    document.getElementById("results").innerHTML = JSON.stringify(allData);

    //results:
    // let img = document.getElementById("city_image");
    // img.setAttribute('src',location.image);
    // img.setAttribute('width', '200');
    // img.setAttribute('height', '200');
    // let saveBtn = document.createElement('button');
    // let cancelBtn = document.createElement('button');
    // saveBtn.textContent = 'Save';
    // cancelBtn.textContent = 'Cancel';
    // let results = document.getElementById('results');
    // results.appendChild(saveBtn);
    // results.appendChild(cancelBtn);
  } catch (error) {
    console.log("Error", error);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  // check what text was put into the form field
  let cityName = document.getElementById("name").value;
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const dateFrom = document.getElementById("from").value;
  const dateTo = document.getElementById("to").value;
  let location = {};

  var isInputValid = Client.checkForName(cityName);

  if (!isInputValid) {
    alert("Please enter a city name");
  } else {
    try {
      //Calling the geoNames API to git the longitude and latitude:
      location = await getLocation(cityName);

      //Get the date difference:
      const tripDuration = getTheDifference(dateFrom, dateTo);
      const currentDate = new Date();
      const daysRemaining = getTheDifference(currentDate, dateFrom);

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

      //Post trip info:
      console.log("Location object : " + JSON.stringify(location));
      postData("http://localhost:8081/postInfo", location);
      // .then(
      //   function() {updateUI()}
      // );

      //results:
      let img = document.getElementById("city_image");
      img.setAttribute("src", location.image);
      img.setAttribute("width", "200");
      img.setAttribute("height", "200");
      document.getElementById("title").innerHTML =
        "Your trip to: " + cityName + ", " + location.countryName;
      document.getElementById("departing").innerHTML = "Departing: " + dateFrom;
      document.getElementById("tripDuration").innerHTML =
        "Trip duration: " + tripDuration;
      document.getElementById("text").style.display = "block";
      document.getElementById("temp").innerHTML =
        "High " + location.highTemp + ",  Low " + location.lowTemp;
      document.getElementById("weather_desc").innerHTML =
        location.weatherDescription;

      // let saveBtn = document.createElement('button');
      // let cancelBtn = document.createElement('button');
      // saveBtn.textContent = 'Save';
      // cancelBtn.textContent = 'Cancel';
      // let results = document.getElementById('results');
      // results.appendChild(saveBtn);
      // results.appendChild(cancelBtn);

      // console.log("::: Form Submitted :::");
      // fetch("http://localhost:8081/test?text=" + cityName)
      //   .then((res) => res.json())
      //   .then(function (data) {
      //     console.log(data);
      //     document.getElementById(
      //       "results"
      //     ).innerHTML = `${data.sentence_list[0].text} , Agreement: ${data.agreement} , Confidence : ${data.confidence} , score_tag : ${data.sentence_list[0].score_tag} `;
      //   });
    } catch (err) {
      alert("Sorry. There was an error in submitting your input\n" + err);
    }
  }
};

//Getting latitude and longitude
// function getLocation(cityName) {
//   const geoNamesURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
//   const geoNamesUserName = 'maj89';
//   const endPoint = geoNamesURL + cityName + '$username=' + geoNamesUserName;
//   const location = {};
//   try {
//     const response = fetch(endPoint);
//     if(response.ok) {
//       const jsonObject = response.json();
//       location.latitude = jsonObject.geonames[0].lat;
//       location.longitude = jsonObject.geonames[0].lng;

//       return location;
//     }

//   } catch(error) {
//     console.log(error);
//   }
// }

//Getting weather info
// function getWeatherInfo(lat, lon) {
//   const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
//   const weatherbitKey = 'a3b7825b1b094fa38bf650a9e10c84a9';
//   const endPoint = weatherbitURL + 'lat=' + lat + '&lon=' + lon + '&key=' + weatherbitKey;

//   try {
//     const response = fetch(endPoint);
//     if(response.ok) {
//       const jsonObject = response.json();
//       console(jsonObject);

//       return jsonObject;
//     }
//   } catch(error) {
//       console.log(error);
//   }

// }

//Getting image for the city
// function getCityImage(name) {
//   const pixabayURL = 'https://pixabay.com/api/?key=19902110-9401cc6104f56ea687a53c5df&q=yellow+flowers&image_type=photo';
//   const pixabayKey = '19902110-9401cc6104f56ea687a53c5df';
//   const endPoint = pixabayURL + pixabayKey + '&q=' + name + '&image_type=photo';
// }

export { handleSubmit };
