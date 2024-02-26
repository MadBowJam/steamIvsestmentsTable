import { linkArray } from './app/links.js';
import { elements } from './app/createDOM.js';

elements.map(({tag, ...props}) => document.body.appendChild(Object.assign(document.createElement(tag), props))); // Створення елементів вебсторінки в масиві elements та додавання їх до сторінки

const link = `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=`; // Посилання на API
let timer = 0; // Лічильник

function fetchData() { // Функція для перевірки цін
  const tableBody = document.getElementById('table'); // Отримуємо таблицю
  const lowestPrices = []; // Оголошуємо масив для зберігання найнижчих цін

  const today = new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) // Отримуємо поточну дату та час
    .replace(/\//g, '.') // Замінюємо "/" на "."
    .replace(/[,\s:]/g, '_'); // Замінюємо пробіли, коми та крапки на "_"

  for (let i = 0; i < linkArray.length; i++) { // Цикл для перевірки цін
    setTimeout(() => { // Встановлення таймера
      fetch(link + linkArray[i]) // Отримуємо дані з API
        .then(response => { // Обробка відповіді
          if (!response.ok) { // Перевірка статусу відповіді
            throw new Error('Network response was not ok'); // Виводимо помилку
          }
          return response.json(); // Повертаємо дані відповіді
        })
        .then(response => { // Обробка відповіді
          const formattedPrice = response.lowest_price.substring(1).replace('.', ','); // Форматування ціни
          lowestPrices.push(formattedPrice); // Додавання форматованої ціни до масиву
          tableBody.innerHTML += `<tr><th class="price">${formattedPrice}</th></tr>`; // Створення та додавання нового рядка для таблиці

          if (lowestPrices.length === linkArray.length) { // Перевірка, чи це останній запит
            const url = URL.createObjectURL(new Blob([JSON.stringify(lowestPrices)], { type: 'application/json' })); // Створення посилання для завантаження файлу JSON зі сьогоднішньою датою та часом в назві | Конвертування масиву з найнижчими цінами у рядок JSON
            (Object.assign(document.body.appendChild(document.createElement('a')), { href: url, download: `${today}.json` })).click(); // Використання сьогоднішньої дати та часу в назві файлу, додавання лінки на сторінку для завантаження JSON, та клік по ньому
          }
        })
        .catch(error => { // Обробка помилки
          console.error('Error fetching data for', link + linkArray[i], ':', error); // Обробка помилки при отриманні даних з API
        });
    }, timer); // Встановлення таймера
    timer += 5000; // Збільшення таймера
  }
}

export { fetchData };