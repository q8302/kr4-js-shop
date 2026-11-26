// js/cart.js — Логика страницы корзины
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-items-container');
    const summary = document.getElementById('cart-summary');
    const emptyState = document.getElementById('cart-empty');
    const totalPriceEl = document.getElementById('cart-total-price');
    const clearBtn = document.getElementById('clear-cart-btn');

    function renderCart() {
        let cart = [];
        try {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) cart = JSON.parse(storedCart);
        } catch (e) { cart = []; }

        if (!cart || cart.length === 0) {
            container.style.display = 'none';
            summary.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'flex';
        summary.style.display = 'block';
        emptyState.style.display = 'none';
        container.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += (item.price * item.quantity);

            const itemEl = document.createElement('div');
            itemEl.style.cssText = 'display: flex; align-items: center; gap: 20px; background: #fff; padding: 16px; border-radius: 12px; border: 1px solid var(--color-border);';

            const img = document.createElement('img');
            img.src = item.image || 'images/placeholder.svg';
            img.style.cssText = 'width: 80px; height: 80px; object-fit: cover; border-radius: 8px; background: #fdf0f5;';
            img.onerror = () => { img.style.display = 'none'; };

            const info = document.createElement('div');
            info.style.flex = '1';
            info.innerHTML = `
            <h3 style="margin: 0 0 4px; font-size: 18px;">${item.title}</h3>
            <p style="margin: 0; color: var(--color-muted); font-size: 14px;">${item.price.toLocaleString('ru-RU')} руб.</p>
        `;

            // Счетчик в корзине
            const control = document.createElement('div');
            control.classList.add('quantity-control');
            control.innerHTML = `
            <button class="quantity-btn" data-action="minus" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" data-action="plus" data-id="${item.id}">+</button>
        `;

            const itemTotal = document.createElement('div');
            itemTotal.style.cssText = 'font-weight: 800; font-size: 18px; color: var(--color-primary); width: 100px; text-align: right;';
            itemTotal.textContent = `${(item.price * item.quantity).toLocaleString('ru-RU')} руб.`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✕';
            removeBtn.style.cssText = 'background: none; border: none; color: var(--color-danger); cursor: pointer; font-size: 20px; padding: 8px;';
            removeBtn.addEventListener('click', () => {
                const newCart = cart.filter(p => p.id !== item.id);
                localStorage.setItem('cart', JSON.stringify(newCart));
                renderCart();
                if (typeof updateCartCounter === 'function') updateCartCounter();
            });

            itemEl.append(img, info, control, itemTotal, removeBtn);
            container.appendChild(itemEl);
        });

        totalPriceEl.textContent = `${totalPrice.toLocaleString('ru-RU')} руб.`;
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите очистить корзину?')) {
                localStorage.removeItem('cart');
                renderCart();
                const cartCountEl = document.querySelector('[data-cart-count]');
                if (cartCountEl) cartCountEl.textContent = '0';
            }
        });
    }

    renderCart();
    // Обработка плюс/минус в корзине
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.quantity-btn');
        if (!btn) return;

        const id = Number(btn.dataset.id);
        const action = btn.dataset.action;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.id === id);

        if (index > -1) {
            if (action === 'plus') {
                cart[index].quantity += 1;
            } else if (action === 'minus') {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            if (typeof updateCartCounter === 'function') updateCartCounter();
        }
    });
});