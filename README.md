# BookEase Backend

Robust REST API for the BookEase flight booking platform. Built with Node.js, Express, and Prisma.

## Technology Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js (v5)
-   **Database ORM**: Prisma (v6) - Type-safe database access
-   **Language**: TypeScript
-   **Security**:
    -   `helmet` - HTTP headers security
    -   `bcryptjs` - Password hashing
    -   `jsonwebtoken` (JWT) - Authentication
    -   `express-rate-limit` - Rate limiting
    -   `cors` - Cross-Origin Resource Sharing
-   **Documentation**: Swagger (`swagger-jsdoc`, `swagger-ui-express`)
-   **Logging**: Morgan

## API Features

-   **Authentication**: Register, Login, Get Current User (Me)
-   **Services (Flights)**: CRUD operations for flight services
-   **Bookings**: Manage flight bookings and status updates
-   **Users**: Admin management of user accounts and roles

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Database Setup**
    Ensure you have a database configured in your `.env` file (e.g., MySQL/PostgreSQL).
    ```bash
    npx prisma generate
    npx prisma db push
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The server typically runs on port `3000` (or as defined in `.env`).

4.  **View API Documentation**
    Visit `http://localhost:3000/api-docs` (if Swagger is configured at that route) to see the interactive API documentation.

## Scripts

-   `npm run dev` - Start development server with hot-reload (`ts-node-dev`)
-   `npm run build` - Compile TypeScript to JavaScript
-   `npm start` - Run the production build
