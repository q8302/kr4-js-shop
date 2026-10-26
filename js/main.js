// js/main.js — КР №4, практика №16
// Функции обработки массива товаров

console.log('Файл main.js подключён');
console.table(products);

/**
 * Получить массив названий товаров
 */
function getProductTitles(products) {
    return products.map((product) => product.title);
}

/**
 * Получить только товары в наличии
 */
function getAvailableProducts(products) {
    return products.filter((product) => product.isAvailable);
}

/**
 * Поиск товаров по названию
 */
function searchProducts(products, query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === '') {
        return products;
    }
    return products.filter((product) => {
        return product.title.toLowerCase().includes(normalizedQuery);
    });
}

/**
 * Фильтрация по категории
 */
function filterProductsByCategory(products, category) {
    if (category === 'all') {
        return products;
    }
    return products.filter((product) => {
        return product.category === category;
    });
}

/**
 * Сортировка по цене (asc / desc)
 */
function sortProductsByPrice(products, direction = 'asc') {
    const productsCopy = [...products];
    if (direction === 'desc') {
        return productsCopy.sort((a, b) => b.price - a.price);
    }
    return productsCopy.sort((a, b) => a.price - b.price);
}

/**
 * Поиск товара по id
 */
function findProductById(products, id) {
    return products.find((product) => product.id === id);
}

/**
 * Общая стоимость товаров
 */
function calculateTotalPrice(products) {
    return products.reduce((sum, product) => sum + product.price, 0);
}

/**
 * Подсчёт товаров в наличии
 */
function countAvailableProducts(products) {
    return products.filter((product) => product.isAvailable).length;
}

/**
 * Средняя цена
 */
function calculateAveragePrice(products) {
    if (products.length === 0) {
        return 0;
    }
    return Math.round(calculateTotalPrice(products) / products.length);
}

/**
 * Комбинированная функция — поиск + фильтр + сортировка
 */
function getPreparedProducts(products, query, category, sortDirection) {
    let result = [...products];
    result = searchProducts(result, query);
    result = filterProductsByCategory(result, category);
    result = sortProductsByPrice(result, sortDirection);
    return result;
}

// === Проверки в консоли ===
console.log('Названия товаров:', getProductTitles(products));
console.log('Товаров в наличии:', getAvailableProducts(products).length);
console.log('Поиск по "ко":', searchProducts(products, 'ко').length);
console.log('Кухня:', filterProductsByCategory(products, 'kitchen').length);
console.log('Сортировка по цене (asc):', sortProductsByPrice(products, 'asc').map(p => p.title));
console.log('Сортировка по цене (desc):', sortProductsByPrice(products, 'desc').map(p => p.title));

const found = findProductById(products, 3);
console.log('Товар с id=3:', found ? found.title : 'Не найден');

console.log('Общая стоимость:', calculateTotalPrice(products));
console.log('Товаров в наличии:', countAvailableProducts(products));
console.log('Средняя цена:', calculateAveragePrice(products));

console.log('Комбинированный результат:');
console.table(getPreparedProducts(products, 'ко', 'kitchen', 'asc'));

// === Вывод статистики на страницу ===
const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
    messageElement.textContent = 'Массив товаров и функции обработки данных подключены.';
}

if (productOutputElement) {
    productOutputElement.textContent = [
        `Всего товаров: ${products.length}`,
        `Товаров в наличии: ${countAvailableProducts(products)}`,
        `Средняя цена: ${calculateAveragePrice(products)} руб.`,
        `Результатов поиска "ко": ${searchProducts(products, 'ко').length}`
    ].join('\n');
}