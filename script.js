//Take all the DOM elements we need
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_confirmation = document.getElementById("password_confirmation");

//Functions
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
function validateEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid.");
  }
}

//Function to check required fields
function checkRequired(myArr) {
  myArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

//Function to check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords do not match.");
  }
}
//Function getFieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Function Checklength
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} does not meet required length`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} has exceeded required length`);
  } else {
    showSuccess(input);
  }
}

//Add event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password_confirmation]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 15);
  validateEmail(email);
  checkPasswordMatch(password, password_confirmation);
});
