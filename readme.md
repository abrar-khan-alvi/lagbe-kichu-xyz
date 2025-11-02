# Technical Assessment: Full-Stack E-commerce Platform

This repository contains a complete, full-stack e-commerce application built for a technical assessment. It features three distinct user roles (Admin, Seller, Buyer), a full product and order lifecycle, and a secure, scalable architecture using a modern MERN-stack variant (MongoDB, Express, React/Next.js, Node.js).

---

**Test Credentials:**
- **Admin:** `admin@example.com` / `adminpassword`
- **Seller:** (Register a new seller account)
- **Buyer:** (Register a new buyer account)

---

### System Architecture

The application is built with a clean separation between the frontend and backend, following modern best practices for scalability and maintainability.

![System Architecture Diagram](https://github.com/abrar-khan-alvi/lagbe-kichu-xyz/raw/main/system-architecture.png)

---

### Core Features Implemented

The application successfully implements all core requirements specified in the assessment.

#### **Admin Portal**
-   **Secure Admin Login:** Separate login flow for the admin role.
-   **User Management Dashboard:** A protected page where the admin can view all users (buyers and sellers).
-   **Ban/Suspend Functionality:** Admins can change the status of any user from 'active' to 'suspended', which can be used to control their access.

#### **Seller Portal**
-   **Seller Registration & Login:** Dedicated flow for sellers to create and access their accounts.
-   **Secure Product Management Dashboard:** A protected page where sellers can manage their product listings.
-   **Full Product CRUD:** Sellers can Add, View, and Delete their own products. The backend includes ownership verification to prevent sellers from modifying each other's listings.

#### **Buyer Features**
-   **Public Storefront:** A modern, responsive homepage that displays all available products.
-   **Dynamic Product Detail Pages:** Unique, server-rendered pages for each product with detailed information.
-   **Shopping Cart:** Fully client-side cart functionality using Redux, allowing users to add, remove, and adjust item quantities.
-   **Secure Checkout:** Logged-in buyers can place an order by providing a shipping address. The order creation process securely validates product prices on the server to prevent client-side manipulation.

#### **Technical & Architectural Highlights**
-   **Modular, Service-Based Backend:** The Express.js backend is organized by feature, with a clean separation of concerns into controllers, services, models, and routes for high maintainability and scalability.
-   **Secure JWT Authentication:** Implemented a full `accessToken` and `refreshToken` flow. The `refreshToken` is securely sent via an `httpOnly` cookie to mitigate XSS risks **(Bonus Feature)**.
-   **Role-Based Access Control (RBAC):** A robust, reusable `auth` middleware protects all sensitive API endpoints, ensuring users can only access resources permitted by their role.
-   **Persistent Frontend State:** Utilized Redux Toolkit with `redux-persist` to maintain login state across page reloads for a seamless user experience.
-   **Efficient Data Fetching with RTK Query:** Manages all API interactions, caching, and provides automatic UI updates on data mutation (e.g., adding a product instantly updates the list).
-   **Modern Form Handling:** All forms are built with React Hook Form and Zod for performant, schema-based validation on both the client and server.

---

### How to Run the Project Locally

**Prerequisites:**
-   Node.js (v18+)
-   MongoDB running locally

**1. Clone the repository:**
```bash
git clone https://github.com/abrar-khan-alvi/lagbe-kichu-xyz.git
cd lagbe-kichu-xyz
```
2. Backend Setup:
```bash
cd backend
npm install

# Create a .env file and copy the contents of .env.example
npm run dev
The backend server will run on http://localhost:5000.
```
3. Frontend Setup (in a new terminal):
```
cd frontend
npm install
# Create a .env.local file and copy the contents of .env.example
npm run dev
```
The frontend application will run on http://localhost:3000.
4. Seed the Admin User (One-time setup):
To create the initial admin account, run the seeder script from the backend directory.
```
# In the backend terminal
npm run seed
```
You can now log in using the credentials provided at the top of this README.
