# 🍔 FoodDash — Modern Food Delivery App

A fully featured food delivery frontend built with **React + Vite**, using Context API for state management and CSS Modules for styling.

---

## 🚀 Quick Start (3 commands)

```bash
npm install
npm run dev
```

Open → **http://localhost:5173**

---

## 📁 Project Structure

```
fooddash/
├── public/
│   └── favicon.svg
├── src/
│   ├── styles/
│   │   └── global.css          ← Design tokens + utility classes
│   ├── data/
│   │   └── constants.js        ← API_BASE, MENU_ITEMS, CATEGORIES
│   ├── context/
│   │   └── AppContext.jsx      ← Global state (cart, user, page, toasts)
│   ├── components/
│   │   ├── Icons.jsx
│   │   ├── Navbar.jsx + .module.css
│   │   ├── FoodCard.jsx + .module.css
│   │   ├── CartDrawer.jsx + .module.css
│   │   ├── CategoryTabs.jsx + .module.css
│   │   ├── Toast.jsx + .module.css
│   │   └── Footer.jsx + .module.css
│   ├── pages/
│   │   ├── HomePage.jsx + .module.css
│   │   ├── MenuPage.jsx + .module.css
│   │   ├── OrdersPage.jsx + .module.css
│   │   ├── AboutPage.jsx + .module.css
│   │   ├── CheckoutPage.jsx + .module.css
│   │   └── AuthPage.jsx + .module.css
│   ├── App.jsx                 ← Router + Shell
│   └── main.jsx                ← Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔌 Connect to Backend

1. Open `src/data/constants.js`
2. Change `API_BASE`:
```js
export const API_BASE = "http://localhost:5000/api";
```

3. In `AuthPage.jsx` → uncomment the `fetch()` block in `handleSubmit()`
4. In `CheckoutPage.jsx` → uncomment the `fetch()` block in `handleOrder()`

### Expected API endpoints:
| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | /auth/register   | Register user      |
| POST   | /auth/login      | Login user         |
| GET    | /menu            | Get all menu items |
| POST   | /orders          | Place an order     |
| GET    | /orders          | Get order history  |

---

## 🎨 Tech Stack

- **React 18** — UI library
- **Vite** — Build tool
- **Context API + useReducer** — State management
- **CSS Modules** — Scoped styles
- **Google Fonts** — Syne + DM Sans

---

## 📦 Build for Production

```bash
npm run build
```

Deploy the `dist/` folder to **Vercel**:
```bash
npm install -g vercel
vercel
```

---

## 🛠️ Available Scripts

| Command            | Description              |
|--------------------|--------------------------|
| `npm run dev`      | Start dev server         |
| `npm run build`    | Build for production     |
| `npm run preview`  | Preview production build |

---

Made with ❤️ by the FoodDash Team
