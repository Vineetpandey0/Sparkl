# Sparkl

<div align="center">

**Share moments, build connections, and grow your community — powered by modern web technology.**
---

🚀 **Live Website:** [Visit Sparkl](https://sparkl-share.vercel.app/)


[Features](#features) • [Core Formula](#core-formula) • [Use Cases](#use-cases) • [Quick Start](#quick-start) • [Architecture](#project-structure) • [Contributing](#contributing)

</div>

---

## What is Sparkl?

**Sparkl** is a modern social sharing platform that gives every user the three things they need to build an online presence — a **secure account**, a **personalised profile**, and a **post feed** — all wrapped in a fast, responsive interface.

```
Sign Up  +  Build Profile  +  Share Posts  →  Your Social Presence
```

No complex setup. No bloated features. Just create an account and Sparkl handles:

- 🔐 **Authentication** — Secure JWT-based sign-up, login, and session management
- 👤 **Profile Management** — Upload and update avatars with a personalised public profile
- 🖼️ **Post Sharing** — Upload images and share posts visible to your community
- 📱 **Responsive UI** — A clean, mobile-first interface that works on every screen size

---

## Core Formula

Sparkl is built around three core pillars that drive every user interaction:

### Pillar 1 — Secure Authentication
Every session on Sparkl is protected end-to-end. The auth layer handles:
- JWT-based login with secure HTTP-only cookie storage
- Account verification via nodemailer email flow
- Protected route middleware guarding all private pages
- Stateless session handling — no server-side session store required

**Example flow:**
> *User signs up → receives verification email → confirms account → logs in → receives JWT cookie → accesses dashboard*

---

### Pillar 2 — Profile Management
Every Sparkl user gets a personalised public profile. The profile engine:
- Accepts avatar image uploads and stores them via Cloudinary CDN
- Displays user metadata (username, join date, post count) on a public profile page
- Allows users to update their avatar at any time
- Falls back to a default avatar for users who haven't uploaded one

---

### Pillar 3 — Post Sharing
The heart of Sparkl is its post feed. The post system:
- Accepts image uploads with automatic Cloudinary optimisation
- Displays posts in a clean, scrollable feed for all users
- Preserves image quality with Next.js Image component optimisation
- Serves all media via Cloudinary CDN for fast global delivery

---

### Output — A Live Social Feed

| Content Type | Format | Storage | Visibility |
|---|---|---|---|
| Profile Avatar | PNG / JPEG / WebP | Cloudinary CDN | Public |
| Post Image | PNG / JPEG / WebP | Cloudinary CDN | Public |
| User Profile Page | Server-rendered HTML | MongoDB | Public |
| Post Feed | Server-rendered HTML | MongoDB | Public |

Every user gets a public profile URL and a personal post history from day one.

---

## Platform Pipeline

Sparkl processes every user action through a clean 5-stage flow:

### Stage 1 — Authentication & Verification
The user submits credentials to the Next.js API auth route. Passwords are hashed, accounts are flagged as unverified, and a verification email is dispatched via nodemailer. On confirmation, the account is activated.

### Stage 2 — Session Management
On successful login, a signed JWT is issued and stored as an HTTP-only cookie. Middleware on every protected route validates the token and extracts the user identity — no session store, no database lookup on every request.

### Stage 3 — Asset Upload
User-submitted images (avatars and post images) are streamed to Cloudinary through the Next.js API upload route. Cloudinary handles resizing, format conversion, and CDN distribution automatically.

### Stage 4 — Data Persistence
User records and post metadata are stored in MongoDB via Mongoose schemas. User documents reference their Cloudinary avatar URL. Post documents reference the author and the Cloudinary image URL.

### Stage 5 — Feed Rendering
The main feed and profile pages are rendered server-side using Next.js, pulling posts and user data from MongoDB. Images are delivered via the Next.js Image component with Cloudinary as the remote image source.

---

## Features

### Authentication Engine
A complete, production-ready auth flow with no third-party auth service required.
- JWT-based login with secure HTTP-only cookie storage
- Sign-up with email verification via nodemailer
- Protected route middleware for all dashboard and profile pages
- Automatic redirect to login for unauthenticated users

### Profile Management
A fully personalised profile for every user on the platform.
- Avatar upload with Cloudinary storage and optimisation
- Public profile page displaying user info and posts
- One-click avatar update without re-authentication
- Default fallback avatar for users without a custom image

### Post Sharing Engine
The core content layer — clean, fast, and media-first.
- Image upload with automatic Cloudinary processing
- Post feed displaying all user content in chronological order
- Author attribution on every post with profile link
- Persistent post history on each user's public profile

### Responsive Design System
A mobile-first UI that works flawlessly on every device and screen size.
- Tailwind CSS utility-first styling for consistent visual language
- Fluid layouts that adapt from 320px mobile to 4K desktop
- Next.js Image component for automatic responsive image sizing
- Consistent typography and spacing across all breakpoints

### Optimised Media Delivery
Every image on Sparkl is fast — no matter where the user is.
- Cloudinary CDN for global low-latency image delivery
- Automatic WebP conversion and format optimisation by Cloudinary
- Next.js Image component with lazy loading and blur placeholders
- Configurable remote image domains in next.config.js

### Environment & Deployment Configuration
Production-ready configuration for secure, repeatable deployments.
- `.env` file structure for all secrets and API keys
- Vercel-optimised Next.js configuration out of the box
- MongoDB connection pooling via Mongoose for serverless environments
- next.config.js with Cloudinary domain allowlist and image rules

### Secure API Layer
Every API route is protected and purpose-built.
- `/api/auth/signup` — account creation with password hashing
- `/api/auth/login` — credential validation and JWT issuance
- `/api/auth/logout` — cookie clearing and session termination
- `/api/users/` — profile update and avatar management endpoints

### Developer-Friendly Stack
Built for maintainability, type safety, and fast iteration.
- Full TypeScript throughout — strict types on all models and API handlers
- Mongoose schemas for User and Post with clear field definitions
- Utility functions for JWT signing, verification, and middleware composition
- ESLint and Prettier configured for consistent code style

---

## Content Format Matrix

| Content Type | Supported Formats | Storage Provider | CDN Delivery |
|---|---|---|---|
| Profile Avatar | PNG / JPEG / WebP | Cloudinary | ✅ |
| Post Image | PNG / JPEG / WebP | Cloudinary | ✅ |
| User Data | JSON (MongoDB) | MongoDB Atlas | — |
| Post Metadata | JSON (MongoDB) | MongoDB Atlas | — |
| Static Assets | PNG / SVG / ICO | Vercel / Public | ✅ |
| Fonts | WOFF2 | Next.js / Google Fonts | ✅ |

---

## Use Cases

### Personal User — Build a Public Portfolio
A photographer creates a Sparkl account, uploads their best shots as posts, and shares their public profile link in their bio. Their work is live, fast, and CDN-delivered — without building a personal site from scratch.

**Key benefits:** Zero-cost hosting, instant public profile, optimised image delivery.

---

### Developer — Learn Full-Stack Patterns
A developer studying Next.js uses Sparkl as a reference implementation for JWT auth, MongoDB integration, file upload pipelines, and protected API routes — all in one production-quality codebase.

**Key benefits:** Clean code structure, TypeScript throughout, real-world patterns without framework magic.

---

### Community Builder — Launch a Niche Sharing Platform
A community manager forks Sparkl to build a niche image-sharing platform for their audience. The core loop — sign up, post, browse — is already built. They customise the theme, adjust the schema, and ship a branded product in days.

**Key benefits:** Fully open-source, MIT licensed, minimal dependencies, easy to fork and extend.

---

### Student / Bootcamp Graduate — Portfolio Project
A bootcamp graduate deploys Sparkl on Vercel as a showcase project demonstrating end-to-end full-stack skills: auth, database, file upload, REST API, and responsive UI — all in one deployable application.

**Key benefits:** Vercel one-click deploy, environment variable configuration, production-ready patterns.

---

### Brand / Creator — Content Hub
A content creator uses Sparkl as a lightweight hub to centralise their visual posts, separate from algorithm-driven social platforms. They own the data, control the feed, and share a clean profile URL with their audience.

**Key benefits:** No algorithm, full data ownership, clean shareable profile URL.

---

### Agency — Client Starter Template
A web agency uses Sparkl as a starter template for client social or community platforms. The auth, user, and post primitives are production-ready — the agency layers on branding and client-specific features without building from scratch.

**Key benefits:** Production-ready auth and upload pipeline, TypeScript safety, fast client delivery.

---

### Open Source Contributor — Feature Development
A developer contributes to Sparkl's roadmap by implementing planned features — likes, comments, communities, or notifications — using the existing clean architecture as a base. Clear models and API structure make contributions straightforward.

**Key benefits:** Clean contribution surface, MIT license, clear roadmap, active GitHub repo.

---

### Small Team — Internal Image Sharing Tool
A small team deploys a private Sparkl instance for internal asset sharing — design work, screenshots, and visuals — replacing ad-hoc Slack image drops with a browsable, searchable internal feed.

**Key benefits:** Self-hostable, private MongoDB instance, JWT auth, no third-party dependency.

---

## Tech Stack

| Layer | Technology / Service |
|---|---|
| Frontend framework | Next.js (App Router) |
| UI language | React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes (Node.js) |
| Database | MongoDB with Mongoose |
| Authentication | JWT + nodemailer email verification |
| Media hosting & CDN | Cloudinary |
| Hosting | Vercel |

---

## Competitive Position

| Capability | Sparkl | Reddit | Instagram | Custom Build |
|---|---|---|---|---|
| Self-hostable & open source | ✅ | ❌ | ❌ | ✅ |
| JWT auth with email verification | ✅ | N/A | N/A | ✅ |
| Cloudinary CDN image delivery | ✅ | Partial | ✅ | Manual |
| Zero algorithm, full data ownership | ✅ | ❌ | ❌ | ✅ |
| TypeScript + MongoDB starter | ✅ | N/A | N/A | Manual |
| Deployable in under 10 minutes | ✅ | ❌ | ❌ | Days |
| MIT licensed & forkable | ✅ | ❌ | ❌ | ✅ |
| No third-party auth service needed | ✅ | N/A | N/A | ✅ |

---

## Quick Start

### Prerequisites

- **Node.js** 18+ (Next.js 14 requirement)
- **npm** 9+ or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Accounts and credentials for:
  - MongoDB Atlas (database)
  - Cloudinary (media hosting)
  - An SMTP email provider (nodemailer for verification)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vineetpandey0/Sparkl.git
   cd Sparkl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Configure the following in `.env`:
   ```env
   # Next.js
   NEXT_PUBLIC_API_URL=http://localhost:3000

   # MongoDB
   MONGO_URI=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret

   # Nodemailer (Email Verification)
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=587
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000` and start sharing!

### Basic Usage

1. **Sign Up**
   - Create an account with your email and password
   - Verify your email via the confirmation link sent to your inbox

2. **Set Up Your Profile**
   - Upload a profile avatar from your dashboard
   - Your public profile page is instantly live at `/profile/[username]`

3. **Share a Post**
   - Click "New Post" from your dashboard
   - Upload an image and submit
   - Your post appears in the main feed immediately

4. **Browse the Feed**
   - View all posts from all users on the home feed
   - Click any avatar or username to visit a user's public profile

---

## Project Structure

```
📦 Sparkl
├── 📂 public/                       # Static assets
│   └── 📂 images/                   # Default profile and logo images
│
├── 📂 src/
│   ├── 📂 app/                      # Next.js app router
│   │   ├── 📂 api/                  # API routes
│   │   │   ├── 📂 auth/             # Authentication endpoints
│   │   │   │   ├── login/           # Login route
│   │   │   │   ├── logout/          # Logout route
│   │   │   │   └── signup/          # Sign-up route
│   │   │   └── 📂 users/            # User-related endpoints
│   │   │       └── route.ts         # Profile update, avatar upload
│   │   ├── 📂 components/           # Reusable UI components
│   │   │   ├── Navbar.tsx           # Navigation bar
│   │   │   ├── PostCard.tsx         # Individual post display card
│   │   │   ├── ProfileHeader.tsx    # User profile header block
│   │   │   └── UploadForm.tsx       # Image upload form component
│   │   ├── 📂 profile/              # User profile pages
│   │   │   └── 📂 [username]/       # Dynamic profile route
│   │   │       └── page.tsx
│   │   └── page.tsx                 # Main home feed entry point
│   │
│   ├── 📂 dbConfig/                 # MongoDB connection setup
│   │   └── dbConfig.ts              # Mongoose connect utility
│   ├── 📂 models/                   # Mongoose schemas
│   │   ├── userModel.ts             # User schema (name, email, avatar, etc.)
│   │   └── postModel.ts             # Post schema (author, image URL, etc.)
│   └── 📂 utils/                    # Utility functions
│       ├── jwt.ts                   # JWT sign and verify helpers
│       ├── middleware.ts            # Auth middleware for protected routes
│       └── mailer.ts               # Nodemailer email dispatch utility
│
├── .env                             # Environment variables (not in repo)
├── .gitignore                       # Git ignore rules
├── next.config.js                   # Next.js configuration (image domains, etc.)
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

### Key Directories

- **`app/`** — Next.js 13+ App Router pages and API routes
- **`app/components/`** — Reusable UI components used across pages
- **`models/`** — Mongoose data schemas for User and Post
- **`utils/`** — JWT helpers, auth middleware, and email utilities
- **`dbConfig/`** — MongoDB connection and pooling setup
- **`public/`** — Static assets served directly

---

## Technology Stack

### Frontend
- **Next.js 14** — React framework with App Router and server components
- **React 18** — Modern UI library with hooks and concurrent features
- **TypeScript** — End-to-end type safety across components and API handlers
- **Tailwind CSS** — Utility-first styling for rapid, consistent UI development

### Backend & APIs
- **Next.js API Routes** — Serverless functions for auth, upload, and user management
- **Node.js** — Runtime for all API route execution
- **Mongoose** — MongoDB ODM for schema definition and query building
- **Axios** — HTTP client for client-side API requests

### Authentication & Storage
- **JWT (jsonwebtoken)** — Stateless token-based session management
- **nodemailer** — SMTP email dispatch for account verification flows
- **bcryptjs** — Password hashing before database storage
- **Cloudinary** — Cloud media storage, optimisation, and CDN delivery

### Development Tools
- **ESLint** — Code quality and linting enforcement
- **Prettier** — Automatic code formatting
- **TypeScript** — Static type checking across the entire codebase
- **PostCSS** — CSS transformation pipeline for Tailwind
- **Node.js 18+** — Runtime environment

---

## Key Libraries & Their Usage

**jsonwebtoken** handles the creation and verification of JWT tokens issued at login and validated by middleware on every protected API route and page.

**Mongoose** defines the User and Post data schemas, handles MongoDB connection pooling, and provides a clean query interface for all database interactions across the API layer.

**Cloudinary** receives uploaded avatar and post images via the server-side upload API route, stores and optimises them, and returns a CDN URL that is saved in MongoDB and rendered via the Next.js Image component.

**nodemailer** sends account verification emails on sign-up, dispatching a unique token link that must be confirmed before the account is activated and login is permitted.

**Tailwind CSS** powers the entire UI with utility classes — no custom CSS files, no naming conventions, no style conflicts. **TypeScript** enforces type safety on all Mongoose models, API request/response shapes, and component props.

---

## REST API

### Sign Up
**`POST /api/auth/signup`**

Create a new user account. Triggers an email verification dispatch.

```javascript
// Request
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'vineet',
    email: 'vineet@example.com',
    password: 'securepassword123'
  })
});

