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

//Получение информации о пользователе
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } 
})