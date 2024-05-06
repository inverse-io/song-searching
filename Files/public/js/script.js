// this is a JSON object
var results;

function getSong() {

    let songName = document.getElementById('song').value
    if(songName === '') {
        return alert('Please enter a song')
    }

    let songDiv = document.getElementById('songmatches')
    songDiv.innerHTML = ''

    // clear song value 
    document.getElementById('song').value = '';

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {

            let response = JSON.parse(xhr.responseText)

            // clear previous searches
            songDiv.innerHTML = '';

			songDiv.innerHTML = songDiv.innerHTML + `
			<p>Songs matching: "${songName}" </p>
			`

            // console.log(response);
            results = response.results;
            // console.log(results);

            // have the table show all searched items
            createSearch();
        }
    }
    xhr.open('GET', `/songs?title=${songName}`, true)
    xhr.send()
}