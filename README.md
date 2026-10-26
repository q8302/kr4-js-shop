# Контрольная работа №4

## Автор

ФИО: Чадина Дарья
Группа: ЭФБО-13-25

Тема: «JavaScript: интерактивность, DOM, события, формы и валидация».

## Основа проекта

Проект `kr4-js-shop` создан на основе проекта `kr3-responsive-shop`.

## Практическая работа №15

Выполнено:

- создан отдельный репозиторий `kr4-js-shop`;
- перенесена основа из КР №3;
- создана папка `js`;
- создан `js/data.js` с объектом товара;
- создан `js/main.js` с функциями;
- JavaScript подключён через `defer`;
- создан объект товара;
- написаны функции `formatPrice`, `calculateDiscount`, `calculateFinalPrice`, `getProductStatus`, `createProductSummary`;
- результаты выведены в консоль;
- результат выведен на страницу через `textContent`.

## Безопасный вывод данных

Для вывода пользовательских данных используется `textContent`, а не `innerHTML`.

`textContent` безопаснее, потому что:
- `innerHTML` воспринимает строку как HTML-разметку;
- `textContent` вставляет строку как обычный текст.

## Структура проекта

```
kr4-js-shop/
├── index.html
├── catalog.html
├── product.html
├── order.html
├── contacts.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── data.js
│   └── main.js
├── images/
├── lighthouse/
├── README.md
└── .gitignore
```