// Response
{
  "message": "Account created. Please verify your email.",
  "userId": "u_abc123"
}
```

### Upload Post
**`POST /api/users/upload`**

Upload an image to create a new post. Requires a valid JWT cookie.

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/users/upload', {
  method: 'POST',
  body: formData
});

// Response
{
  "postId": "post_xyz789",
  "imageUrl": "https://res.cloudinary.com/your_cloud/image/upload/post_xyz789",
  "createdAt": "2025-03-30T08:00:00Z"
}
```

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000

# MongoDB
MONGO_URI=your_mongodb_connection_string_here

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (Media Hosting)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Nodemailer (Email Verification)
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your_email_address@example.com
EMAIL_PASS=your_email_password_or_app_password
```

### Getting API Keys

**MongoDB Atlas:**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster and database user
3. Copy the connection string to `MONGO_URI`

**Cloudinary:**
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get credentials from Account Settings → API Keys
3. Add cloud name, API key, and secret to `.env`

**Nodemailer:**
1. Use any SMTP provider (Gmail, Resend, Mailgun, etc.)
2. For Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Set `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, and `EMAIL_PASS`

### Next.js Configuration

Edit `next.config.js` to customise:
- Cloudinary remote image domain allowlist
- API rewrites and middleware rules
- Environment-specific build settings
- TypeScript and ESLint build behaviour

