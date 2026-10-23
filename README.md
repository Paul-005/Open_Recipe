# Open Recipe

## Project Overview
Open Recipe is a first-of-its-kind "Git for Recipes". It's a collaborative platform where people can post their recipes, and others can clone them to experiment with their own variations. Just like code on GitHub, recipes here are meant to be forked, improved, and evolved by the community.

## Features
- **Open Source Recipes:** Clone any recipe to your own profile and make your own changes.
- **AI Cooking Assistant:** Integrated Gemini AI to help you adjust portions, suggest spice replacements, or estimate calories.
- **Collaborative Community:** Share your culinary masterpieces and see how others "fork" and improve them.
- **Dynamic Ingredients:** Manage complex ingredient lists with a beautiful, responsive UI.
- **Interactive Comments:** Discuss techniques and variations with other chefs.
- **Responsive Design:** Optimized for both domestic kitchens (mobile) and professional setups (desktop).

## Tech Stack
- **Frontend:** React.js, Vanilla CSS, Bootstrap Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Google Gemini AI (Vertex AI)
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary (for food imagery)

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

3. **Install server (backend) dependencies:**
   ```bash
   cd server
   npm install
   ```

4. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Set up environment variables:**
   - **Backend (`server/.env`):**
     Copy the sample environment file in the `server` directory and fill in your credentials:
     ```bash
     cp server/.env.example server/.env
     ```
   - **Frontend (`frontend/.env`):**
     Copy the sample environment file in the `frontend` directory:
     ```bash
     cp frontend/.env.example frontend/.env
     ```

6. **Run the application:**
   - Start the backend server (runs on port 5000 by default):
     ```bash
     cd server
     npm start
     ```
   - Start the frontend server (runs on port 3000):
     ```bash
     cd ../frontend
     npm start
     ```

## Environment Variables Configuration

### Backend (`server/.env`)
Create a `.env` file inside the `server/` directory based on [`server/.env.example`](file:///home/paul/Documents/Open_Recipe/server/.env.example):

| Variable | Description | Required | Default / Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Port number on which the backend server runs | No | `5000` |
| `MONGODB_URL` | MongoDB connection URI string | Yes | `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>` |
| `JWT_SECRET` | Secret key used for signing & verifying JWT authentication tokens | Yes | `your_jwt_secret_key_here` |
| `GEMINI_API_KEY` | Google Gemini API Key for semantic search and AI culinary assistant | Yes | `your_gemini_api_key_here` |

### Frontend (`frontend/.env`)
Create a `.env` file inside the `frontend/` directory based on [`frontend/.env.example`](file:///home/paul/Documents/Open_Recipe/frontend/.env.example):

| Variable | Description | Required | Default / Example |
| :--- | :--- | :--- | :--- |
| `REACT_APP_BACKEND_URL` | Base API URL pointing to the Express server with `/api` prefix | Yes | `http://localhost:5000/api` |

> [!IMPORTANT]
> - Ensure `REACT_APP_BACKEND_URL` includes the `/api` prefix and matches the backend port (`5000` by default). Do not include a trailing slash.
> - The `.env` file must be in the `frontend/` root folder (not in `frontend/src/`).
> - After creating or modifying `frontend/.env`, you must restart the frontend development server (`npm start`) for changes to be applied.



## API Documentation
All API endpoints are prefixed with `/api`.

### Recipes
- **GET /api/recipes**: Retrieve all recipes.
- **GET /api/recipes/get-users-recipe**: Retrieve all recipes created by the authenticated user.
- **GET /api/recipes/:id**: Retrieve details for a single recipe.
- **POST /api/recipes/new**: Create a new recipe (requires auth).
- **PUT /api/recipes/edit/:id**: Update an existing recipe (requires owner permission).
- **DELETE /api/recipes/:id**: Delete a recipe (requires owner permission).
- **POST /api/recipes/comment/:id**: Add a comment to a recipe.
- **POST /api/recipes/ask-ai**: Interact with the Gemini AI assistant for the specific recipe.

### Authentication
- **POST /api/login**: Log in a user.
- **POST /api/signup**: Register a new user.

## Project Structure
```
Open_Recipe
│
├── server            # Backend Application
│   ├── models        # Mongoose models (User, Recipe, Comments)
│   ├── routes        # Express API routes
│   ├── controllers   # Business logic
│   └── middlewares   # Auth & security logic
│
└── frontend          # React Application
    ├── src
    │   ├── components # Reusable UI 
    │   ├── pages      # Full page components (Auth, Recipes, Home)
    │   └── App.jsx    # Root routing and logic
    └── public         # Static assets and index.html
```

## Contribution Guidelines
1. Fork the recipe or the repo.
2. Experiment with flavors.
3. Open a Pull Request (or just publish your version!).

Happy Cooking! 🍳
