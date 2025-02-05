# User Management System 🚀
A modern, full-stack application for managing users, their hobbies, and visualizing their connections with an interactive interface. Built with a robust React + TypeScript frontend and a reliable Spring Boot + PostgreSQL backend.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)

## Features ✨
- **CRUD Operations**: Manage users and their hobbies seamlessly.
- **Interactive Visualizations**: Visualize user data relationships with react-flow.
- **Notifications**: Real-time success/error notifications using react-toastify.
- **Responsive Design**: Mobile-friendly and optimized for all screen sizes.
- **Scalable Backend**: A Spring Boot backend integrated with PostgreSQL.

## Technology Stack 🛠️
- **Frontend Framework**: React (v19)
- **Language**: TypeScript
- **Libraries**: react-flow, react-toastify
- **Styling**: CSS Modules, Tailwind CSS
- **Backend Framework**: Spring Boot
- **Language**: Java (v17)
- **Database**: PostgreSQL
- **Build Tool**: Maven

## Setup Instructions 🏗️

### Prerequisites
Ensure the following tools are installed:
- **Node.js**: v18 or higher
- **Java**: v17
- **PostgreSQL**: Running locally
- **Maven**

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Set up the database:
    - Create a PostgreSQL database named `user_management_db`.
    - Update the `.env` file with your database credentials (see [Environment Variables](#environment-variables)).

3. Build and run the backend:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

4. Verify the backend:
    - Swagger UI: [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/)
    - Test API endpoint: [http://localhost:8080/api/users](http://localhost:8080/api/users).

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file (refer to [Environment Variables](#environment-variables)).

4. Run the development server:
    ```bash
    npm start
    ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## Environment Variables 🌐

### Backend (.env)
```plaintext
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/user_management_db
SPRING_DATASOURCE_USERNAME=your_db_username
SPRING_DATASOURCE_PASSWORD=your_db_password
SERVER_PORT=8080
