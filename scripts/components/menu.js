// rules menu option
const rulesBtn = document.getElementById('rules-btn')
const closeRulesBtn = document.getElementById('close-btn')

// rules menu
const rules = document.getElementById('rules')

// rules
export function toggleRulesMenu() {
    rulesBtn.addEventListener('click', () => rules.classList.add('show'))
    closeRulesBtn.addEventListener('click', () => rules.classList.remove('show'))
}

// User name menu option
const nameBtn = document.getElementById('name-btn')
const submitBtn = document.getElementById('close-name-btn')

// getting the user name
const userName = document.getElementById('user-name')

// name menu
const name = document.querySelector('.name')

// Get user name
export function getUserName() {
    submitBtn.addEventListener('click', () => {

        // grabs h1 element
        const h1 = document.querySelector('h1')

        // grabs name after user hits submit
        let name = userName.value
        name = name.trim()

        // edits name for gameboard
        let nameForScoreBoard = name
        name = name.toUpperCase()

        let newName = name.split("")
        name = ''

        for (let i = 0; i < newName.length; i++) {
            if (newName[i] === " ") {
                name += "| "
            } else {
                name += newName[i] + " "
            }
        }

        // checks if user submited nothing/empty string
        if (name === '')
            name = 'B R E A K O U T'

        h1.innerHTML = name

        // returns the name the user submited before it was edited
        return nameForScoreBoard
    })
}

export function toggleNameMenu() {
    nameBtn.addEventListener('click', () => name.classList.add('show'))
    submitBtn.addEventListener('click', () => name.classList.remove('show'))
}


// local storage
// function addPlayerToScoreBoard() {



//     const name = JSON.parse(localStorage.getItem('name'))

//     players.push({ name, score })
// }