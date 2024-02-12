
let pin = ["","","",""];
let index = 0;

/*let mysql = require('mysql');*/
const saltRounds = 10;
let pinDigit = document.getElementsByClassName('pin-digit');

function focused(id) {
  getView(id).focus();
}

function resetPin(){
  //resets the pin
  pin = ["","","",""]
  index = 0;
  for (let index = 0; index < pinDigit.length; index++) {
    pinDigit[index].children[0].innerHTML = pin[index];
    pinDigit[index].children[0].classList.remove('hidden-pin');
    pinDigit[index].children[0].classList.remove('fade-in');
    pinDigit[index].classList.remove('focused');
  }
  getView('loginError').classList.remove('fade-in');
  getView('loginError').classList.add('fade-out');
  for (let El of pinDigit) {
    El.classList.remove('clear-error');
  }
  pinDigit[0].classList.add('focused');
}

function decrementPin(){
  //removes pin at index, then decrement index
  pinDigit[index].classList.remove('focused');
  /*pin[index]=0;*/
  index--;
  if(index < 0){
    index=0;
  }
  pinDigit[index].children[0].classList.remove('hidden-pin');
  pinDigit[index].children[0].classList.remove('fade-in');
  pinDigit[index].children[0].classList.add('fade-out');
  pinDigit[index].classList.add('focused');
}

function incrementPin(pinNum){
  console.log("Pin length: " + pin.length)
  index++ === pin.length ? index = pin.length : index;
  pin[index-1] = pinNum;
  pinDigit[index-1].classList.remove('focused');
  if(index === pin.length){
    validateUser();
  }else{
    pinDigit[index].classList.add('focused');
  }

  pinDigit[index-1].children[0].classList.add('fade-out');
  pinDigit[index-1].children[0].classList.remove('fade-out');
  pinDigit[index-1].children[0].classList.add('fade-in');
  pinDigit[index-1].children[0].classList.add('hidden-pin');
  //add pin at index, then increment index
}

function validateUser(){
  //Pull hashed and slated pass from MySQL DB using PHP, then use Bcrypt to verify pin
  //Concatenate user pin as String pass and store it.
  let pass = pin.join("");
  //Pull passwords from DB, and loop check verification.
  console.log("pass: " + pass)
  let hash;
  if(pass === "8199"){
    resetPin();
    switchView(views.home);
    getView('home-view-header').children[1].innerHTML = 'FCA3 Babcock';
  }else if(pass === "0000") {
    resetPin();
    switchView(views.signUp);
  }else{
    switchView(views.loading);
    invalidPin();
  }

  /*bcrypt().compare(pass, hash, function(err, result) {
    if(result){
      // result == true
      resetPin();
      switchView(views.home);
    }
  });*/
}

function invalidPin(){
  resetPin();
  for (let El of pinDigit) {
    El.classList.add('clear-error');
  }
  switchView(views.signIn);
  getView('pin').classList.add('shake');
  setTimeout(() => {
    getView('pin').classList.remove('shake');
  }, 1500);
  getView('loginError').classList.remove('fade-out');
  getView('loginError').classList.add('fade-in');
}

function createAccount(userName, pin){
  //Use Bcrypt to salt and hash users pin, then save to DB with php and MySQL
  let saltCount = 10;

}
