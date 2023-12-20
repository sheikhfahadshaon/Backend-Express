# Express Prisma SQLite Backend for User Notes

This repository contains a simple backend application built using Express.js, Prisma, SQLite, JSON Web Tokens (JWT), Zod for validation, and bcrypt for password hashing. The application enables users to manage notes after creating an account.

## Features

- User Authentication: Create an account, login/logout securely using JWT.
- Notes CRUD Operations: Create, Read, Update, and Delete notes.
- Secure Password Storage: Passwords are hashed using bcrypt for security.
- Validation: Zod schema validation ensures data integrity.

## Technologies Used

- Express.js: Web application framework for Node.js.
- Prisma: ORM (Object-Relational Mapping) for database interactions.
- SQLite: Embedded relational database for simplicity.
- JSON Web Tokens (JWT): For secure authentication and authorization.
- bcrypt: Password hashing for enhanced security.
- Zod: For schema validation and data consistency.

## Getting Started

## Prerequisites

- Node.js and npm installed on your machine.
- Git (optional) for cloning the repository.

## Installation

1. Clone this repository.

```bash
git clone https://github.com/your-username/express-prisma-sqlite-backend.git
```

2. Navigate to the project directory.
```bash
cd express-prisma-sqlite-backend
```
3. Install dependencies.
```bash
npm install
```
4. Configuration
 - Update .env with your configurations (e.g., JWT_SECRET, DATABASE_URL).
 - Running the Application
 - Run the application.
```bash
npm start
```

## Contributions
Contributions are welcome! Feel free to open issues or create pull requests for any enhancements or bug fixes.