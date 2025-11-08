# Personal Finance Tracker
**Web3Bridge Cohort XIII — Pre-Qualification Exercise**

A responsive Personal Finance Tracker built with React + Vite that allows users to record income & expenses, create categories, filter and sort transactions, visualize data with charts, and export CSVs. Data persists in browser storage.

---

## Live demo
(Insert your deployed URL here — e.g. https://your-username.github.io/finance-tracker or Vercel URL)

---

## Features
- Add income and expense transactions (amount, date, category, optional notes).
- Create custom categories (income & expense).
- Filter and sort transactions (by type, category, date, amount).
- Charts: monthly bar chart and category pie chart (Recharts).
- Export transactions to CSV.
- Data persistence via `localStorage` (works across browser sessions).
- Responsive UI (Tailwind CSS).
- Unit tests (Vitest) for core utilities.

---

## Tech stack
- React (Vite)
- Tailwind CSS
- Recharts (charts)
- lucide-react (icons)
- Vitest + @testing-library (tests)
- Deployment: Vercel or GitHub Pages

---

## Quick start (run locally)
```bash
# clone repo
git clone git@github.com:YOUR_GITHUB_USERNAME/REPO_NAME.git
cd REPO_NAME

# install
npm install

# dev
npm run dev

# build
npm run build

# preview production build
npm run preview

# run tests
npm test
