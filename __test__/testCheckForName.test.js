import { checkForName, checkForDates } from "../src/client/js/nameChecker";
// const checkForName = require('../src/client/js/nameChecker');
// const Regex = require("regex");

test("check for input field in not empty", () => {
  const input = "";
  const result = checkForName(input);

  expect(result).toBeFalsy();
});

test("It will not accept a phone number", () => {
  const input = "0555555555";
  const result = checkForName(input);

  expect(result).toBeFalsy();
});

test("check for date field in not null", () => {
  const input = null;
  const result = checkForDates(input);

  expect(result).toBeFalsy();
});

// test("It will not accept a single word", () => {
//   const input = "Hi";
//   const result = checkForName(input);

//   expect(result).toBeFalsy();
// });

// test("It will not accept 2 words only", () => {
//   const input = "Hi there";
//   const result = checkForName(input);

//   expect(result).toBeFalsy();
// });

// test("It will accept 3 words sentences", () => {
//     const input = "I feel happy";
//     const result = checkForName(input);
  
//     expect(result).toBeTruthy();
//   });



// test("It will accept long sentences", () => {
//     const input = "The weather is very very nice today";
//     const result = checkForName(input);
  
//     expect(result).toBeTruthy();
//   });