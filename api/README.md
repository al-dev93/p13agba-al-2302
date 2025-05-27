# Project #13 - Argent Bank API

This codebase contains the code needed to run the backend for Argent Bank.

## Getting Started

### Prerequisites

Argent Bank uses the following tech stack:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

### Instructions

1. Fork this repo
1. Clone the repo onto your computer
1. Open a terminal window in the cloned project
1. Run the following commands:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Populate database with two users
npm run populate
```

Your server should now be running at <http://locahost:3001> and you will now have two users in your MongoDB database!

## Populated Database Data

Once you run the `populate` script, you should have two users in your database:

### Tony Stark

- First Name: `Chloé`
- Last Name: `Durand`
- Email: `chloe.durand@devmail.com`
- Password: `password123`

### Steve Rogers

- First Name: `Jean`,
- Last Name: `Martin`,
- Email: `jean.martin@devmail.com`,
- Password: `password456`

## API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: <http://localhost:3001/api-docs>

## Design Assets

Static HTML and CSS has been created for most of the site and is located in: `/designs`.

For some of the dynamic features, like toggling user editing, there is a mock-up for it in `/designs/wireframes/edit-user-name.png`.

And for the API model that you will be proposing for transactions, the wireframe can be found in `/designs/wireframes/transactions.png`.
