# Travel App:

## Project Introduction:
This project is to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs

## Dependencies:
- In the terminal run `npm install` in order to install all dependencies.

## How to run the app?
- Use `npm run start` to run the server on port 8081.
- Use `npm run build-prod` to run the project in the production mode and to create the dist folder.
- Use `npm run build-dev` to run the project in the development mode.

## API used:
- Geonames API is used to obtain the latitude and longitude for the city name.
- Weatherbit API is used to get the weather information.
- Pixabay API is used to get an image for the city, and if there is no photo thers, it will bring a photo for the country.

## Note for the rivewer:
For extending the project I pull in an image for the country from Pixabay API when the entered location brings up no results

