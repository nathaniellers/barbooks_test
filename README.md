# 🧠 Full Stack Order Summary App (Node.js + React + SQLite)

This is a full-stack web application for managing and viewing orders, built using **Node.js**, **Express**, **SQLite**, and **React** with **TypeScript** and **MUI**. It supports searching, pagination, and viewing summary data — ideal for demonstrating clean architecture, full-stack integration, and testability.

---

## 📁 Project Structure

```
project-root/
├── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── __tests__/
│ │ ├── controllers/
│ │ ├── db/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── scripts/ # DB migrate and seed
│ │ ├── utils/
│ │ ├── app.ts
│ │ └── server.ts # App entry point
│ └── package.json
├── frontend/ # React + TypeScript + MUI
│ ├── src/
│ └── package.json
├── README.md # ← You are here
└── .env # Environment variables
```

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
- **React Router** for routing (for future designs)

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nathaniellers/barbooks_test.git
cd barbooks_test
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

backend/.env
```bash
PORT=3000
DB_PATH=./src/db/database.sqlite
NODE_ENV=development
FRONTEND_URL=http://localhost:5175
```

frontend/.env
```bash
VITE_API_BASE_URL=http://localhost:3000
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

_By default, the frontend runs on http://localhost:5173 and the backend on http://localhost:3000._


## 🧪 Running Tests
```bash
cd backend
npm test
```
_This will run unit tests using Jest with an in-memory SQLite database._

## 🗄️ Migrating & Seeding the Database
_By default the system is already migrating tables and inserting dummy data into the SQLite database (for test purposes)_
_This will populate the orders table with sample data using scripts in src/scripts/._

## 🚦 API Endpoints
GET /api/orders
Query Parameters:

product: Filter by product name

limit: Limit number of results (default: 5)

offset: Offset for pagination

Response:
```bash
[
  {
    "id": 1,
    "product": "Apple",
    "qty": 10,
    "price": 2.5
  },
  {
    "id": 3,
    "product": "Apple",
    "qty": 7,
    "price": 2.7
  },
  {
    "id": 2,
    "product": "Banana",
    "qty": 5,
    "price": 1
  },
  {
    "id": 4,
    "product": "Orange",
    "qty": 8,
    "price": 3
  }
]
```

## 📊 Frontend Features
🧠 View list of orders in a paginated table

🔍 Search/filter by product name

🧾 Summary of total quantity and amount

## 🧼 Scripts
In /backend/package.json:

Command	Description
npm run dev	Start API server in dev mode and runs migrations and seeder
npm run seed	Run DB seed script (optional for testing)
npm test	Run backend tests (optional for testing)

## 📌 Notes
SQLite DB file is saved in /backend/src/db/database.sqlite

In test mode, SQLite runs in-memory (:memory:)

Errors and queries are fully logged for easier debugging

Logs are printed using [winston](https://www.npmjs.com/package/winston) with timestamps

## 📣 License
MIT © Nathanielle Romero
