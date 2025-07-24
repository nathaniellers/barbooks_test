# 🧠 Full Stack Order Summary App (Node.js + React + SQLite)

This is a full-stack web application for managing and viewing orders, built using **Node.js**, **Express**, **SQLite**, and **React** with **TypeScript**. It supports searching, pagination, and viewing summary data — ideal for demonstrating clean architecture, full-stack integration, and testability.

---

## 📁 Project Structure

project-root/
├── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── controllers/
│ │ ├── db/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── scripts/ # DB seed and print scripts
│ │ ├── tests/
│ │ └── index.ts # App entry point
│ └── package.json
├── frontend/ # React + TypeScript + MUI
│ ├── src/
│ └── package.json
├── README.md # ← You are here
└── .env # Environment variables


---

## 🧩 Tech Stack

### 🟦 Backend
- **Node.js** + **Express**
- **SQLite3** (in-memory or file-based)
- **TypeScript**
- **Jest** for unit testing
- **Winston** for logging

### 🎨 Frontend
- **React** + **TypeScript**
- **Material UI (MUI)**
- **Axios** for API communication
- **React Router** for routing

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nathaniellers/barbooks_test.git
cd order-summary-app
```

2. Install Dependencies
Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd ../frontend
npm install
```

3. Set Up Environment
In the root folder, create a .env file:

env
```bash
NODE_ENV=development
PORT=3001
```
For test environment (optional):

env
```bash
NODE_ENV=test
```
4. Run the App
Start Backend (API Server)

```bash
cd backend
npm run dev
```
Start Frontend (React)
```bash
cd ../frontend
npm run dev
```

__By default, the frontend runs on http://localhost:5173 and the backend on http://localhost:3001.__


.

🧪 Running Tests
```bash
cd backend
npm test
```
__This will run unit tests using Jest with an in-memory SQLite database.__

🗄️ Seeding the Database
__To insert dummy data into the SQLite database:__
```bash
cd backend
npm run seed
```
__This will populate the orders table with sample data using scripts in src/scripts/.__

🚦 API Endpoints
GET /api/orders
Query Parameters:

product: Filter by product name

limit: Limit number of results (default: 10)

offset: Offset for pagination

Response:
```bash
[
  {
    "id": 1,
    "product": "Laptop",
    "quantity": 3,
    "price": 1000
  }
]
```

📊 Frontend Features
🧠 View list of orders in a paginated table

🔍 Search/filter by product name

🧾 Summary of total quantity and amount

🧼 Scripts
In /backend/package.json:

Command	Description
npm run dev	Start API server in dev mode and runs migrations and seeder
npm run seed	Run DB seed script (optional for testing)
npm test	Run backend tests (optional for testing)

📌 Notes
SQLite DB file is saved in /backend/src/db/database.sqlite

In test mode, SQLite runs in-memory (:memory:)

Logs are printed using winston with timestamps

Errors and queries are fully logged for easier debugging using [winston](https://www.npmjs.com/package/winston) - used for production ready setup

📣 License
MIT © Nathanielle Romero