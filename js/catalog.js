
const productsContainer = document.querySelector('[data-products-container]');
const searchInput = document.querySelector('#catalog-search');
const categoryFilter = document.querySelector('#category-filter');
const sortSelect = document.querySelector('#sort-select');
const catalogCount = document.querySelector('.catalog-count');
const catalogEmpty = document.querySelector('.catalog-empty');


const catalogState = {
    query: '',
    category: 'all',
    sort: 'default',
    badges: [],
    priceMin: 0,
    priceMax: Infinity
};

function updateCartCounter() {
    const cartCountEl = document.querySelector('[data-cart-count]');
    if (!cartCountEl) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

function searchProducts(products, query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === '') {
        return products;
    }
    return products.filter((product) =>
        product.title.toLowerCase().includes(normalizedQuery)
    );
}

function filterProductsByCategory(products, category) {
    if (category === 'all') {
        return products;
    }
    return products.filter((product) => product.category === category);
}

function sortProducts(products, sortType) {
    const productsCopy = [...products];
    if (sortType === 'price-asc') {
        return productsCopy.sort((a, b) => a.price - b.price);
    }
    if (sortType === 'price-desc') {
        return productsCopy.sort((a, b) => b.price - a.price);
    }
    if (sortType === 'title-asc') {
        return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    }
    return productsCopy; // По умолчанию
}

function getPreparedProducts(products, state) {
    let result = [...products];

    // 1. Поиск
    result = searchProducts(result, state.query);

    // 2. Выпадающий список категорий
    result = filterProductsByCategory(result, state.category);

    // 3. Галочки (Хит / Скидка)
    if (state.badges.length > 0 && !state.badges.includes('all')) {
        result = result.filter(p => p.badge && state.badges.includes(p.badge));
    }

    // 4. Цена
    result = result.filter(p => p.price >= state.priceMin && p.price <= state.priceMax);

    // 5. Сортировка
    result = sortProducts(result, state.sort);

    return result;
}

function formatPrice(price) {
    return `${price.toLocaleString('ru-RU')} руб.`;
}

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        cart = [];
    }
    const cartItem = cart.find(item => item.id === product.id);

    if (product.badge) {
        const badge = document.createElement('span');
        badge.classList.add('product-card__badge');
        badge.textContent = product.badge;
        card.appendChild(badge);
    }

    const img = document.createElement('img');
    img.classList.add('product-card__image');
    img.src = product.image || 'images/placeholder.svg';
    img.alt = product.title;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => { window.location.href = `product.html?id=${product.id}`; });
    card.appendChild(img);

    const title = document.createElement('h3');
    title.classList.add('product-card__title');
    title.textContent = product.title;
    title.style.cursor = 'pointer';
    title.addEventListener('click', () => { window.location.href = `product.html?id=${product.id}`; });
    card.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('product-card__description');
    description.textContent = product.description || 'Краткое описание товара.';
    card.appendChild(description);

    const price = document.createElement('p');
    price.classList.add('product-card__price');
    price.textContent = formatPrice(product.price);
    card.appendChild(price);

    const status = document.createElement('p');
    status.classList.add('product-card__status');
    status.textContent = product.isAvailable ? 'В наличии' : 'Нет в наличии';
    card.appendChild(status);

    const actionContainer = document.createElement('div');
    actionContainer.style.marginTop = 'auto';

    if (!product.isAvailable) {
        const button = document.createElement('button');
        button.classList.add('button', 'button--primary', 'product-card__button');
        button.type = 'button';
        button.textContent = 'Нет в наличии';
        button.disabled = true;
        actionContainer.appendChild(button);
    } else if (cartItem) {
        actionContainer.appendChild(createQuantityControl(product, cartItem.quantity));
    } else {
        const button = document.createElement('button');
        button.classList.add('button', 'button--primary', 'product-card__button');
        button.type = 'button';
        button.textContent = 'В корзину';
        button.dataset.action = 'add-to-cart';
        button.dataset.productId = String(product.id);
        actionContainer.appendChild(button);
    }

    card.appendChild(actionContainer);
    return card;
}

function createQuantityControl(product, quantity) {
    const control = document.createElement('div');
    control.classList.add('quantity-control');

    const btnMinus = document.createElement('button');
    btnMinus.classList.add('quantity-btn');
    btnMinus.textContent = '-';
    btnMinus.dataset.action = 'minus';
    btnMinus.dataset.productId = product.id;

    const val = document.createElement('span');
    val.classList.add('quantity-value');
    val.textContent = quantity;

    const btnPlus = document.createElement('button');
    btnPlus.classList.add('quantity-btn');
    btnPlus.textContent = '+';
    btnPlus.dataset.action = 'plus';
    btnPlus.dataset.productId = product.id;

    control.append(btnMinus, val, btnPlus);
    return control;
}

function renderProducts(productsToRender) {
    if (!productsContainer) return;

    productsContainer.textContent = '';

    if (catalogCount) {
        catalogCount.textContent = `Найдено товаров: ${productsToRender.length}`;
    }

    if (catalogEmpty) {
        catalogEmpty.hidden = productsToRender.length > 0;
    }

    productsToRender.forEach((product) => {
        const card = createProductCard(product);
        productsContainer.append(card);
    });
}

function updateCatalog() {
    const preparedProducts = getPreparedProducts(products, catalogState);
    renderProducts(preparedProducts);
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        catalogState.query = event.target.value;
        updateCatalog();
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', (event) => {
        catalogState.category = event.target.value;
        updateCatalog();
    });
}
const priceForm = document.querySelector('.filters-form');
const priceFromInput = document.getElementById('price-from');
const priceToInput = document.getElementById('price-to');

if (priceForm) {
    priceForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fromValue = Number(priceFromInput.value) || 0;
        const toValue = Number(priceToInput.value) || Infinity;

        const filtered = products.filter(product => {
            return product.price >= fromValue && product.price <= toValue;
        });

        renderProducts(filtered);
    });
}

if (sortSelect) {
    sortSelect.addEventListener('change', (event) => {
        catalogState.sort = event.target.value;
        updateCatalog();
    });
}

if (productsContainer) {
    productsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;

        const productId = Number(button.dataset.productId);
        if (!productId) return;

        const action = button.dataset.action;
        const selectedProduct = products.find(p => p.id === productId);
        if (!selectedProduct) return;

        let cart = [];
        try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (e) { cart = []; }

        const existingIndex = cart.findIndex(item => item.id === productId);

        if (action === 'add-to-cart') {
            if (existingIndex > -1) cart[existingIndex].quantity += 1;
            else cart.push({ ...selectedProduct, quantity: 1 });
        }
        else if (action === 'plus') {
            if (existingIndex > -1) cart[existingIndex].quantity += 1;
        }
        else if (action === 'minus') {
            if (existingIndex > -1) {
                cart[existingIndex].quantity -= 1;
                if (cart[existingIndex].quantity <= 0) {
                    cart.splice(existingIndex, 1);
                }
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        updateCatalog();
    });
}

if (productsContainer) {
    updateCatalog();
}
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const filterForm = document.querySelector('.filters-form');

if (filterForm) {
    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        catalogState.badges = selectedCategories;

        catalogState.priceMin = Number(document.getElementById('price-from').value) || 0;
        catalogState.priceMax = Number(document.getElementById('price-to').value) || Infinity;
        if (sortSelect) {
            sortSelect.addEventListener('change', (event) => {
                catalogState.sort = event.target.value;
                updateCatalog();
            });
        }

        updateCatalog();
    });
}
updateCartCounter();