const targetWords = ["aaaaa", "aabaa"]
const dictionary = ["those", "there", "jumps", "boogy", "fight", "plump"]
const WORD_LENGTH = 5
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const offsetFromDate = new Date(2022, 0, 1)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 24
const targetWord = targetWords[Math.floor(dayOffset)]

//function to start the game
function startInteraction() {
    //listens to when the click is being clicked or a button is being pressed
    document.addEventListener("click", handleMouseClick)
    document.addEventListener("keydown", handleKeyPress)
}

//function to stop the game
function stopInteraction() {
    document.removeEventListener("click", handleMouseClick)
    document.removedEventListener("keydown", handleKeyPress)
}

//checks if the mouse clicked matches our data key
function handleMouseClick(e) {
    if (e.target.matches("[data-key]")) {
        pressKey(e.target.dataset.key)
        return
    }
    //checks if the enter button pressed matches our data key
    if (e.target.matches("[data-enter]")) {
        submitGuess()
        return
    }
    //checks if the delete button matches our data key
    if (e.target.matches("[data-delete]")) {
        deleteKey()
        return
    }
}

// checks when the Enter button is pressed then submit the guess
function handleKeyPress(e) {
    if (e.key === "Enter") {
        submitGuess()
        return
    }
    // checks when the backsplace button is pressed then delete key
    if (e.key === "Backspace" || e.key === "Delete") {
        deleteKey()
        return
    }
    // checks that a letter between A-Z is pressed
    if (e.key.match(/^[a-z]$/)) {
        pressKey(e.key)
        return
    }

}

//makes guesses to conditions below
function pressKey(key) {
    const activeTiles = getActiveTiles()
    if (activeTiles.length >= WORD_LENGTH) return
    const nextTile = guessGrid.querySelector(":not({data-letter])")
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key
    nextTile.dataset.state = "active"
}

function deleteKey() {
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
}

function submitGuess() {
    const activeTiles = [...getActiveTiles()]
    if (activeTiles.length !== WORD_LENGTH) {
        showAlert("Not enough letters")
        shakeTiles(activeTiles)
        return
    }
}

function getActiveTiles() {
    return guessGrid.querySelectorAll('[data-state="active"]')
}

//function to show and hide alert
function showAlert(message, duration = 1000) {
    const alert = document.createElement("div")
    alert.textContent = message
    alert.classList.add("alert")
    alertContainer.prepend(alert)
    if (duration == null) return

    setTimeout(() => {
        alert.classList.add("hide")
        alert.addEventListener("transitionend", () => {
            alert.remove()
        })
    }, duration)
}

function shakeTiles(tiles) {
    tiles.forEach(tile => {
        tile.classList.add("shake")
        tile.addEventListener("animationend", () => {
            tile.classList.remove("shake")
        }, { once: true }
        )
    })
}