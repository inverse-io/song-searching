const ENTER=13

function handleKeyUp(event) {
    event.preventDefault()
    if (event.keyCode === ENTER) {
        document.getElementById("submit_button").click()
    }
}