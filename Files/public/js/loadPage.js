window.addEventListener('load', (event) => {
    // fill playlist section
    let fillList = document.getElementById('playlist');

    fillList.innerHTML = localStorage.getItem('create_playlist');

    // if( localStorage.getItem('removeIds') != null ){
    //     addRemoveHandlers();
    // }

})

function addRemoveHandlers(){
    let string = localStorage.getItem('removeIds');
    let array = JSON.parse(string);

    for( let i = 0; i < array.length; i++ ){
        let elementId = array[i];

        console.log(elementId);

        let removeButton = document.getElementById(`${elementId}_remove_song`);
        let upButton = document.getElementById(`${elementId}_sift_up`);
        let downButton = document.getElementById(`${elementId}_sift_down`);

        removeButton.onclick = removeSong;
        upButton.onclick = siftUp;
        downButton.onclick = siftDown;
    }
}
