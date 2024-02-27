elements.map(({tag, ...props}) => document.body.appendChild(Object.assign(document.createElement(tag), props))); // Створення елементів вебсторінки в масиві elements та додавання їх до сторінки

console.log(itemArray)


// Отримання посилання на таблицю
const table = document.getElementById('table');

// Створення заголовка таблиці
const headerRow = table.insertRow();
['tournament', 'name', 'price', 'quantity', 'total', 'spend on buy', 'total spend', 'total profit'].forEach(colName => {
  const th = document.createElement('th');
  th.textContent = colName;
  headerRow.appendChild(th);
});

// Функція для заповнення таблиці даними з JSON
function populateTable(data) {
  data.forEach((item, index) => {
    const row = table.insertRow();
    Object.values(item).forEach(value => {
      const cell = row.insertCell();
      cell.textContent = value;
      cell.id = `${Object.keys(item)[0]}${index}`; // Генеруємо унікальний айді для клітинки
    });
  });
}

// Приклад JSON даних
const jsonData = [
  {tournament: 'T1', name: 'Item1', price: '$10', quantity: 5, total: '$50', spendOnBuy: '$30', totalSpend: '$60', totalProfit: '$20'},
  {tournament: 'T2', name: 'Item2', price: '$20', quantity: 3, total: '$60', spendOnBuy: '$25', totalSpend: '$65', totalProfit: '$35'},
  // Додаткові дані можна додати за потреби
];
//
// // Заповнюємо таблицю даними з JSON
// populateTable(jsonData);

fetch('./assets/json/26.02.2024__21_17.json')
  .then(response => response.json())
  .then(data => populateTable(data))
  .catch(error => console.error('Error fetching JSON:', error));

// const jsonData = require('../assets/json/26.02.2024__21_17.json');
populateTable(jsonData);