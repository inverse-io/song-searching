// event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit_button').addEventListener('click', getSong)

    //add key handler for the document as a whole, not separate elements.
    document.addEventListener('keyup', handleKeyUp)

})