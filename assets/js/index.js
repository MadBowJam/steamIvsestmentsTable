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

// Функція для обчислення та виведення суми клітинок з класом "total"
function calculateTotal() {
  let totalSum = 0;
  const totalCells = document.querySelectorAll('.total');
  totalCells.forEach(cell => {
    const value = parseFloat(cell.textContent) || 0; // Перевіряємо, чи текст можна конвертувати в число
    totalSum += value;
  });
  
  // Створюємо новий абзац для відображення суми
  const totalParagraph = document.createElement('p');
  totalParagraph.textContent = `Total sum: ${totalSum.toFixed(2)}`; // Фіксуємо суму до двох десяткових знаків
  totalParagraph.classList.add('overAllPrice'); // Додаємо клас "overAllPrice"
  document.body.appendChild(totalParagraph); // Додаємо абзац до сторінки
}

// Виклик функції після завершення таймауту
setTimeout(calculateTotal, timeout);


// Функція для обчислення суми трьох клітинок з класом "total" для кожного типу товару
function calculateTotalForEachType() {
  const types = {};
  
  // Перебираємо масив itemArray з кроком 4, оскільки кожні 4 елементи відповідають одному типу товару
  for (let i = 0; i < itemArray.length; i += 4) {
    const type = itemArray[i];
    const total = document.getElementById(`total${i}`).innerHTML;
    
    // Якщо тип товару ще не був доданий до об'єкта types, створюємо його
    if (!types[type]) {
      types[type] = [];
    }
    
    // Додаємо суму до відповідного типу товару
    types[type].push(total);
  }
  
  // Створюємо параграфи для кожного типу товару та виводимо їх суму
  for (const type in types) {
    if (types.hasOwnProperty(type)) {
      const typeTotal = types[type].reduce((acc, curr) => acc + curr, 0); // Обчислюємо суму для даного типу товару
      const paragraph = document.createElement('p');
      paragraph.textContent = `${type}: Total sum - ${typeTotal.toFixed(2)}`;
      paragraph.classList.add('overAllPrice');
      document.body.appendChild(paragraph);
    }
  }
}

// Викликаємо функцію після завершення таймауту
setTimeout(calculateTotalForEachType, timeout);
