/*

Copy of the inlcuded server.js file but instead utilises the iTunes API
Instructions say that I should have created a copy of this
So I just made another server

*/
const express = require('express') //express framework
const http = require('http')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
*/
// let API_KEY = '029de0f24e1e1f17aea46cabaef22308' //<== YOUR API KEY HERE

const app = express()

//Middleware
// serving static files
// .use is executed every single time the app recieves a request
app.use(express.static(__dirname + '/public')) //static server

//Routes
// responging to the homepage being brought up
app.get(['/', '/index.html', '/mytunes', '/mytunes.html'], (request, response) => {
  	response.sendFile(__dirname + '/views/index.html')
})

// responging to a page that says 
app.get('/songs', (request, response) => {
	let song = request.query

    console.log( "Requested song: " + song.title );
    
    // console.log(request);

	if(!song) {
		//send json response to client using response.json() feature
		//of express
		response.json({message: 'Please enter a song name'})
		return
	}

    // check to see if the title has spaces
    let searchValue = ''
    for(let i = 0; i < song.title.length; i++){
        let char = song.title[i];
        if(char == " "){ searchValue += "+"; }
        else{ searchValue += song.title[i]; }
    }

    const options = {
        "method": "GET",
        "hostname": "itunes.apple.com",
        "port": null,
        "path": `/search?term=${searchValue}&entity=musicTrack&limit=20`,
        "headers": {
          "useQueryString": true
        }
    }

    //create the actual http request and set up
    //its handlers
    http.request(options, function(apiResponse) {
        let songData = ''

        apiResponse.on('data', function(chunk) {
            songData += chunk
        })

        apiResponse.on('end', function() {
            // console.log(JSON.parse(songData))
            response.contentType('application/json').json(JSON.parse(songData))
        })
    }).end() 
    //important to end the request to actually send the message
})

//start server
app.listen(PORT, err => {
	if(err) console.log(err)
	else {
		console.log(`Server listening on port: ${PORT}`)
		console.log(`To Test:`)
        console.log(`http://localhost:3000/mytunes.html`)
        console.log(`http://localhost:3000/mytunes`)
        console.log(`http://localhost:3000/index.html`)
        console.log(`http://localhost:3000/`)
		console.log(`http://localhost:3000`)
	}
})