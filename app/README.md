# Project 13 Argent Bank a bank account management application

## 1. General informations

The folders and files contained in this part of the repository tree relate to the front-end of the project. View the [repository folder for back-end installation](https://github.com/al-dev93/p13agba-al-2302/tree/main/api) folder to install the micro API.

## 2. Project setup

### 2.1 Prerequisites

First you have to fork the repository and clone it on your computer. You must also install the micro API before installing the front end, read [README.md for back-end](https://github.com/al-dev93/p13agba-al-2302/blob/develop/api/README.md) for mor informations.

### 2.2 Front-End installation

Once the repository is cloned on your computer and the micro API is installed, go to your terminal in the folder `/app` and use the `yarn` command to install the project dependencies.

## 3. Run project

**Note**: make sure the micro API has been installed beforehand.

- In the terminal, go to the back-end folder `/api`
  ~~- Use the command `mongod start` for run database~~
- Use the command `npm run dev:server` for connect API to database
- In the terminal, a message is displayed warning that the API has started on port 3001 and database has successfully connected
- In the terminal, go to the front-end folder `/app`
- Use the command `yarn start`
- The browser opens to the homepage, otherwise enter `http://localhost:3000` in the address bar of the browser
- The homepage is loaded, click on sign in to go to the login page.
