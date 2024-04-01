# Phonebook Backend

This is the backend for a phonebook web application built with Node.js.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/RyanFDev/phonebook-backend.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## API Documentation

The backend provides the following API endpoints:

### GET /api/persons

Returns a list of all phonebook entries.

### GET /api/persons/:id

Returns a specific phonebook entry based on the provided ID.

### POST /api/persons

Adds a new phonebook entry. The request body should contain the following fields: `name` (string) and `number` (string).

### PUT /api/persons/:id

Updates a specific phonebook entry based on the provided ID. The request body should contain the following fields: `name` (string) and `number` (string).

### DELETE /api/persons/:id

Deletes a specific phonebook entry based on the provided ID.

## Deployment

The backend is deployed at [phonebook-backend-rf.fly.dev](https://phonebook-backend-rf.fly.dev).

## Technologies Used

- Node.js
- Express.js
- MongoDB

## License

This project is licensed under the [MIT License](LICENSE).
