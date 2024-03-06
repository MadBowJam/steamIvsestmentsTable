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




fetch('./assets/json/06.03.2024__13_20.json')
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

function myFunction() {
  for (let i = 1; i <= (itemArray.length / 4); i++) {
    console.log(i)
    // console.log(document.getElementById(`price${i}`).innerHTML);
    // console.log(document.getElementById(`quantity${i}`).innerHTML);
    // console.log()
    document.getElementById(`total${i}`).innerHTML = (Number(document.getElementById(`price${i}`).innerHTML) * Number(document.getElementById(`quantity${i}`).innerHTML)).toFixed(2);
    document.getElementById(`total_spend${i}`).innerHTML = (Number(document.getElementById(`spend_on_buy${i}`).innerHTML) * Number(document.getElementById(`quantity${i}`).innerHTML)).toFixed(2);
    document.getElementById(`total_profit${i}`).innerHTML = (Number(document.getElementById(`total${i}`).innerHTML) / Number(document.getElementById(`total_spend${i}`).innerHTML)).toFixed(2);
  }
}

// Встановлення таймауту на 2 секунди
const timeout = 500; // 2 секунди
setTimeout(myFunction, timeout);

function calculateTotalAndForEachType() {
  let totalSum = 0;
  const types = {};
  const totalPriceDiv = document.createElement('div');
  totalPriceDiv.classList.add('totalPrice'); // Додавання класу "totalPrice" до створеного діва
  
  // Перебираємо клітинки з класом "total"
  const totalCells = document.querySelectorAll('.total');
  totalCells.forEach(cell => {
    // Додавання класу "overAllPrice" до клітинок
    cell.classList.add('overAllPrice');
    
    // Обчислення загальної суми для усіх клітинок з класом "total"
    const value = parseFloat(cell.textContent) || 0;
    totalSum += value;
    
    // Отримання типу товару з першої клітинки в поточному рядку
    const type = cell.parentNode.cells[0].textContent;
    
    // Додавання ціни до відповідного типу товару
    if (!types[type]) {
      types[type] = [];
    }
    types[type].push(value);
  });
  
  // Створення абзаців для відображення суми для кожного типу товару
  for (const type in types) {
    if (types.hasOwnProperty(type)) {
      const typeTotal = types[type].reduce((acc, curr) => acc + curr, 0);
      const paragraph = document.createElement('p');
      paragraph.textContent = `${type}: Total sum - ${typeTotal.toFixed(2)}`;
      paragraph.classList.add('overAllPrice');
      totalPriceDiv.appendChild(paragraph); // Додаємо абзац для кожного типу товару в дів
    }
  }
  
  // Створення абзацу для відображення загальної суми
  const totalParagraph = document.createElement('p');
  totalParagraph.textContent = `Total sum: ${totalSum.toFixed(2)}`;
  totalParagraph.classList.add('overAllPrice');
  totalPriceDiv.appendChild(totalParagraph); // Додаємо абзац загальної суми в дів
  
  // Додаємо дів зі всіма абзацами в кінець сторінки
  document.body.appendChild(totalPriceDiv);
}

// Виклик функції після завершення таймауту
setTimeout(calculateTotalAndForEachType, timeout);


