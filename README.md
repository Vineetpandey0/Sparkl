# Sparkl

🚀 **Live Website:** [Visit Sparkl](https://sparkl-share.vercel.app/)

---

## Overview

Sparkl is a modern web application that allows users to create an account, log in, and share posts. The platform is built with Next.js, TypeScript, Tailwind CSS, and MongoDB, with JWT-based authentication for secure login and session management.

---

## Features

* 🔐 **User Authentication** – Sign up, log in, and logout securely with JWT cookies.
* 👤 **Profile Management** – Upload and update profile avatars.
* 🖼️ **Post Sharing** – Upload and display posts with images.
* 📱 **Responsive Design** – Fully responsive UI built with Tailwind CSS.
* ⚡ **Optimized Images** – Using Next.js Image component with Cloudinary.
* 🌐 **Environment Configurations** – Configured with `.env` for secure deployments.

---

## Future Scope

* 👍 **Like System** – Allow users to like posts.
* 💬 **Comments** – Enable users to comment on posts.
* 🏘️ **Communities** – Create and join interest-based groups.
* 🔔 **Notifications** – Real-time updates for likes, comments, and follows.
* 🌍 **Social Integration** – Share posts to external platforms.

---

## Project Structure

```
Sparkl/
│
├── public/                  # Static assets (images, icons, etc.)
│   └── images/              # Default profile/logo images
│
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/             # API routes
│   │   │   ├── auth/        # Authentication (login, logout, signup)
│   │   │   └── users/       # User-related endpoints
│   │   ├── components/      # Reusable UI components
│   │   ├── profile/         # User profile pages
│   │   └── page.tsx         # Main entry point
│   │
│   ├── dbConfig/            # MongoDB connection setup
│   ├── models/              # Mongoose schemas (User, Post, etc.)
│   └── utils/               # Utility functions (JWT, middleware, etc.)
│
├── .env                     # Environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

---

## Tech Stack

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Backend:** Next.js API Routes, Node.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT (JSON Web Tokens), nodemailer(for verifying account)
* **Hosting:** Vercel

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Vineetpandey0/Sparkl.git
cd Sparkl

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run the development server
npm run dev
```

---

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## License

This project is licensed under the **MIT License**.


✨ Built with Next.js, Tailwind CSS, and ❤️ by Vineet Pandey
