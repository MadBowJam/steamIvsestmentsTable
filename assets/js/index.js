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

// Функція для генерації унікального ідентифікатора для стовбця
function generateColumnId(columnName, columnIndex) {
  return `${columnName.replace(/\s+/g, '_').toLowerCase()}${columnIndex}`;
}

// Функція для заповнення таблиці даними з itemArray
for (let i = 0; i < itemArray.length; i += 4) {
  const row = table.insertRow();
  const [tournament, name, quantity, spendOnBuy] = itemArray.slice(i, i + 4);
  
  const cellData = [tournament, name, '', quantity, '', spendOnBuy, '', ''];
  
  cellData.forEach((data, index) => {
    const cell = row.insertCell();
    cell.textContent = data;
    const columnName = index === 0 ? 'tournament' : index === 1 ? 'name' : index === 3 ? 'quantity' : index === 5 ? 'spend_on_buy' : index === 2 ? 'price' : index === 4 ? 'total' : index === 6 ? 'total_spend' : 'total_profit';
    cell.id = generateColumnId(columnName, i / 4 + 1);
    cell.classList.add(columnName.replace(/\s+/g, '-').toLowerCase());
  });
}




fetch('./assets/json/prices/27.02.2024__20_09.json')
  .then(response => response.json())
  .then(data => {
    // Отримання всіх клітинок стовбця "price"
    const priceCells = document.querySelectorAll('.price');
    
    // Заповнення кожної клітинки значеннями з JSON
    priceCells.forEach((cell, index) => {
      cell.textContent = data[index] || ''; // Якщо дані в JSON не визначені, залишаємо клітинку порожньою
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));



// // Приклад JSON даних
// const jsonData = [
//   {tournament: 'T1', name: 'Item1', price: '$10', quantity: 5, total: '$50', spendOnBuy: '$30', totalSpend: '$60', totalProfit: '$20'},
//   {tournament: 'T2', name: 'Item2', price: '$20', quantity: 3, total: '$60', spendOnBuy: '$25', totalSpend: '$65', totalProfit: '$35'},
//   // Додаткові дані можна додати за потреби
// ];
// //
// // // Заповнюємо таблицю даними з JSON
// // populateTable(jsonData);
//
// fetch('./assets/json/26.02.2024__21_17.json')
//   .then(response => response.json())
//   .then(data => populateTable(data))
//   .catch(error => console.error('Error fetching JSON:', error));
//
// // const jsonData = require('../assets/json/26.02.2024__21_17.json');
// populateTable(jsonData);



// Функція для заповнення стовбця "total" на основі значень кількості та ціни
function fillTotalColumn() {
  // Отримання всіх клітинок стовбців "quantity", "price" та "total"
  const quantityCells = document.querySelectorAll('.quantity');
  const priceCells = document.querySelectorAll('.price');
  const totalCells = document.querySelectorAll('.total');
  
  // Заповнення кожної клітинки стовбця "total" значенням добутку кількості та ціни
  quantityCells.forEach((quantityCell, index) => {
    const quantity = parseInt(quantityCell.textContent);
    const price = parseFloat(priceCells[index].textContent); // Заміна коми на крапку
    
    // Перевірка на коректність значень кількості та ціни
    if (!isNaN(quantity) && !isNaN(price)) {
      const total = quantity * price;
      totalCells[index].textContent = total.toFixed(2); // Форматування результату до двох знаків після коми
    } else {
      totalCells[index].textContent = ''; // Якщо дані некоректні, залишаємо клітинку порожньою
    }
  });
}

// Виклик функції для заповнення стовбця "total"
document.addEventListener('DOMContentLoaded', function() {
  // Виклик функції для заповнення стовбця "total" після завантаження сторінки
  fillTotalColumn();
});
