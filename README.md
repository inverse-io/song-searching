# Song Searching using a public API
Using the iTunes API, this project allows the user to search a song, save and add them to a playlist. The user is able to view the details of the song such as the title, artist, and the cover art. They may also move alter their playlist by moving them up or down as well as removing and adding songs. At this time, searches only show the first 20 songs the API may return. 

**NOTE**: The retention of page data is currently under development and does not function. 

## Structure and Organization
- `server`: The backend which handles making requests to the API
- `index`: Represents the starting html page with allows the user to begin a query
- `createTables`: Contains functions that create the tables of song queried and the user playlist. Contains button handlers.
- `eventListeners`: Creates the listeners on launch.
- `keyHandlers`: Handles the event that the 'ENTER' button is pressed.
- `loadPage`: Used to save page data to be loaded back in when returning to the page.
- `script`: Contains functions that handle data being passed from the client side to server side.

## Prerequisites
Install the required packages and dependents listed in the .json files. To do so execute this command in terminal:
```
npm install
```

## Instructions
After ensuring that Nodejs and the packages are installed properly, run the server in terminal using:
```
node server.js
```
To run the client side to test, using a chrome based web browser use any of the links below:
```
http://localhost:3000/mytunes.html
http://localhost:3000/mytunes
http://localhost:3000/index.html
http://localhost:3000/
http://localhost:3000
```

## Other
A node.js application that uses a public API and the express.js framework.

This uses a thick client, a client that expects the JSON data fro mthe server and generates the javascript itself. The server does not render the HTML.
