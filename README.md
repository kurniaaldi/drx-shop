# 🛍️ DRX Shop - Frontend Developer Take-Home Test

A responsive, filterable product catalog built with **Next.js App Router**, styled using **Tailwind CSS**, and powered by the [Platzi Fake API](https://fakeapi.platzi.com/).

---

## 🚀 Tech Stack

| Tech         | Description                              |
| ------------ | ---------------------------------------- |
| Next.js 15   | App Router with React Server Components  |
| React 19     | Latest version of React for UI rendering |
| Tailwind CSS | Utility-first CSS framework              |
| Axios        | HTTP client for API calls                |
| Zustand      | Lightweight state management             |
| Heroicons    | Icons used in the UI                     |
| Headless UI  | Accessible UI components                 |

---

## 📦 Features

- ✅ Product listing with pagination (`Load More`)
- ✅ Product detail view
- ✅ Filtering by:
  - Category
  - Price range (min & max)
- ✅ Debounced filtering and search support
- ✅ Responsive design
- ✅ Clean and modular folder structure using `src/app` (App Router)

---

## 📂 Folder Structure

src/
├── app/ # App Router structure
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── product/[slug]/page.tsx # Product detail page
│
├── components/ # Reusable UI components
│ ├── carousel.tsx
│ ├── filter.tsx
│
├── hooks/ # Custom React hooks
│ ├── useDebounce.tsx
│ └── useParams.tsx
│
├── interface/ # TypeScript interfaces
│ └── index.ts
│
├── modules/ # Business logic modules
│ ├── detailProduct/index.tsx
│ └── listProduct/index.tsx
│
├── store/ # Zustand global state
│ └── paramsStore.ts
│
└── utils/
└── api.ts # Axios instance

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/drx-shop.git
cd drx-shop

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

🧪 Future Enhancements
🔄 Infinite scroll (replace "Load More")

🧱 Skeleton loading while fetching

🔍 Search functionality with debounce

🔧 Error boundaries and fallback UI

🌐 PWA/Offline support
```
