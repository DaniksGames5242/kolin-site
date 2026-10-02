# Личный сайт Коли

Сайт Коли, 14 лет. Анимированное интро iPhone 12 на GSAP. Готов к деплою на Vercel с красивыми ссылками.

## Структура
```
/
├── index.html              → /
├── about/index.html        → /about
├── projects/index.html     → /projects
├── iphone/index.html       → /iphone
├── contact/index.html      → /contact
├── 404.html                → кастомная 404
├── vercel.json             → cleanUrls + хедеры
├── favicon.svg
└── assets/
    ├── css/base.css        → переменные, шапка, кнопки, подвал
    ├── css/iphone.css      → интро + iPhone 12 + мини-айфон
    ├── css/pages.css       → hero, секции, 404
    └── js/
        ├── common.js       → частицы, курсор, active-меню
        ├── home.js         → интро GSAP + печать + скролл
        └── iphone.js       → страница /iphone
```

## Красивые ссылки (без .html)
Работают через `cleanUrls: true` + папки `about/index.html`:
- `/` — главная + интро iPhone 12
- `/about` — обо мне
- `/projects` — проекты
- `/iphone` — интерактивный iPhone 12
- `/contact` — контакты
- любая ерунда → `404.html`

## Локальный запуск
```bash
# вариант 1: просто открой index.html
# вариант 2: сервер (чтобы работали /about и т.д.)
npx serve .
# или
python -m http.server 8000
```
Открой http://localhost:8000

## Деплой на Vercel
1. Залей папку в GitHub
2. https://vercel.com → New Project → выбери репозиторий
3. Framework: **Other**, Build Command — пусто, Output — `.`
4. Deploy → получишь `kolya-dev.vercel.app`
5. Проверка: `/about` без .html, `/asdasd` → кастомная 404
