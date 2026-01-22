# React + Vite + TypeScript Starter Boilerplate

A modern, production-ready React boilerplate built with **Vite + TypeScript**, focused on scalability, clean architecture, and real-world authentication flows.

## ✨ Features

- ⚡ Vite + React + TypeScript
- 🎨 Tailwind CSS (fully responsive, mobile-first)
- 🔐 Authentication flow (Login / Signup)
- 🛡 Public & Protected Routes
- 🗂 Global state management with Zustand
- 🧩 Reusable UI components (Buttons, Inputs, etc.)
- 📱 Fully mobile responsive dashboard layout
- 🧼 Clean folder structure & best practices

## 🧱 Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Zustand
- React Router DOM

## 📁 Project Structure

├── public/ # Static assets
├── src/
│ ├── assets/ # Images, icons, static resources
│ ├── auth/ # Authentication logic & helpers
│ ├── components/ # Reusable global UI components
│ ├── layouts/ # App & dashboard layouts
│ ├── pages/ # Application pages (Login, Signup, Dashboard)
│ ├── routes/ # Public & protected route definitions
│ ├── store/ # Zustand global stores
│ ├── types/ # Global TypeScript types & interfaces
│ ├── validation/ # Form validation schemas / helpers
│ ├── App.tsx # Root app component
│ ├── main.tsx # Application entry point
│ └── index.css # Global styles (Tailwind entry)
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
