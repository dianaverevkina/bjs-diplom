'use strict';
//Выход из личного кабинета 
const logoutBtn = new LogoutButton();
logoutBtn.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
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

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getCurrentStocks() {
  ApiConnector.getStocks(response => {
  if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data)
  } 
})
}
getCurrentStocks();
// setInterval(getCurrentStocks, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Ваш баланс успешно пополнен');
    } else {
      moneyManager.setMessage(response.success, 'Извините, Ваш баланс не удалось пополнить');
    }
  })
};

// Kонвертирование валюты
moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Конвертация прошла успешно');
    } else {
      moneyManager.setMessage(response.success, 'Извините, не удалось выполнить конвертацию');
    }
  })
}

//Перевод валюты
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    let getter = Object.entries(favoritesList).find(person => +person[0] === data.to)[1];
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, `Перевод ${data.amount} ${data.currency} ${getter} успешно выполнен`);
    } else {
      moneyManager.setMessage(response.success, `Не удалось выполнить перевод ${data.amount} ${data.currency} ${getter}`);
    }
  })
}


//Работа с избранным
const favoritesWidget = new FavoritesWidget();

//Hачальный список избранного
let favoritesList;
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesList = response.data;
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager. updateUsersList(response.data);
  } 
})

//Добавление пользователя в список избранных
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager. updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, `Пользователь ${data.name} добавлен в список избранных`);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager. updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, `Пользователь удален из списка избранных`);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}