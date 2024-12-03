# Role-Based Access Control (RBAC) System

## Project Description

This project implements a Role-Based Access Control (RBAC) system using Node.js, Express, MongoDB, and JSON Web Tokens (JWT). The system allows different users with specific roles to access certain routes, ensuring that sensitive data and actions are protected based on the user's role (Admin, Manager, User).

### Features:
- **Authentication**: User login and registration with JWT token-based authentication.
- **Authorization**: Only users with certain roles (Admin, Manager, User) can access specific routes.
- **Role-based Routes**:
  - Admins can access `/api/admin`.
  - Managers and Admins can access `/api/manager`.
  - Admins, Managers, and Users can access `/api/user`.

## How to Run the Project

### Prerequisites:
- Node.js (v14 or later)
- MongoDB (local or MongoDB Atlas)
- Postman or similar tool to test API requests

### Steps:
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Agrit-Garg/RBAC.git
    cd RBAC
    ```

2. **Install Dependencies**:
    Make sure you have `npm` installed, then run:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    CONNECTION_STRING=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    PORT=8000
    ```

4. **Start the Server**:
    Run the following command to start the server:
    ```bash
    npm start
    ```

    The server will be running on `http://localhost:8000`.

5. **Test the API**:
    You can now test the API endpoints using Postman or any other API testing tool.

## Project Structure

- **models/**: Contains MongoDB schema definitions (e.g., `userModel.js`).
- **middlewares/**: Contains middleware functions for verifying JWT tokens (`authMiddleware.js`) and authorizing user roles (`roleMiddleware.js`).
- **controllers/**: Contains functions that handle the logic for authentication (login, register) in `authControllers.js`.
- **routes/**: Contains route definitions for authentication (`authRoutes.js`) and user-related routes (`userRoutes.js`).
- **config/**: Contains the database connection logic (`dbConnect.js`).

## Role-Based Access Control (RBAC)

### User Roles:
1. **Admin**: Has full access to all routes.
2. **Manager**: Can access both `/api/manager` and `/api/user` routes.
3. **User**: Can only access `/api/user` route.

### API Routes:
- **/api/auth/register**: Registers a new user (can be accessed by anyone).
- **/api/auth/login**: Logs in a user and generates a JWT token (can be accessed by anyone).
- **/api/admin**: Access restricted to Admins only (requires a valid JWT token with the `admin` role).
- **/api/manager**: Access restricted to Admins and Managers (requires a valid JWT token with the `admin` or `manager` role).
- **/api/user**: Access restricted to Admins, Managers, and Users (requires a valid JWT token with any of these roles).

### Authorization Flow:
1. **Register**: A new user can be registered with a specific role (Admin, Manager, User).
2. **Login**: The user logs in with their username and password to receive a JWT token.
3. **Accessing Routes**: The token is included in the `Authorization` header of the request as `Bearer <token>`. Based on the role associated with the token, users will be granted or denied access to specific routes.

## Technologies Used:
- **Node.js**: Backend JavaScript runtime
- **Express.js**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database to store user data
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization
- **Bcrypt.js**: For hashing user passwords

## Error Handling:
- If the token is not provided or invalid, the system will respond with an appropriate error message (`401 Unauthorized`, `403 Forbidden`).
- If the user tries to access a route without having the required role, a `403 Access Denied` message will be returned.


