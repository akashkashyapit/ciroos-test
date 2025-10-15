# 📊 Interactive Dashboard

A modern **React + Vite**-powered interactive dashboard featuring responsive design, smooth animations, and data visualization using **Recharts**.  
Styled with **Tailwind CSS** and animated using **Framer Motion**.

---

## 🚀 Features

- ⚡ **Vite** for lightning-fast development and builds  
- 🎨 **Tailwind CSS** for utility-first responsive styling  
- 📈 **Recharts** for elegant data visualization  
- 🌀 **Framer Motion** for animations and transitions  
- 🧩 Modular and extensible component structure  
- 💾 Persistent filters (on refresh)  
- 🧹 ESLint setup for code quality and consistency  

---

## 📁 Folder Structure

```
interactive-dashboard/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom React hooks
│   ├── data/              # Mock or static dataset
│   ├── styles/            # Global CSS and Tailwind config
│   ├── App.jsx            # Main application entry
│   └── main.jsx           # ReactDOM render entry
├── scripts/
│   └── dev.js             # Custom dev setup (if any)
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🧰 Tech Stack

| Category        | Technology                  |
|-----------------|-----------------------------|
| Frontend        | React 18                    |
| Build Tool      | Vite                        |
| Styling         | Tailwind CSS                |
| Charts          | Recharts                    |
| Animations      | Framer Motion               |
| Linting         | ESLint + React Hooks Plugin |

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/interactive-dashboard.git
cd interactive-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

---

## 📊 Mock Dataset Example

You can define your mock data under `src/data/mockData.js`:

```js
export const salesData = [
  { month: "Jan", revenue: 4200, profit: 2400 },
  { month: "Feb", revenue: 3800, profit: 2000 },
  { month: "Mar", revenue: 4600, profit: 2600 },
  { month: "Apr", revenue: 5200, profit: 3000 },
];
```

---

## 🧪 Code Quality

Lint your code using:
```bash
npm run lint
```

---

## 🧑‍💻 Author

**Akash Kashyap**  
Senior Frontend Engineer  
📧 [akash.kashyap.dev@gmail.com](mailto:akash.kashyap.dev@gmail.com)

---

## 🪪 License

This project is licensed under the **MIT License** – feel free to use and modify for your own projects.

---

**Made with ❤️ using React, Vite, and Tailwind CSS**
