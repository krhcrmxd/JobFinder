# JobFinder 🧑‍💼

A full-stack job board application with authentication, authorization, and a custom UI created in educational purposes.  
Users can register, log in, post vacancies and orders, and browse existing listings.

---

## ✨ Features

- 🔐 JWT-based authentication and role-based authorization
- 👤 User roles (e.g., job seekers, employers, freelancers)
- 📄 Post, view, and manage job listings
- 🎨 Custom UI components
- 🛠️ Built with a modern full-stack setup

---

## 📦 Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Axios with interceptors for auth

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT

---

## Environment setup
Create .env files for backend and frontend.

Example for backend:

DATABASE_URL=postgresql://user:password@localhost:5432/jobboard

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

---

# 🧠 Planned Improvements
👻 Guest browsing mode (read-only access without login)

🔄 WebSocket-based updates (real-time listings or chat)

💬 Integrated chat between users

📱 Better mobile responsiveness and improved UI/UX

🧪 Testing and validation


