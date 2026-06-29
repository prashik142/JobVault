# JobVault

> **One-click Internship Tracker with Chrome Extension + Full Stack Dashboard**

Save internships directly from Internshala, track your applications, organize notes, and manage your internship journey—all in one place.

---

## 🚀 Live Demo

### 🌐 Dashboard
https://job-vault-eta.vercel.app

### 🔗 Backend API
https://jobvault-api.onrender.com

### 📂 Source Code
https://github.com/prashik142/JobVault

---

# ✨ Features

## 🧩 Chrome Extension

- Save internships directly from Internshala
- Detects internship details automatically
- One-click Save / Update
- Secure Login
- Persistent Authentication
- Beautiful popup UI
- Tracks internship status

---

## 📊 Dashboard

- View all saved internships
- Update application status
- Add personal notes
- Delete internships
- Responsive UI
- Secure JWT Authentication

---

## 🔐 Authentication

- User Signup
- User Login
- JWT Authentication
- Protected API Routes
- Persistent Sessions

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- CSS
- Axios

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)

## Chrome Extension

- Manifest V3
- Background Service Worker
- Content Scripts
- Chrome Storage API
- Messaging API

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → Neon PostgreSQL
  
---

# 📂 Project Structure

```
JobVault
│
├── client/                # React Dashboard
│
├── server/                # Express Backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── prisma
│   └── index.js
│
├── extension/             # Chrome Extension
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── background.js
│   ├── content.js
│   ├── modal.js
│   └── styles.css
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/prashik142/JobVault.git

cd JobVault
```

---

# Backend Setup

```bash
cd server

npm install
```

Create `.env`

```env
DATABASE_URL=YOUR_DATABASE_URL

JWT_SECRET=YOUR_SECRET

PORT=5000
```

Run Prisma

```bash
npx prisma generate

npx prisma db push
```

Start Backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run

```bash
npm run dev
```

---

# Chrome Extension Setup

Open Chrome

```
chrome://extensions
```

Enable

```
Developer Mode
```

Click

```
Load Unpacked
```

Select

```
extension/
```

The extension is now ready to use.

---

# 📖 How It Works

1. Open an internship on Internshala.
2. Click the **Save to JobVault** button.
3. Login to the extension.
4. Internship details are automatically extracted.
5. Save or update your application.
6. View and manage all internships from the dashboard.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/signup` | Register User |
| POST | `/auth/login` | Login User |

---

## Jobs

| Method | Endpoint |
|---------|----------|
| GET | `/jobs` |
| POST | `/jobs` |
| PUT | `/jobs/:id` |
| DELETE | `/jobs/:id` |
| GET | `/jobs/check` |

---

# 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- User-specific Internship Data
- Secure Token Storage

---

# 🚀 Future Improvements

- Job Search
- Filters
- Analytics Dashboard
- Chrome Notifications
- Export to CSV
- Reminder System
- Dark Mode
- AI Resume Match
- AI Internship Recommendations

---

# 👨‍💻 Author

**Prashik Mane**

GitHub

https://github.com/prashik142

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It really helps!

---

# 📜 License

This project is licensed under the MIT License.
