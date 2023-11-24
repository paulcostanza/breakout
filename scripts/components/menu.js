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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User name menu option
const nameBtn = document.getElementById('name-btn')
const submitBtn = document.getElementById('close-name-btn')
export let highScoreName = ''

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
        highScoreName = name
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

        // Changes 'breakout' to player's name
        h1.innerHTML = name
    })
}

export function toggleNameMenu() {
    nameBtn.addEventListener('click', () => name.classList.add('show'))
    submitBtn.addEventListener('click', () => name.classList.remove('show'))
}

export function addPlayerToScoreBoard(name, score) {

    // adds name to local storage
    if (localStorage.getItem(name) === null &&
        name !== '' &&
        name !== undefined) {
        localStorage.setItem(name, score)
    } else if (parseInt(localStorage.getItem(name)) < score) {
        localStorage.setItem(name, score)
    }
}

export function getUserInfo() {
    const userInfo = []
    const place = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']

    // taking data from localStorage and adding it to this program
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            let value = localStorage.getItem(key)

            userInfo.push({ name: `${key}`, score: parseInt(value) })
        }
    }

    // selection sort algorithm to organize the data and rank each user by highest score
    let max;
    for (let i = 0; i < userInfo.length - 1; i++) {
        max = i;
        for (let j = i + 1; j < userInfo.length; j++) {
            if (userInfo[j].score > userInfo[max].score)
                max = j;
        }

        let temp;
        temp = userInfo[max];
        userInfo[max] = userInfo[i];
        userInfo[i] = temp;
    }

    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''

    // adding the info to the High Score menu
    for (let i = 0; i < userInfo.length; i++) {
        const tr = document.createElement('tr')
        const td = document.createElement('td')

        let addThis = `<tr>
        <td>${place[i]}</td>
        <td>${userInfo[i].name}</td>
        <td>${userInfo[i].score}</td>
        <td></td>
        </tr>`

        tableBody.innerHTML += addThis
    }
}