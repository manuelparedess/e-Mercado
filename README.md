# 🛒 e-Mercado

**e-Mercado** is an e-commerce platform built with the **MERN** stack (MongoDB, Express, React, Node.js). It offers a complete experience for users who want to buy or sell products, leave reviews, and manage their accounts. The project includes traditional and Google authentication, favorites, and a shopping cart.

---

## 🚀 Technologies Used

- **Frontend:**
  - React.js
  - React Router DOM
  - Context API
  - Material UI
  - SweetAlert2
  - @react-oauth/google (Google Login)
  - Animate.css

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB + Mongoose
  - JWT (JSON Web Token) for authentication
  - Multer (file uploads)
  - CORS / dotenv / bcrypt

---

## 🔐 Autenticación

- Email & password authentication
- Authentication with **Google**
- JWT-based protected routes
- Session control in frontend and backend
- Auth context and middleware


---

## 🧑‍💻 User Roles

- **Registered User:**
  - Add/remove favorites
  - Add to cart
  - Buy products
  - Leave product reviews
  - Manage personal profile

- **Without logging in:**
  - Search for products
  - View categories
  - View other user profiles
  - Visit the contact page

---

## 📦 Core Features

- 🛍️ **Product catalog** with search, filters and categories
- 🛒 **Shopping cart**
- ❤️ **Favorites system**
- 📝 **Reviews** with rating, name, date, and comment
- 👤 **User profile** with editable data and address
- 📞 **Contact page**
- ❓ **Help / FAQ section**
- ⚠️ **Custom 404 Not Found page**

---

## 📁 Project Structure

```
src/
├── api/
│    ├── auth/  
│    ├── product/
│    └── user/
├── components/
│    ├── common/
│    └── modules/
├── context/
│    ├── AuthContext.jsx
│    ├── ProductContext.jsx
│    └── UserContext.jsx
├── layout/
│    └── Layout.jsx
├── pages/
│    ├── Auth
│    ├── Product
│    ├── User
│    └── MainScreen.jsx
├── router/
│    ├── routes
│    │    ├── PublicRoutes.jsx
│    │    ├── PrivateRoutes.jsx
│    │    └── NotFound.jsx
│    └── router.jsx
└── main.jsx

```
---

## 🖥️ Key Routes

| Route            | Description               |
|------------------|---------------------------|
| `/`              | Home & product catalog    |
| `/product/:id`   | Product details page      |
| `/login`         | Login page                |
| `/register`      | Registration page         |
| `/cart`          | Shopping cart             |
| `/favorites`     | Favorite products         |
| `/product/sell`  | To sell products          |
| `/user/:id`      | User profile              |
| `/help`          | FAQ (Help) page           |
| `/contact`       | Contact page              |

---

## 🧑 Author

**Manuel Paredes**  
*Full Stack Developer (MERN)*

- 💼 [LinkedIn](https://www.linkedin.com/in/manuel-paredes-dev)
- 💻 [GitHub](https://github.com/manuelparedess)
- 📧 luisparedescuenca@gmail.com