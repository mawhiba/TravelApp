//Getting latitude and longitude
const getLocation = async (cityName) => {
  const geoNamesURL = "http://api.geonames.org/searchJSON?formatted=true&q=";
  const geoNamesUserName = "maj89";
  const geoNamesEndPoint = geoNamesURL + cityName + "&username=" + geoNamesUserName;
  console.log(geoNamesEndPoint);
  const location = {};
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

//Getting weather info
const getWeatherInfo = async (lat, lon, days) => {
  const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?days=" + days;
  const weatherbitKey = "a3b7825b1b094fa38bf650a9e10c84a9";
  const weatherEndPoint = weatherbitURL + "&lat=" + lat + "&lon=" + lon + "&key=" + weatherbitKey;
  console.log(weatherEndPoint);
  const response = await fetch(weatherEndPoint);
  try {
    const jsonObject = await response.json();
    console.log(jsonObject);
    return jsonObject;
  } catch (error) {
    console.log(error);
  }
};

//Getting image for the city
const getCityImage = async (name, countryName) => {
  const pixabayURL = "https://pixabay.com/api/?key=";
  const pixabayKey = "19902110-9401cc6104f56ea687a53c5df";
  let pixaBayEndPoint = pixabayURL + pixabayKey + "&q=" + name + "&image_type=photo&category=places";
  
  try {
    let response = await fetch(pixaBayEndPoint);
    let jsonObject = await response.json();

    if(jsonObject.hits == 0) {
        pixaBayEndPoint = pixabayURL + pixabayKey + "&q=" + countryName + "&image_type=photo&category=places";
        response = await fetch(pixaBayEndPoint);
        jsonObject = await response.json();
    }
    console.log(jsonObject);
    return jsonObject;
  } catch (error) {
    console.log(error);
  }
};

const getTheDifference = (fromDate, toDate) => {
  const startDate = Date.parse(fromDate);
  const endDate = Date.parse(toDate);
  const milliSecendsPerDay = 1000 * 60 * 60 * 24;
  const difference = Math.ceil((endDate - startDate) / milliSecendsPerDay);

  return difference;
};

export { getLocation, getWeatherInfo, getCityImage, getTheDifference };

/* Function to GET Web API Data*/
// const getTemp = async (baseURL, zip, key) => {
//     const res = await fetch(baseURL+zip+key);
//     try {
//         const data = await res.json();
//         console.log('Data after calling API :')
//         console.log(data);
//         return data;
//     } catch(error) {
//         console.log('error', error);
//     }
// }

/* Function to GET Project Data */
// const updateUI = async() => {
//     const request = await fetch('/all');
//     try {
//         const allData = await request.json();
//         console.log('All data is :');
//         console.log(allData);
//         document.getElementById('date').innerHTML = allData.theDate;
//         document.getElementById('temp').innerHTML = allData.theTemp;
//         document.getElementById('content').innerHTML = allData.theFeeling;
//     } catch(error) {
//         console.log('Error', error);
//     }
// }
