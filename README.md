# GETTING THIS APP STARTED:

First, you will need a few pre-requesites before being able to install dependencies.

Namely:

**Latest stable Node.js version**

**Latest stable MySQL version**

_You might not necessarily need the latest versions, but it doesn't hurt!_

## Installing Dependencies

Run the following commands within a terminal after navigating to the root:

### `cd backend`

### `npm install`

### `cd ../frontend`

### `npm install`

## Environment Variables

You will need to create a .env file in the **backend** root directory with the following information:

### `DB_HOST= localhost (or whatever your host is)`

### `DB_USER= your_mysql_user`

### `DB_PASSWORD= your_database_password`

### `DB_NAME= honors_inventory`

### `PORT= 5000 (or any port)`

You might similarly need to create a .env file in the **frontend** root directory:

### `REACT_APP_BACKEND_URL= http://localhost:5000/api`

But for _whatever_ reason, it does not seem to recognize the .env file, so it might not be necessary.

## Database Setup

Provided in the root directory is **init.sql**.

This will initialize a database schema with the name honors-inventory, and populate some sample data.
In the database will be 2 tables, equipment and locations.

## Running the frontend and backend

Once all of that is done, you are ready to start the app!
I've provided two .bat files which will automatically run the servers, but if you'd like to run the commands in your own terminal:

**Run for the backend:**

### `cd backend`

### `npm run dev`

**Run for the frontend:**

### `cd frontend`

### `npm start`

The backend will run at http://localhost:5000/api by default.

The frontend will run at http://localhost:3000 by default.

Once it launches, it should display the following page:
![Image](https://github.com/user-attachments/assets/2aa62e00-0774-4d11-b8c6-bbb6103f9f58)

And that's it! Thank you for checking out my coding challenge!
