# URL Shortner
## About
This application serves the purpose of shortening URLs and provides users with the ability to track analytics for the shortened links. Upon registration, users can log in to access their personalized dashboard. In the dashboard, users can input a URL and, upon submission, receive a shortened URL. Additionally, the dashboard allows users to view analytics such as the number of visits to the shortened URL, its creation timestamp, and its validity period, which spans 48 hours from the time of creation. This feature enables users to have a comprehensive overview of the performance and lifespan of their shortened URLs.

<hr>

## Steps to set up the project

### Client Setup
-Enter the client directory using:
`cd client`
-Install all the dependencies and packages required to run this project:
`npm install`
-To run the client server, run:
`npm start`

### Backend Setup
-Create a .env file with the following structure and specify the same in the file:
```
PORT=
MONGODB_URI=
```
-Install all the dependencies and packages required to run this project:
`npm install`
-To start the server, run the command:
`nodemon index.js`

### Technology Stacks Used
-Node
-Express
-React
-MongoDB