---

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

> This project uses the **Next.js App Router** with TypeScript for fully typed server components, API routes, and client components throughout the codebase.

### File Organisation

- Create new UI components in `/src/app/components`
- Add new Mongoose schemas in `/src/models`
- Store utility functions in `/src/utils`
- API routes go in `/src/app/api`

### Code Style

This project uses ESLint and Prettier for code quality and formatting. Run `npm run lint` to check for issues before committing.

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Set all environment variables from your `.env`
4. Deploy with one click

```bash
vercel deploy
```

### Deploy to Other Platforms

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Manual Deployment:**
```bash
npm run build
npm start
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### MongoDB Connection Issues
- Verify `MONGO_URI` is correct and the cluster is running
- Check that your IP address is whitelisted in MongoDB Atlas Network Access
- Ensure the database user has read/write permissions

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

For more help, see [Next.js Documentation](https://nextjs.org/docs)

---

## Contributing

Contributions from the community are warmly welcomed! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Commit** with clear messages (`git commit -m 'Add amazing feature'`)
5. **Push** to your branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style (ESLint + Prettier)
- Write meaningful, descriptive commit messages
- Update documentation for any new features or changed behaviour
- Test changes locally and verify build passes before submitting PR

For detailed guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Roadmap

- [ ] Like system for posts
- [ ] Comments on posts
- [ ] Interest-based communities
- [ ] Real-time notifications (likes, comments, follows)
- [ ] Social sharing to external platforms
- [ ] Follow / following system between users
- [ ] Post search and discovery by tag or keyword
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Direct messaging between users

---

## Support & Resources

- 📖 **Documentation** — See `/docs` for detailed guides
- 🐛 **Report Issues** — [GitHub Issues](https://github.com/Vineetpandey0/Sparkl/issues)
- 💬 **Discussions** — [GitHub Discussions](https://github.com/Vineetpandey0/Sparkl/discussions)
- 🌐 **Live Demo** — [sparkl-share.vercel.app](https://sparkl-share.vercel.app/)

---

## License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) file for details.

---

## Maintainer

**Vineet Pandey**  
GitHub: [@Vineetpandey0](https://github.com/Vineetpandey0)

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org) and the App Router
- Database powered by [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and [Mongoose](https://mongoosejs.com)
- Authentication via [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) and [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- Email verification by [nodemailer](https://nodemailer.com)
- Media hosting and CDN by [Cloudinary](https://cloudinary.com)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Type safety via [TypeScript](https://www.typescriptlang.org)
- Deployed on [Vercel](https://vercel.com)

---

<div align="center">

⭐ If you find this project helpful, please consider giving it a star!

[Back to Top](#sparkl)

</div>
