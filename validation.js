//New User form elements
let userBtn = document.getElementById('userBtn')
let userForm = document.getElementById('userForm')
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let password = document.getElementById('password')
//New Schedule form elements
let schForm = document.getElementById('schForm')
let schBtn = document.getElementById('schBtn')

//Expressions

let eValid = /^[A-Za-z0-9\._\-]+@[A-Za-z]+[A-Za-z0-9\-]+[A-Za-z]+(\.[A-Za-z0-9\-]+)+$/;
let nValid =/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \.'\-]+$/;

//Functions
const validInput = (regex,input) => {
  return regex.test(input.value);
}

userForm.setAttribute("nonvalidate", true)

//userBtn.addEventListener('click',formValidation);