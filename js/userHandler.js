let bcrypt = require('bcrypt');

function getUserFromJSON(userInfo){
  let userData = [];
  fetch("../json/users.json")
    .then(response => response.json())
    .then(json => {
      for(let index = 0; index < json.length; index++) {
        let userList = json[index];
        for (let user in userList) {
          let userName = userList[user];
          if(userName === userInfo){
            for (let index = 0; index < user.length; index++) {
              userData[index] = user[index];
            }
          }
        }
      }
    });
  return userData;
}

function addUserToJson(userInfo){
  fetch("../json/users.json")
    .then(response => response.json())
    .then(json => {
      for(let index = 0; index < json.length; index++) {
        let userList = json[index];
        for (let user in userList) {
          //add new user
        }
      }
    });
}

function createUser(rate, rank, firstName, lastName, pin){
  //Create initial user with general information then pass it to a JSON to await review from user with auth lvl 0
  if(getUserFromJSON(firstName)[0] === null){
    //User does not exist, continue registration

  }else{
    //User exists promp password reset
  }
}
