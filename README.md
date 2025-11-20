# 🛒 Online Shop - Full-Stack E-Commerce Platform

A modern, full-featured e-commerce web application built with Node.js, Express, MongoDB, and EJS. This project demonstrates professional-grade architecture, authentication workflows, and complete shopping cart functionality with an admin management system.

---

## 📋 Project Overview

This Online Shop is a comprehensive e-commerce platform that allows users to browse products, manage their shopping cart, place orders, and track their purchase history. The application features secure authentication (including OAuth with GitHub and Google), password reset functionality, and a complete admin panel for managing products and orders.

The project follows the **MVC (Model-View-Controller)** architectural pattern, ensuring clean separation of concerns and maintainable code structure. It implements session-based authentication, role-based access control, and includes rate limiting and security best practices.

---

## ✨ Features

### 🛍️ Customer Features
- **Product Browsing**: View all products with category-based filtering (Shirts, Pants, Shoes, Other)
- **Product Details**: Detailed product pages with descriptions, pricing, and images
- **Shopping Cart**: Full cart management with quantity updates and item removal
- **Order Management**: Place orders with delivery addresses and track order status
- **User Authentication**: 
  - Email/password registration and login
  - OAuth integration (GitHub & Google)
  - Password reset via email
- **Order History**: View complete order history with status tracking
- **Responsive Design**: Mobile-first Bootstrap UI that works on all devices

### 👨‍💼 Admin Features
- **Product Management**: Add new products with images, descriptions, and categories
- **Order Management**: 
  - View all orders with filtering by status (Pending, Sent, Completed)
  - Search orders by customer email
  - Update order status
- **Admin Dashboard**: Protected admin routes with role-based access control

### 🔒 Security Features
- Password hashing with bcrypt
- Session management with MongoDB store
- CSRF protection considerations
- Rate limiting (200 requests per 10 minutes)
- Input validation with express-validator
- Secure file uploads with Multer

### ⚡ Performance Features
- Response compression
- Session persistence
- Optimized MongoDB queries
- Image optimization considerations

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.x
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS
- **Authentication**: Passport.js (Local, GitHub, Google OAuth)
- **Session Management**: express-session + connect-mongodb-session
- **Email**: Nodemailer

### Frontend
- **CSS Framework**: Bootstrap 5.x
- **Icons**: Font Awesome 6.x
- **Client-side**: Vanilla JavaScript, jQuery

### Security & Utilities
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Rate Limiting**: express-rate-limit
- **File Upload**: Multer
- **Environment Variables**: dotenv
- **Compression**: compression middleware
- **CORS**: cors

### Development
- **Process Manager**: Nodemon
- **Testing**: Jest, Puppeteer (E2E)

---

## 📁 Project Structure

```
online-shop/
├── controllers/           # Business logic layer
│   ├── admin.controller.js
│   ├── auth.controller.js
│   ├── cart.controller.js
│   ├── home.controller.js
│   ├── order.controller.js
│   └── product.controller.js
├── models/               # Data models (Mongoose schemas)
│   ├── auth.model.js
│   ├── cart.model.js
│   ├── order.model.js
│   └── products.model.js
├── routes/               # Route definitions
│   ├── guards/          # Route protection middleware
│   │   ├── admin.guard.js
│   │   └── auth.guard.js
│   ├── admin.route.js
│   ├── auth.route.js
│   ├── cart.route.js
│   ├── home.route.js
│   ├── order.route.js
│   └── product.route.js
├── views/                # EJS templates
│   ├── parts/           # Reusable components
│   │   ├── header.ejs
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── add-product.ejs
│   ├── cart.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── order.ejs
│   └── [other views...]
├── config/               # Configuration files
│   └── passport.js      # Passport authentication strategies
├── middlewares/          # Custom middleware
│   └── checkImageErrors.js
├── assets/               # Static assets (CSS, JS, images)
├── images/               # Uploaded product images
├── app.js               # Application entry point
├── package.json
└── .env                 # Environment variables (not in repo)
```

### Key Directories Explained

