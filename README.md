# Posts CRUD API

This project is a Node.js application built with Fastify and MongoDB for managing posts. Each post has a title, description, and ID, along with createdAt and updatedAt timestamps.

## Features

- Create a new post
- Retrieve all posts
- Retrieve a single post by ID
- Update a post (with automatic updating of the updatedAt timestamp)
- Delete a post

## Technologies Used

- Node.js
- Fastify
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   git clone https://github.com/MrGrigoryAlexandrovich/posts-crud.git

2. Navigate to the project directory:

   cd posts-crud

3. Install the dependencies:

   npm install

4. Create a `.env` file based on the `.env.example` file and configure your MongoDB connection string.

### Running the Application

- To start the application in development mode, run:

  npm run dev

- To start the application in production mode, run:

  npm start

### API Endpoints

- `POST /posts` - Create a new post
- `GET /posts` - Retrieve all posts
- `GET /posts/:id` - Retrieve a single post by ID
- `PUT /posts/:id` - Update a post by ID
- `DELETE /posts/:id` - Delete a post by ID

## License

This project is licensed under the ISC License.