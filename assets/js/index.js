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




// fetch('./assets/json/06.03.2024__13_20.json')
//   .then(response => response.json())
//   .then(data => {
//     // Отримання всіх клітинок стовбця "price"
//     const priceCells = document.querySelectorAll('.price');
//
//     // Заповнення кожної клітинки значеннями з JSON
//     priceCells.forEach((cell, index) => {
//       cell.textContent = data[index] || ''; // Якщо дані в JSON не визначені, залишаємо клітинку порожньою
//     });
//   })
//   .catch(error => console.error('Error fetching JSON:', error));


console.log(itemArray.length)

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







// Функція для отримання назв файлів в папці
function getFilesInDirectory(directory) {
  return fetch(directory)
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, 'text/html');
      const links = htmlDocument.querySelectorAll('a');
      const fileNames = [];
      links.forEach(link => {
        if (link.href.endsWith('.json')) {
          fileNames.push(link.href);
        }
      });
      console.log(fileNames)
      return fileNames;
    });
}

// Функція для отримання найновішого файлу
function getNewestFile(files) {
  return files.reduce((newestFile, currentFile) => {
    // Отримуємо дату з імені файлу
    const newestDate = new Date(newestFile.split('/')[2].split('__')[0]);
    const currentDate = new Date(currentFile.split('/')[2].split('__')[0]);
    // Порівнюємо дати
    return currentDate > newestDate ? currentFile : newestFile;
  });
}

getFilesInDirectory('./assets/json/')
  .then(files => {
    // Знаходимо найновіший файл
    const newestFile = getNewestFile(files);
    // Виконуємо запит до найновішого файлу
    return fetch(newestFile);
  })
  .then(response => response.json())
  .then(data => {
    const priceCells = document.querySelectorAll('.price');
    priceCells.forEach((cell, index) => {
      cell.textContent = data[index] || '';
    });
  })
  .catch(error => console.error('Error:', error));