- **controllers/**: Contains business logic for handling requests and responses
- **models/**: Mongoose schemas defining data structure and database operations
- **routes/**: Express route handlers with middleware chains
- **routes/guards/**: Authentication and authorization middleware
- **views/**: EJS templates for server-side rendering
- **config/**: Application configuration (Passport strategies, etc.)
- **middlewares/**: Custom Express middleware functions

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/online-shop.git
   cd online-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the root directory with the following variables:
   
   ```env
   # Server Configuration
   PORT=3000
   
   # Database
   DB_URI=mongodb://localhost:27017/online-shop
   # Or use MongoDB Atlas:
   # DB_URI=mongodb+srv://username:password@cluster.mongodb.net/online-shop
   
   # Session Secret
   SESSION_SECRET=your-super-secret-session-key-change-this
   
   # OAuth - GitHub
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIEINT_SECRET=your-github-client-secret
   
   # OAuth - Google
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Email Configuration (for password reset)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   
   # File Upload
   MAX_IMAGE_SIZE=5242880
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```

5. **Run the application**
   
   **Development mode** (with auto-restart):
   ```bash
   npm run dev
   ```
   
   **Production mode**:
   ```bash
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### OAuth Setup (Optional)

To enable GitHub/Google login:

1. **GitHub OAuth**:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Set callback URL: `http://localhost:3000/auth/github/cb`
   - Copy Client ID and Secret to `.env`

2. **Google OAuth**:
   - Go to Google Cloud Console
   - Create new project and enable Google+ API
   - Create OAuth 2.0 credentials
   - Set callback URL: `http://localhost:3000/auth/google/cb`
   - Copy Client ID and Secret to `.env`

---

## 📸 Screenshots

### Homepage - Product Listing
![Homepage Screenshot](./screenshots/home.png)
*Browse products with category filtering*

### Product Details
![Product Details Screenshot](./screenshots/product-details.png)
*Detailed product information with add-to-cart functionality*

### Shopping Cart
![Shopping Cart Screenshot](./screenshots/cart.png)
*Manage cart items with quantity updates*

### Order Management
![Orders Screenshot](./screenshots/orders.png)
*Track order history and status*

### Admin Dashboard
![Admin Dashboard Screenshot](./screenshots/admin.png)
*Admin panel for product and order management*

### Authentication
![Login Screenshot](./screenshots/login.png)
*Secure login with OAuth options*

---

## 🔌 API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Homepage with product listing |
| GET | `/product/:id` | Product details page |

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/signup` | Signup page |
| POST | `/signup` | Create new account |
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| POST | `/logout` | End user session |
| GET | `/auth/github` | GitHub OAuth |
| GET | `/auth/google` | Google OAuth |
| GET | `/forgot-password` | Password reset request |
| POST | `/forgot-password` | Send reset email |
| GET | `/reset-password` | Reset password page |
| POST | `/reset-password` | Update password |

### Cart Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | View shopping cart |
| POST | `/cart` | Add item to cart |
| POST | `/cart/save` | Update cart item quantity |
| POST | `/cart/delete` | Remove item from cart |
| POST | `/cart/deleteAll` | Clear entire cart |

### Order Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/order` | View order history |
| POST | `/order/address` | Checkout single item |
| POST | `/order/addressAll` | Checkout all cart items |
| POST | `/order/add` | Place order |
| POST | `/order/orderall` | Order all cart items |
| POST | `/order/cancel` | Cancel order |
| POST | `/order/cancelAll` | Cancel all orders |

### Admin Routes (Protected - Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/add` | Add product page |
| POST | `/admin/add` | Create new product |
| GET | `/admin/orders` | Manage orders |
| POST | `/admin/orders` | Search orders by email |
| POST | `/admin/orders/edit` | Update order status |

---

## 🗄️ Database Models

### User Schema
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (hashed with bcrypt),
  isAdmin: Boolean (default: false),
  githubId: String (for OAuth),
  googleId: String (for OAuth),
  reset_token: String,
  reset_token_expires: Date
}
```

### Product Schema
```javascript
{
  name: String,
  image: String (filename),
  price: Number,
  description: String,
  category: String (shirts, pants, shoes, other)
}
```

### Cart Item Schema
```javascript
{
  name: String,
  price: Number,
  amount: Number,
  userId: String (ref to User),
  productId: String (ref to Product),
  email: String,
  timeStamp: Number
}
```

### Order Schema
```javascript
{
  userId: String (ref to User),
  productName: String,
  amount: Number,
  cost: Number,
  address: String,
  email: String,
  status: String (Pending, Sent, Completed),
  timeOrderedIn: Date (default: now)
}
```

---

## 🔮 Future Improvements

### Technical Enhancements
- [ ] Migrate from EJS to **React/Next.js** for modern SPA experience
- [ ] Implement **GraphQL API** for more efficient data fetching
- [ ] Add **Redis caching** for improved performance
- [ ] Implement **WebSocket** for real-time order updates
- [ ] Add comprehensive **unit and integration tests** (Jest/Mocha)
- [ ] Implement **CI/CD pipeline** with GitHub Actions

### Feature Additions
- [ ] **Payment Integration** (Stripe, PayPal)
- [ ] **Product Reviews & Ratings** system
- [ ] **Advanced Search** with Elasticsearch
- [ ] **Wishlist** functionality
- [ ] **Order Tracking** with shipping API integration
- [ ] **Email Notifications** for order status changes
- [ ] **Product Recommendations** using ML
- [ ] **Multi-vendor Support**
- [ ] **Inventory Management** system
- [ ] **Discount Codes & Promotions**

### UI/UX Improvements
- [ ] **Dark Mode** toggle
- [ ] **Progressive Web App (PWA)** capabilities
- [ ] **Advanced Filtering** (price range, ratings, etc.)
- [ ] **Product Image Gallery** with zoom
- [ ] **Interactive Product Comparisons**

### Admin Enhancements
- [ ] **Analytics Dashboard** with charts
- [ ] **Bulk Product Upload** (CSV/Excel)
- [ ] **Customer Management** interface
- [ ] **Sales Reports** generation

---

## 💡 Why This Project Matters

### Learning Outcomes

This project demonstrates proficiency in building **production-ready full-stack applications** and showcases several critical skills that are highly valued in the software industry:

#### 1. **Full-Stack Development Mastery**
- End-to-end application development from database design to user interface
- RESTful API design and implementation
- Server-side rendering with EJS templates
- Responsive, mobile-first design principles

#### 2. **Authentication & Security**
- Implemented **3 authentication strategies**: local username/password, GitHub OAuth, and Google OAuth
- Secure password hashing and session management
- CSRF protection and rate limiting
- Input validation and sanitization to prevent SQL injection and XSS attacks

#### 3. **Real-World E-Commerce Logic**
- Shopping cart with session persistence
- Order management system with status tracking
- Admin role-based access control
- File upload handling for product images

#### 4. **Scalable Architecture**
- **MVC pattern** for maintainable, organized code
- Middleware chaining for request processing
- Modular route protection with custom guards
- Database indexing and query optimization

#### 5. **Professional Development Practices**
- Environment-based configuration management
- Error handling and validation throughout the application
- Code reusability through shared components
- Git version control with meaningful commits

### Real-World Relevance

This project simulates a **complete e-commerce platform** similar to those used by thousands of businesses worldwide. The technical stack and architectural decisions reflect current industry standards:

- **Node.js + Express**: Powers platforms like Netflix, LinkedIn, and Uber
- **MongoDB**: Used by enterprises like eBay, Cisco, and Adobe
- **OAuth Integration**: Standard authentication method across the web
- **Session-based Authentication**: Common pattern for traditional web applications

### Career Impact

Building this project demonstrates:
- **Problem-solving ability**: Handling complex user workflows
- **Attention to detail**: Input validation, error handling, security
- **Full development cycle experience**: From requirements to deployment
- **Understanding of business logic**: E-commerce flows, user roles, order management

This is the type of project that hiring managers look for — not a simple CRUD app, but a **comprehensive application** that shows you can build real products that solve actual business problems.

---

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Passport.js community for authentication strategies
- MongoDB team for the powerful database
- Express.js maintainers for the robust web framework

---

**⭐ If you find this project helpful, please consider giving it a star!**
