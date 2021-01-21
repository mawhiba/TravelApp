/**
 * @description Check input validation
 * @param {string} inputText city name
 * @returns {boolean} return true if the input is not null, and false if the input was null
 */
function checkForName(inputText) {
  var match = inputText.match(/[a-zA-Z]+/g);

  if (match == null) return false;

  console.log(match);

  if (match.length >= 1) {
    return true;
  } else {
    return false;
  }
}

/**
 * @description Check date validation
 * @param {date} date date
 * @returns {boolean} return true if the date is not null, and false if the date was null
 */
function checkForDates(date) {
  if (date === null) {
    return false;
  }
}

export { checkForName, checkForDates };
