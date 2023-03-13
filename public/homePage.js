'use strict';
//Выход из личного кабинета 
let logoutBtn = new LogoutButton();
logoutBtn.action = () => {
  ApiConnector.logout(response => {
    console.log(response);
    if (response.success) {
      console.log(response.success);
      location.reload();
    } 
  })
};

//