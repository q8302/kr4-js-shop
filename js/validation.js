// js/validation.js — Строгая валидация формы
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    if (!form) return;

    const nameInput = document.getElementById('order-name');
    const emailInput = document.getElementById('order-email');
    const phoneInput = document.getElementById('order-phone');
    const agreementInput = form.querySelector('input[name="agreement"]');
    const commentInput = document.getElementById('order-comment');
    const messageBox = form.querySelector('.form-message');

    // Вспомогательная функция для вывода ошибки
    function showError(input, errorId, text) {
        input.setAttribute('aria-invalid', 'true');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.innerHTML = `⚠️ ${text}`; // Добавляем иконку
        }
    }

    // Вспомогательная функция для сброса ошибки
    function clearError(input, errorId) {
        input.removeAttribute('aria-invalid');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Очищаем ошибки, как только пользователь начинает печатать
    if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, 'order-name-error'));
    if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, 'order-email-error'));
    if (phoneInput) phoneInput.addEventListener('input', () => clearError(phoneInput, 'order-phone-error'));

    // Основная проверка при отправке
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Блокируем отправку
        let isValid = true;

        // Скрываем старое сообщение об успехе
        if (messageBox) {
            messageBox.style.display = 'none';
            messageBox.textContent = '';
            messageBox.style.backgroundColor = '';
            messageBox.style.color = '';
        }

        // 1. Проверка Имени (минимум 2 буквы)
        const nameValue = nameInput.value.trim();
        if (nameValue.length < 2 || /\d/.test(nameValue)) {
            showError(nameInput, 'order-name-error', 'Имя должно содержать только буквы (мин. 2)');
            isValid = false;
        }

        // 2. Проверка Email (строгая регулярка)
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'order-email-error', 'Введите корректный E-mail (name@mail.ru)');
            isValid = false;
        }

        // 3. Проверка Телефона (строго: +7 XXX XXX-XX-XX или 8XXX...)
        const phoneValue = phoneInput.value.trim();
        // Регулярка: допускает +7 или 8, код оператора, и 7 цифр
        const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
        if (!phoneRegex.test(phoneValue)) {
            showError(phoneInput, 'order-phone-error', 'Формат: +7 (900) 000-00-00 или 89000000000');
            isValid = false;
        }

        // 4. Проверка чекбокса
        if (!agreementInput.checked) {
            if (messageBox) {
                messageBox.textContent = '⚠️ Необходимо согласие на обработку данных';
                messageBox.style.display = 'block';
                messageBox.style.color = 'var(--color-danger)';
                messageBox.style.backgroundColor = '#fde8ef';
            }
            isValid = false;
        }

        // Если всё ОК
        if (isValid) {
            if (messageBox) {
                messageBox.textContent = '✅ Спасибо! Ваша заявка успешно отправлена. Мы скоро свяжемся с вами.';
                messageBox.style.display = 'block';
                messageBox.style.color = 'var(--color-success)';
                messageBox.style.backgroundColor = 'var(--color-success-bg)';
            }
            form.reset(); // Очищаем форму

            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                if (messageBox) messageBox.style.display = 'none';
            }, 5000);
        } else {
            // Если форма не прошла, делаем анимацию "тряски" (через CSS)
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 400);
        }
    });
});