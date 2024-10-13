Here's a sample README for your **Personalized News Aggregator**:

---

# Personalized News Aggregator

This project is a RESTful API for a personalized news aggregator built using **Node.js**, **Express.js**, **MongoDB**, and integrated with an external news API to fetch news articles based on user preferences. The API uses **bcrypt** for password hashing and **JWT** (JSON Web Tokens) for user authentication.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [User Registration](#post-register)
  - [User Login](#post-login)
  - [User Preferences](#preferences-endpoints)
  - [Fetching News](#fetching-news)
- [Error Handling](#error-handling)

## Project Overview

The **Personalized News Aggregator** API allows users to sign up, log in, and update their news preferences (such as categories or languages). Based on these preferences, the system fetches relevant news articles from an external news provider, delivering a personalized news feed. This project uses **JWT** tokens for protecting user-specific routes and leverages **MongoDB** for data persistence.

## Technologies Used

- **Node.js**: Javascript runtime
- **Express.js**: Framework for building APIs
- **MongoDB**: Database for storing user data
- **Mongoose**: ODM library for MongoDB
- **bcrypt**: Library for password hashing
- **JWT**: Authentication via JSON Web Tokens
- **Axios**: HTTP client to interact with external APIs
- **GNews API**: External API to fetch news articles

## Installation

To run the project locally, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/airtribe-projects/news-aggregator-api-Tejas150.git
   ```

2. Navigate to the project directory:
   ```bash
   cd news-aggregator-api-Tejas150
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up the required environment variables (see below).

5. Start the application in development mode:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables are required to run the project:
- `NODE_ENV`: Specify if enviorment is developement or production.
- `PORT`: Port number for server to listen.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `NEWS_API_KEY`: API key for the external news provider (e.g., GNews).

Create a `.env` file in the root directory and add the environment variables:
```bash
NODE_ENV='development'
PORT=3000
MONGO_URI=mongodb+srv://<your-mongodb-uri>
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
```

## API Documentation

### Authentication Endpoints

#### POST /users/signup

**Description**: Registers a new user.

- **Request**:
  - `name` (string) - User's name
  - `email` (string) - User's email (must be unique)
  - `password` (string) - Password for the account
  - `preferences` (array of strings) - User's news preferences (e.g., `['sports', 'technology']`)

- **Response**:
  - `200 Created` on success with a success message.
  - `400 Bad Request` if input validation fails.

**Example**:
```json
POST /users/signup
{
  "name": "Clark Kent",
  "email": "clark@superman.com",
  "password": "Krypt()n8",
  "preferences": ["movies", "comics"]
}
```

#### POST /login

**Description**: Logs in a registered user.

- **Request**:
  - `email` (string) - User's email
  - `password` (string) - User's password

- **Response**:
  - `200 OK` with a JWT token.
  - `401 Unauthorized` if credentials are invalid.

**Example**:
```json
POST /users/login
{
  "email": "clark@superman.com",
  "password": "Krypt()n8"
}
```

### Preferences Endpoints

#### GET /users/preferences

**Description**: Fetch the current user's news preferences.

- **Authorization**: Requires JWT Token in the header as `Authorization: Bearer <token>`.

- **Response**:
  - `200 OK` with an array of user preferences.
  - `404 Not Found` if the user is not found.

**Example**:
```json
GET /users/preferences
{
  "preferences": ["movies", "comics"]
}
```

#### PUT /users/preferences

**Description**: Update the logged-in user's preferences.

- **Authorization**: Requires JWT Token in the header.

- **Request**:
  - `preferences` (array of strings) - New preferences array

- **Response**:
  - `200 OK` with the updated preferences.
  - `400 Bad Request` if input validation fails.

**Example**:
```json
PUT /users/preferences
{
  "preferences": ["technology", "sports"]
}
```

### Fetching News

#### GET /news

**Description**: Fetch personalized news articles based on the user's preferences.

- **Authorization**: Requires JWT Token in the header.

- **Response**:
  - `200 OK` with a list of articles.
  - `500 Internal Server Error` if the news API request fails.

**Example**:
```json
GET /news
{
  "articles": [
    {
        "title": "10 Star Wars Movie Moments Explained In The Books, Comics, & Games",
        "description": "The Star Wars movies are all meant to stand on their own, but several questions, mysteries, and references were only explained in other media.",
        "content": "Summary The Expanded Universe filled in gaps from the Star Wars films through books, comics, and video games.\\nThese stories answer questions and reveal new details that give depth to key movie moments.\\nThe books, comics, and games explore plotlines l... [14363 chars]",
        "url": "https://screenrant.com/star-wars-movie-moments-explained-books-comics-games/",
        "image": "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/04/10-star-wars-movie-moments-explained-in-the-books-comics-games.jpg",
        "publishedAt": "2024-04-27T00:00:00Z",
        "source": {
            "name": "Screen Rant",
            "url": "https://screenrant.com"
        }
    }
  ]
}
```

## Error Handling

The API uses structured error handling. Typical errors include:

- **400 Bad Request**: Invalid or missing input fields.
- **401 Unauthorized**: Missing or invalid JWT token.
- **404 Not Found**: User or resource not found.
- **500 Internal Server Error**: Issues like database or external API failure.

Example Error Response:
```json
{
  "status": 500,
  "message": "Failed to fetch news. Internal server error."
}
```