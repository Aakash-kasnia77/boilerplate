# React + Vite + TypeScript Starter Boilerplate

A modern, production-ready React boilerplate built with **Vite + TypeScript**, designed for real-world applications with authentication, protected routing, global state management, and a scalable folder structure.

This is not a demo project — it’s a solid starting point for dashboards, SaaS apps, and authenticated web applications.

---

## ✨ Features

- ⚡ Vite + React + TypeScript
- 🎨 Tailwind CSS (fully responsive, mobile-first)
- 🔐 Authentication flow (Login / Signup)
- 🛡 Public & Protected Routes
- 🗂 Global state management using Zustand
- 🧩 Reusable global UI components
- 📱 Mobile-responsive dashboard layout
- 🧼 Clean, scalable folder architecture
- 🧠 ESLint configured for code quality

---

## 🧱 Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- React Router DOM

---

## 📁 Project Structure

```txt
.
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, icons, static resources
│   ├── auth/                # Authentication logic & helpers
│   ├── components/          # Reusable global UI components
│   ├── layouts/             # App & dashboard layouts
│   ├── pages/               # Pages (Login, Signup, Dashboard)
│   ├── routes/              # Public & protected route definitions
│   ├── store/               # Zustand global stores
│   ├── types/               # Global TypeScript types & interfaces
│   ├── validation/          # Form validation schemas & helpers
│   ├── App.tsx              # Root app component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles (Tailwind entry)
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md


## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd project-name
npm install
npm run dev
