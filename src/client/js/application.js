/**
 * @description get the latitude and longitude
 * @param {string} cityName
 * @returns {object} contains latitude, longitude and country name
 */
const getLocation = async (cityName) => {
  const geoNamesURL = "http://api.geonames.org/searchJSON?formatted=true&q=";
  const geoNamesUserName = "maj89";
  const geoNamesEndPoint =
    geoNamesURL + cityName + "&username=" + geoNamesUserName;
  console.log(geoNamesEndPoint);
  const location = {};

  //Calling Geonames API using city name parameters
  const response = await fetch(geoNamesEndPoint);
  try {
    const jsonObject = await response.json();
    console.log(jsonObject);
    location.latitude = jsonObject.geonames[0].lat;
    location.longitude = jsonObject.geonames[0].lng;
    location.countryName = jsonObject.geonames[0].countryName;
    console.log(location);
    return location;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description get the weather information
 * @param {number} lat the latitude
 * @param {number} lon the longitude
 * @returns {object} json object contains all the information about the weather
 */
const getWeatherInfo = async (lat, lon, days) => {
  const weatherbitURL =
    "https://api.weatherbit.io/v2.0/forecast/daily?days=" + days;
  const weatherbitKey = "a3b7825b1b094fa38bf650a9e10c84a9";
  const weatherEndPoint =
    weatherbitURL + "&lat=" + lat + "&lon=" + lon + "&key=" + weatherbitKey;
  console.log(weatherEndPoint);

  //Calling WeatherBit API using latitude and longitude parameters
  const response = await fetch(weatherEndPoint);
  try {
    const jsonObject = await response.json();
    console.log(jsonObject);
    return jsonObject;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description get an image of the city, and an image for the country when the entered location brings up no results
 * @param {string} name the name of the city
 * @param {string} countryName the country name
 * @returns {object} json object contains all the information about the image
 */
const getCityImage = async (name, countryName) => {
  const pixabayURL = "https://pixabay.com/api/?key=";
  const pixabayKey = "19902110-9401cc6104f56ea687a53c5df";
  let pixaBayEndPoint =
    pixabayURL +
    pixabayKey +
    "&q=" +
    name +
    "&image_type=photo&category=places";

  try {
    //Calling the PixaBay API to get the image for the city name
    let response = await fetch(pixaBayEndPoint);
    let jsonObject = await response.json();

    if (jsonObject.hits == 0) {
      pixaBayEndPoint =
        pixabayURL +
        pixabayKey +
        "&q=" +
        countryName +
        "&image_type=photo&category=places";
      response = await fetch(pixaBayEndPoint);
      jsonObject = await response.json();
    }
    console.log(jsonObject);
    return jsonObject;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description get the trip duration
 * @param {date} fromDate the departing date
 * @param {date} toDate the return date
 * @returns {number} trip duration as milliseconds
 */
const getTheDifference = (fromDate, toDate) => {
  const startDate = Date.parse(fromDate);
  const endDate = Date.parse(toDate);
  const milliSecendsPerDay = 1000 * 60 * 60 * 24;
  const difference = Math.ceil((endDate - startDate) / milliSecendsPerDay);

  return difference;
};

export { getLocation, getWeatherInfo, getCityImage, getTheDifference };
