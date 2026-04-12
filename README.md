# Open Recipe

## Project Overview
Open Recipe is a web application that allows users to discover, share, and manage a variety of recipes. It aims to simplify the process of finding meals that suit different dietary preferences and cooking skills.

## Features
- Browse a vast collection of recipes.
- Save favorite recipes.
- Create and share your own recipes.
- Filter recipes by dietary requirements (vegan, gluten-free, etc.).
- User authentication and profile management.
- Responsive design for mobile and desktop users.

## Tech Stack
- **Frontend:** React.js, CSS, HTML
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Version Control:** Git, GitHub

## Setup Instructions
To get started with Open Recipe, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Paul-005/Open_Recipe.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Open_Recipe
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Set up environment variables:**
   Create a `.env` file in the backend folder and add the necessary environment variables.

6. **Run the application:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

## API Documentation
API endpoints for managing recipes:

- **GET /api/recipes**: Retrieve all recipes.
- **POST /api/recipes**: Create a new recipe.
- **GET /api/recipes/:id**: Retrieve a single recipe by ID.
- **PUT /api/recipes/:id**: Update a recipe by ID.
- **DELETE /api/recipes/:id**: Delete a recipe by ID.

Authentication endpoints:

- **POST /api/auth/login**: Log in a user.
- **POST /api/auth/register**: Register a new user.

## Project Structure
The project structure is organized as follows:

```
Open_Recipe
│
├── backend
│   ├── models            # Mongoose models
│   ├── routes            # API routes
│   ├── controllers       # Route controllers
│   └── config            # Configuration files
│
└── frontend
    ├── src
    │   ├── components    # React components
    │   ├── pages         # Page components
    │   └── utils         # Utility functions
    ├── public            # Public assets
    └── package.json      # Frontend dependencies
```

## Contribution Guidelines
We welcome contributions! To contribute to Open Recipe, please follow these guidelines:

1. Fork the repository and create your branch from `main`.
2. Make your changes and commit them with descriptive messages.
3. Push your branch and open a pull request.
4. Ensure your code follows the project's coding standards and passes all tests.

Thank you for your interest in contributing to Open Recipe!