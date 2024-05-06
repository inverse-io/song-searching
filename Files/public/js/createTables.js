// build table that contains search results
function createSearch(){
    // check the total search results
    let totalSongs = results.length;

    // creating header for the area
    let divArea = document.getElementById("songmatches");
    let searchTable = document.createElement('table');

    searchTable.id = "matches_table";

    divArea.appendChild(searchTable);

    // add the songs to the table in the search
    for( let s = 0; s < totalSongs; s++ ){
        // create row
        var row = searchTable.insertRow(s);

        for( let c = 0; c < 4; c++ ){
            // create space for all cells
            row.insertCell(c);
        }

        // add to cells
        createAddButton(searchTable.rows[s].cells[0], "R" + s);
        searchTable.rows[s].cells[1].innerHTML = results[s].trackName;
        searchTable.rows[s].cells[2].innerHTML = results[s].artistName;

        // create image for the final cell
        let img = document.createElement('IMG');
        img.src = results[s].artworkUrl100;
        searchTable.rows[s].cells[3].appendChild(img);
    }
}

function createAddButton( tableCell, id ){
    // create button
    let newAdd = document.createElement('button');
    newAdd.type = "button";
    newAdd.innerHTML = `<i class="fa fa-plus" style="font-size:36px"></i>`
    newAdd.id = id;
    newAdd.onclick = addFromSearch;

    // add button to cell
    tableCell.appendChild(newAdd);

    document.getElementById(id).setAttribute("class", "searchBtn");
}

// button handler for add
function addFromSearch(){
    // add current row into play list
    let exists = document.getElementById("playlist_title");

    if( !exists ){
        createPlayList();

        let divArea = document.getElementById("playlist");

        let playListTable = document.createElement('table');
        playListTable.id = "playlist_table";

        divArea.appendChild( playListTable );
    }

    let id = this.id;

    addToPlayList( id[1] );

    // add innerHTML to storage each time a song is added
    localStorage.setItem('create_playlist', document.getElementById('playlist').innerHTML);
}

// build table that holds current playlist
function createPlayList(){
    let divArea = document.getElementById('playlist');
    divArea.innerHTML += `<p id="playlist_title">Playlist: </p>`;
}

function createPlayListButtons( cell ){

    let rowId = document.getElementById("playlist_table").rows.length - 1;
    
    // create subtract button
    let removeButton = document.createElement('button');
    removeButton.type = "button";
    removeButton.innerHTML = `<i class="fa fa-minus" style="font-size:36px"></i>`
    removeButton.id = rowId + "_remove_song";
    removeButton.onclick = removeSong;

    let siftDownButton = document.createElement('button');
    siftDownButton.type = "button";
    siftDownButton.innerHTML = `<i class="fa fa-arrow-down" style="font-size:36px"></i>`
    siftDownButton.id = rowId + "_sift_down";
    siftDownButton.onclick = siftDown;

    let siftUpButton = document.createElement('button');
    siftUpButton.type = "button";
    siftUpButton.innerHTML = `<i class="fa fa-arrow-up" style="font-size:36px"></i>`
    siftUpButton.id = rowId + "_sift_up";
    siftUpButton.onclick = siftUp;

    // add buttons to cell
    cell.appendChild(removeButton);
    cell.appendChild(siftDownButton);
    cell.appendChild(siftUpButton);

    document.getElementById(removeButton.id).setAttribute("class", "listBtn");
    document.getElementById(siftDownButton.id).setAttribute("class", "listBtn");
    document.getElementById(siftUpButton.id).setAttribute("class", "listBtn");

    // save current add button id to storage
    if( localStorage.getItem('removeIds') === null ){
        let idArray = [];
        idArray.push(rowId);
        localStorage.setItem('removeIds', JSON.stringify(idArray) );
    }
    else{
        let idArray = localStorage.getItem('removeIds');
        let temp = JSON.parse(idArray);

        temp.push(rowId);

        localStorage.setItem('removeIds', JSON.stringify(temp));
    }
}

function removeSong(){
    console.log("Remove called by " + this.id);

    let playlistTable = document.getElementById("playlist_table");

    let rowIndex = document.getElementById( this.id ).parentElement.parentElement.rowIndex;

    // // remove the id from the list
    // if( localStorage.getItem('removeIds') != null ){
    //     let idArray = localStorage.getItem('removeIds');
    //     let temp = JSON.parse(idArray);

    //     let numId = this.id[0];
    //     let removeIndex = temp.indexOf(numId);

    //     console.log("removing index: " + removeIndex);

    //     temp.splice(removeIndex, 1);

    //     localStorage.setItem('removeIds', JSON.stringify(temp));
    // }

    playlistTable.deleteRow( rowIndex );

    // reflect changes in the stored HTML
    localStorage.setItem('create_playlist', document.getElementById('playlist').innerHTML);

}

function siftUp(){
    console.log("SiftUp called by " + this.id);

    let playlistTable = document.getElementById("playlist_table");

    let currIndex = document.getElementById( this.id ).parentElement.parentElement.rowIndex;

    // if the current row is already at the top
    // do nothing
    if( currIndex == 0 ){
        // console.log("Row cannot be sifted UP!");
        return;
    }

    let aboveIndex = (currIndex - 1);


    let row = playlistTable.rows[currIndex];
    let aboveRow = playlistTable.rows[aboveIndex];

    // swap only the values of columns 1-3, buttons stay the same for index purposes
    for( let i = 1; i < 4; i++ ){
        
        // grab current cell infor for first cell
        let temp = row.cells[i].innerHTML;
        
        // move above cell info to curr cell
        row.cells[i].innerHTML = aboveRow.cells[i].innerHTML;

        // replace above cell info with current cell
        aboveRow.cells[i].innerHTML = temp;
    }

    // reflect changes in the stored HTML
    localStorage.setItem('create_playlist', document.getElementById('playlist').innerHTML);
}

function siftDown(){
    console.log("SiftDown called by " + this.id);

    let playlistTable = document.getElementById("playlist_table");

    let currIndex = document.getElementById( this.id ).parentElement.parentElement.rowIndex;

    if( currIndex == playlistTable.rows.length - 1 ){
        // console.log("Row cannot be sifted DOWN!");
        return;
    }

    let belowIndex = (currIndex + 1);

    let row = playlistTable.rows[currIndex];
    let belowRow = playlistTable.rows[belowIndex];

    for( let i = 1; i < 4; i++ ){
        // grab current cell infor for first cell
        let temp = row.cells[i].innerHTML;
        
        // move above cell info to curr cell
        row.cells[i].innerHTML = belowRow.cells[i].innerHTML;

        // replace above cell info with current cell
        belowRow.cells[i].innerHTML = temp;
    }

    // reflect changes in the stored HTML
    localStorage.setItem('create_playlist', document.getElementById('playlist').innerHTML);
}

function addToPlayList( rowId ){
    let searchTable = document.getElementById("matches_table");
    let playlistTable = document.getElementById("playlist_table");

    let row = playlistTable.insertRow(-1);

    for( let i = 0; i < 4; i++ ){
        row.insertCell(i);
    }

    createPlayListButtons( row.cells[0] );
    row.cells[1].innerHTML = searchTable.rows[rowId].cells[1].innerHTML;
    row.cells[2].innerHTML = searchTable.rows[rowId].cells[2].innerHTML;
    row.cells[3].innerHTML = searchTable.rows[rowId].cells[3].innerHTML;
}