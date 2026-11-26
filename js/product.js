
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);

    const currentProduct = productId
        ? products.find(p => p.id === productId)
        : products[0];

    if (!currentProduct) {
        document.getElementById('product-title').textContent = 'Товар не найден';
        return;
    }

    document.title = `${currentProduct.title} — Zyza Shop`;
    document.getElementById('breadcrumb-title').textContent = currentProduct.title;
    document.getElementById('product-title').textContent = currentProduct.title;
    document.getElementById('product-price').textContent = `Цена: ${currentProduct.price} руб.`;
    document.getElementById('product-description').textContent = currentProduct.description;

    const img = document.getElementById('product-image');
    img.src = currentProduct.image;
    img.alt = currentProduct.title;

    const badge = document.getElementById('product-badge');
    if (currentProduct.badge) {
        badge.textContent = currentProduct.badge;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }

    const categoryNames = {
        clothing: 'Одежда',
        outerwear: 'Верхняя одежда',
        accessories: 'Аксессуары',
        toys: 'Игрушки'
    };
    document.getElementById('product-category').textContent = categoryNames[currentProduct.category] || currentProduct.category;
    document.getElementById('product-availability').textContent = currentProduct.isAvailable ? 'В наличии' : 'Нет в наличии';

    const orderLink = document.getElementById('order-link');
    orderLink.href = `order.html?product=${encodeURIComponent(currentProduct.title)}`;
});

// js/product.js — логика отображения товара
document.addEventListener('DOMContentLoaded', () => {
    // 1. Получаем ID из ссылки (например, product.html?id=2)
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);

    // 2. Ищем товар. Если ID нет, берем первый
    const currentProduct = productId
        ? products.find(p => p.id === productId)
        : products[0];

    if (!currentProduct) {
        document.getElementById('product-title').textContent = 'Товар не найден';
        document.getElementById('product-description').textContent = 'Попробуйте вернуться в каталог.';
        return;
    }

    // 3. Меняем заголовок вкладки и хлебные крошки
    document.title = `${currentProduct.title} — Zyza Shop`;
    document.getElementById('breadcrumb-title').textContent = currentProduct.title;

    // 4. Заполняем данные
    document.getElementById('product-title').textContent = currentProduct.title;
    document.getElementById('product-price').textContent = `Цена: ${currentProduct.price.toLocaleString('ru-RU')} руб.`;
    document.getElementById('product-description').textContent = currentProduct.description;

    // Картинка
    const img = document.getElementById('product-image');
    img.src = currentProduct.image;
    img.alt = currentProduct.title;

    // Бейдж
    const badge = document.getElementById('product-badge');
    if (currentProduct.badge) {
        badge.textContent = currentProduct.badge;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }

    // Категория и наличие
    const categoryNames = {
        clothing: 'Одежда',
        outerwear: 'Верхняя одежда',
        accessories: 'Аксессуары',
        toys: 'Игрушки'
    };
    document.getElementById('product-category').textContent = categoryNames[currentProduct.category] || currentProduct.category;
    document.getElementById('product-availability').textContent = currentProduct.isAvailable ? 'В наличии' : 'Нет в наличии';

    // Ссылка на оформление заказа
    const orderLink = document.getElementById('order-link');
    orderLink.href = `order.html?product=${encodeURIComponent(currentProduct.title)}`;
});