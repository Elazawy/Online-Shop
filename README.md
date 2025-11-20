# 🛒 Online Shop - Full-Stack E-Commerce Platform

> A production-ready e-commerce web application built with Node.js, Express, MongoDB, and EJS. Features secure authentication, complete shopping cart functionality, and a comprehensive admin management system.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database Schemas](#-database-schemas)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)
- [Why This Project](#-why-this-project)

---

## 🎯 Overview

This online shop is a comprehensive e-commerce platform that enables users to browse products, manage shopping carts, place orders, and track purchases. The application implements secure authentication with OAuth support, role-based access control, and a complete admin panel for product and order management.

**Built with the MVC (Model-View-Controller)** architecture, the application ensures clean code separation, maintainability, and scalability. It incorporates session-based authentication, input validation, rate limiting, and other security best practices suitable for production environments.

**Live Demo:** *Coming Soon*

---

## ✨ Key Features

### Customer Experience
- **Product Catalog** - Browse products with category filtering (Shirts, Pants, Shoes, Other)
- **Product Details** - View comprehensive product information with images and descriptions
- **Shopping Cart** - Full cart management including add, update quantity, and remove items
- **Secure Checkout** - Place orders with delivery address specification
- **Order Tracking** - Monitor order status and view complete purchase history
- **Multi-Auth Support** - Email/password, GitHub OAuth, and Google OAuth login
- **Password Recovery** - Reset password via secure email link
- **Responsive Design** - Mobile-first Bootstrap interface optimized for all devices

### Administration
- **Product Management** - Add products with images, descriptions, pricing, and categories
- **Order Dashboard** - View and manage all orders with status filtering (Pending, Sent, Completed)
- **Customer Search** - Query orders by customer email
- **Status Updates** - Modify order status and track fulfillment
- **Role-Based Access** - Protected admin routes with authorization middleware

### Security & Performance
- **Password Hashing** - bcrypt encryption for user credentials
- **Session Management** - Persistent sessions stored in MongoDB
- **Rate Limiting** - 200 requests per 10-minute window per IP
- **Input Validation** - express-validator for all user inputs
- **Secure File Uploads** - Multer with file type and size restrictions
- **Response Compression** - Optimized data transfer with compression middleware
- **CORS Protection** - Configured cross-origin resource sharing

---

## 🛠️ Tech Stack

**Backend**
- Node.js - JavaScript runtime
- Express 5.x - Web application framework
- MongoDB - NoSQL database
- Mongoose - ODM for MongoDB
- Passport.js - Authentication middleware (Local, GitHub, Google)
- EJS - Server-side templating engine

**Security**
- bcrypt - Password hashing
- express-validator - Input validation
- express-rate-limit - API rate limiting
- express-session - Session management
- connect-mongodb-session - Session store

**Utilities**
- Multer - File upload handling
- Nodemailer - Email service
- dotenv - Environment configuration
- compression - Response compression
- cors - CORS middleware

**Frontend**
- Bootstrap 5.x - CSS framework
- Font Awesome 6.x - Icon library
- jQuery - DOM manipulation

**Development**
- Nodemon - Auto-restart during development
- Jest - Unit testing framework
- Puppeteer - End-to-end testing

---

## 🏗️ Architecture

This application follows the **Model-View-Controller (MVC)** pattern:

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Routes    │ ◄── Authentication & Validation Middleware
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controllers │ ◄── Business Logic Layer
└──────┬──────┘
       │
       ├──────────────┐
       ▼              ▼
┌──────────┐   ┌──────────┐
│  Models  │   │  Views   │
│(Mongoose)│   │  (EJS)   │
└────┬─────┘   └──────────┘
     │
     ▼
┌──────────┐
│ MongoDB  │
└──────────┘
```

**Key Architectural Decisions:**
- **Separation of Concerns** - Clear boundaries between routing, business logic, and data access
- **Middleware Chain** - Request processing through authentication, validation, and authorization layers
- **Modular Design** - Reusable components and route guards
- **Session-Based Auth** - Traditional session management for server-rendered pages
- **Server-Side Rendering** - EJS templates for SEO-friendly content delivery

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** - Comes with Node.js

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/online-shop.git
   cd online-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the project root directory:

```env
# Server Configuration
PORT=3000

# Database Connection
DB_URI=mongodb://localhost:27017/online-shop
# For MongoDB Atlas:
# DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/online-shop

# Session Secret (generate a strong random string)
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIEINT_SECRET=your-github-oauth-client-secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Email Service (for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# File Upload Configuration
MAX_IMAGE_SIZE=5242880
```

**Setting up OAuth Providers (Optional):**

<details>
<summary><b>GitHub OAuth Setup</b></summary>

1. Navigate to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in application details:
   - **Application name:** Online Shop
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/auth/github/cb`
4. Copy the Client ID and Client Secret to your `.env` file
</details>

<details>
<summary><b>Google OAuth Setup</b></summary>

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Navigate to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configure OAuth consent screen if prompted
6. Set application type to "Web application"
7. Add authorized redirect URI: `http://localhost:3000/auth/google/cb`
8. Copy the Client ID and Client Secret to your `.env` file
</details>

### Running the Application

**Development Mode** (with auto-restart on file changes):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The application will be available at: **http://localhost:3000**

**First-Time Setup:**
1. Navigate to `/signup` to create an account
2. To access admin features, manually set `isAdmin: true` in the MongoDB users collection for your account

---

## 📁 Project Structure

```
online-shop/
│
├── app.js                      # Application entry point & Express configuration
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables (not in repo)
│
├── config/                     # Configuration files
│   └── passport.js            # Passport authentication strategies
│
├── controllers/               # Business logic layer
│   ├── admin.controller.js    # Admin operations (products, orders)
│   ├── auth.controller.js     # Authentication & password reset
│   ├── cart.controller.js     # Shopping cart operations
│   ├── home.controller.js     # Homepage & product listing
│   ├── order.controller.js    # Order placement & management
│   └── product.controller.js  # Product details
│
├── models/                    # Data layer (Mongoose schemas)
│   ├── auth.model.js         # User schema & authentication logic
│   ├── cart.model.js         # Shopping cart schema
│   ├── order.model.js        # Order schema
│   └── products.model.js     # Product schema
│
├── routes/                    # Route definitions
│   ├── guards/               # Authorization middleware
│   │   ├── admin.guard.js    # Admin-only route protection
│   │   └── auth.guard.js     # User authentication checks
│   ├── admin.route.js        # Admin endpoints
│   ├── auth.route.js         # Authentication endpoints
│   ├── cart.route.js         # Cart endpoints
│   ├── home.route.js         # Public endpoints
│   ├── order.route.js        # Order endpoints
│   └── product.route.js      # Product endpoints
│
├── middlewares/               # Custom middleware
│   └── checkImageErrors.js   # File upload validation
│
├── views/                     # EJS templates
│   ├── parts/                # Reusable components
│   │   ├── header.ejs        # HTML head & styles
│   │   ├── navbar.ejs        # Navigation bar
│   │   └── footer.ejs        # Scripts & closing tags
│   ├── index.ejs             # Homepage
│   ├── product.ejs           # Product details
│   ├── cart.ejs              # Shopping cart
│   ├── order.ejs             # Order history
│   ├── login.ejs             # Login page
│   ├── signup.ejs            # Registration page
│   ├── forgot-password.ejs   # Password reset request
│   ├── reset-password.ejs    # Password reset form
│   ├── add-product.ejs       # Admin: Add product
│   ├── manage.ejs            # Admin: Manage orders
│   ├── address.ejs           # Checkout address form
│   ├── error.ejs             # Error page
│   └── not-found.ejs         # 404 page
│
├── assets/                    # Static files
│   ├── css/                  # Bootstrap & custom styles
│   └── js/                   # Client-side JavaScript
│
└── images/                    # Uploaded product images
```

---

## 🔌 API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Homepage with product listing and category filter |
| `GET` | `/product/:id` | Product details page |

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/signup` | Registration page | No |
| `POST` | `/signup` | Create new user account | No |
| `GET` | `/login` | Login page | No |
| `POST` | `/login` | Authenticate user | No |
| `POST` | `/logout` | End session | Yes |
| `GET` | `/auth/github` | Initiate GitHub OAuth | No |
| `GET` | `/auth/github/cb` | GitHub OAuth callback | No |
| `GET` | `/auth/google` | Initiate Google OAuth | No |
| `GET` | `/auth/google/cb` | Google OAuth callback | No |
| `GET` | `/forgot-password` | Password reset request page | No |
| `POST` | `/forgot-password` | Send password reset email | No |
| `GET` | `/reset-password` | Password reset form | No |
| `POST` | `/reset-password` | Update user password | No |

### Shopping Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/cart` | View cart contents | Yes |
| `POST` | `/cart` | Add item to cart | Yes |
| `POST` | `/cart/save` | Update item quantity | Yes |
| `POST` | `/cart/delete` | Remove single item | Yes |
| `POST` | `/cart/deleteAll` | Clear entire cart | Yes |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/order` | View order history | Yes |
| `POST` | `/order/address` | Proceed to checkout (single item) | Yes |
| `POST` | `/order/addressAll` | Proceed to checkout (all items) | Yes |
| `POST` | `/order/add` | Place order | Yes |
| `POST` | `/order/orderall` | Place order for all cart items | Yes |
| `POST` | `/order/cancel` | Cancel specific order | Yes |
| `POST` | `/order/cancelAll` | Cancel all user orders | Yes |

### Admin Panel

| Method | Endpoint | Description | Admin Required |
|--------|----------|-------------|----------------|
| `GET` | `/admin/add` | Add product form | Yes |
| `POST` | `/admin/add` | Create new product | Yes |
| `GET` | `/admin/orders` | View all orders (with status filter) | Yes |
| `POST` | `/admin/orders` | Search orders by email | Yes |
| `POST` | `/admin/orders/edit` | Update order status | Yes |

---

## 🗄️ Database Schemas

### User Model
```javascript
{
  username: String,            // Required
  email: String,              // Required, unique
  password: String,           // Hashed with bcrypt
  isAdmin: Boolean,           // Default: false
  githubId: String,           // For GitHub OAuth (optional)
  googleId: String,           // For Google OAuth (optional)
  reset_token: String,        // Password reset token
  reset_token_expires: Date   // Token expiration timestamp
}
```

### Product Model
```javascript
{
  name: String,               // Product name
  image: String,              // Image filename
  price: Number,              // Product price
  description: String,        // Product description
  category: String            // Category: shirts, pants, shoes, other
}
```

### Cart Item Model
```javascript
{
  name: String,               // Product name
  price: Number,              // Product price
  amount: Number,             // Quantity
  userId: String,             // Reference to User
  productId: String,          // Reference to Product
  email: String,              // User email
  timeStamp: Number           // Creation timestamp
}
```

### Order Model
```javascript
{
  userId: String,             // Reference to User
  productName: String,        // Product name
  amount: Number,             // Quantity ordered
  cost: Number,               // Total cost
  address: String,            // Delivery address
  email: String,              // User email
  status: String,             // Pending, Sent, Completed (default: Pending)
  timeOrderedIn: Date         // Order timestamp (default: now)
}
```

---

## 📸 Screenshots

### Homepage - Product Catalog
![Homepage Screenshot](./screenshots/home.png)
*Browse products with category filtering*

### Product Details
![Product Details Screenshot](./screenshots/product-details.png)
*Detailed product information with add-to-cart functionality*

### Shopping Cart
![Shopping Cart Screenshot](./screenshots/cart.png)
*Manage cart items with quantity updates and checkout options*

### Order History
![Orders Screenshot](./screenshots/orders.png)
*Track orders with real-time status updates*

### Admin Dashboard - Order Management
![Admin Dashboard Screenshot](./screenshots/admin.png)
*Admin panel for managing products and orders*

### Authentication - Login
![Login Screenshot](./screenshots/login.png)
*Secure login with email/password and OAuth options*

---

## 🔮 Future Roadmap

### High Priority
- [ ] **Payment Integration** - Implement Stripe/PayPal checkout
- [ ] **Email Notifications** - Automated order confirmation and status updates
- [ ] **Product Reviews** - Customer rating and review system
- [ ] **Advanced Search** - Full-text search with Elasticsearch
- [ ] **Inventory Management** - Stock tracking and low-stock alerts

### Technical Improvements
- [ ] **Frontend Migration** - Convert from EJS to React/Next.js for SPA experience
- [ ] **GraphQL API** - Implement GraphQL for flexible data queries
- [ ] **Redis Caching** - Cache frequently accessed data for performance
- [ ] **WebSocket Integration** - Real-time order status updates
- [ ] **Comprehensive Testing** - Increase test coverage with Jest and Puppeteer
- [ ] **CI/CD Pipeline** - Automated testing and deployment with GitHub Actions

### Feature Enhancements
- [ ] **Wishlist** - Save products for later
- [ ] **Product Recommendations** - ML-based suggestions
- [ ] **Order Tracking** - Integration with shipping providers
- [ ] **Discount Codes** - Coupon and promotion system
- [ ] **Multi-vendor Support** - Marketplace functionality
- [ ] **Customer Analytics** - Admin dashboard with sales metrics
- [ ] **Bulk Operations** - CSV product import/export
- [ ] **Dark Mode** - UI theme toggle

### UI/UX Improvements
- [ ] **Progressive Web App** - Offline capability and mobile app experience
- [ ] **Advanced Filtering** - Price range, ratings, availability
- [ ] **Image Gallery** - Multiple product images with zoom
- [ ] **Product Comparison** - Side-by-side product comparison tool

---


## 👨‍💻 Author

**Ahmed Elazawy**

- GitHub: [@Elazawy](https://github.com/elazawy)
- LinkedIn: [Ahmed Elazawy](https://www.linkedin.com/in/ahmed-elazawy-1a0928303/)

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) for the robust web framework
- [Passport.js](http://www.passportjs.org/) for flexible authentication
- [Bootstrap](https://getbootstrap.com/) for the responsive CSS framework
- [MongoDB](https://www.mongodb.com/) for the scalable database solution

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Ahmed elazawy]

</div>
