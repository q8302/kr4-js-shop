// js/main.js — КР №4, практика №15
// Функции форматирования, расчёта и вывода

console.log('Файл main.js подключён');
console.table(product);

/**
 * Форматирует цену: добавляет "руб."
 */
function formatPrice(price) {
    return `${price} руб.`;
}

/**
 * Считает размер скидки в рублях
 */
function calculateDiscount(price, discountPercent) {
    return price * discountPercent / 100;
}

/**
 * Считает итоговую цену со скидкой
 */
function calculateFinalPrice(price, discountPercent) {
    const discount = calculateDiscount(price, discountPercent);
    return price - discount;
}

/**
 * Возвращает статус товара: "В наличии" / "Нет в наличии"
 */
function getProductStatus(product) {
    if (product.isAvailable) {
        return 'В наличии';
    }
    return 'Нет в наличии';
}

/**
 * Формирует краткое описание товара
 */
function createProductSummary(product) {
    const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
    const status = getProductStatus(product);
    return `${product.title}: ${formatPrice(finalPrice)}. Статус: ${status}.`;
}

// === Расчёты для объекта product ===
const productDiscount = calculateDiscount(product.price, product.discountPercent);
const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
const productStatus = getProductStatus(product);
const productSummary = createProductSummary(product);

console.log('Скидка:', productDiscount);
console.log('Итоговая цена:', formatPrice(finalPrice));
console.log('Статус:', productStatus);
console.log('Описание:', productSummary);

// === Безопасный вывод на страницу через textContent ===
const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
    messageElement.textContent = 'JavaScript подключён корректно.';
}

if (productOutputElement) {
    productOutputElement.textContent = productSummary;
}