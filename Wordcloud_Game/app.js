'use strict';

let allAnswers = 0
let rightAnswers = 0
let selectedIds = []

// Questions and right answers
let questionsData =
[
{
    question: "select animals",
    "all_words": [
        "hole",
        "sofa",
        "pear",
        "tiger",
        "oatmeal",
        "square",
        "nut",
        "cub",
        "shirt",
        "tub",
        "passenger",
        "cow"
    ],
    "good_words": [
        "tiger",
        "cow",
    ]
},
{
    question: "select colors",
    "all_words": [
        "jeans",
        "existence",
        "ink",
        "red",
        "blue",
        "yellow",
        "laugh",
        "behavior",
        "expansion",
        "white",
        "black",
        "cakes"
    ],
    "good_words": [
        "red",
        "blue",
        "yellow",
        "white",
        "black"
    ]
},
{
    question: "select vehicles",
    all_words: [
        "belief",
        "wire",
        "car",
        "bus",
        "star",
        "river",
        "hat",
        "skirt",
        "train",
    ],
    good_words: [
        "car",
        "bus",
        "train"
    ]
}
]

// Checking if the user entered their nickname
function checkName() {
    if (!document.getElementById("nicknameInput").value) {
        alert("Please enter your nickname. ")
        return false
    }
    return true
}

// Submitting user's nickname and changing the view to the game screen
function submitNickname() {
    if (!checkName()) {
        return
    }
    let title = document.getElementById("title")
    let nicknameInput = document.getElementById("nicknameInput")
    let submitButton = document.getElementById("submitButton")
    let nickname = nicknameInput.value
    title.parentNode.removeChild(title)
    nicknameInput.parentNode.removeChild(nicknameInput)
    submitButton.parentNode.removeChild(submitButton)
    document.getElementsByClassName("content")[0].style.height = "80%"
    document.getElementById("gameScreen").style.height = "100%"
    document.getElementById("gameScreen").style.display = "block"
    document.getElementById("congrats").innerHTML += nickname + "!"
    renderGame()
}

// Choosing the game
function renderGame() {
    // Choosing random question set
    let choice = Math.floor(Math.random() * questionsData.length)
    let question = questionsData[choice].question
    question = question.charAt(0).toUpperCase() + question.slice(1)
    document.getElementById("question").innerHTML = question
    allAnswers = questionsData[choice].all_words
    rightAnswers = questionsData[choice].good_words
    let wordPositions = randomPosition(allAnswers.length)

    // Creating nodes for words 
    for (let i = 0; i < wordPositions.length; i++) {
        let wordNode = document.createElement('label');
        wordNode.setAttribute("id", "word" + i)
        wordNode.setAttribute("onclick", "wordCallback(" + i + ")")
        wordNode.setAttribute("class", "word")
        wordNode.style.position = "absolute"
        document.getElementById("gameBoard").style.position = "relative"
        wordNode.style.fontWeight = "bold"
        wordNode.style.margin = "10px"
        wordNode.style.top = wordPositions[i].y * 90 + "%"
        wordNode.style.left = wordPositions[i].x * 90 + "%"
        wordNode.innerHTML = allAnswers[i]
        document.getElementById("gameBoard").appendChild(wordNode)
    }
}

// Assigning random positions for words
function randomPosition(length) {
    let positions = []
    while (positions.length < length) {
        let row = Math.random()
        let col = Math.random()
        let duplicate = false
        positions.forEach((element, index, array) => {
            // 10% difference between words must remain, otherwise - it's a duplicate
            if (Math.abs(element.x - col) < 0.1 && Math.abs(element.y - row) < 0.1) {
                duplicate = true
                return
            }
        });
        // If this position is not yet included, we can add it
        if (!duplicate) {
            positions.push({ x: col, y: row })
        }
    }
    return positions
}

// Marking and unmarking user's choice
function wordCallback(id) {
    // Removing previously selected element
    if (selectedIds.includes(id)) {
        selectedIds.splice(selectedIds.indexOf(id), 1)
        document.getElementById("word" + id).style.color = "black"
    } else {
        document.getElementById("word" + id).style.color = "#8c92ac"
        // Adding the word to the selected ones
        selectedIds.push(id)
    }
}

// Checking user's answers and highlighting them accordingly
function checkAnswers() {
    let points = 0
    for (let index in selectedIds) {
        let id = selectedIds[index]
        // Highlighting all the right chosen answers
        if (rightAnswers.includes(allAnswers[id])) {
            document.getElementById("word" + id).style.color = "#8fbc8f"
            document.getElementById("word" + id).innerHTML += " <span style='font-size:20px;'>Good</span>"
            points += 2
        } else {
            // Highlighting all the wrong chosen answers
            document.getElementById("word" + id).style.color = "#cc3333"
            document.getElementById("word" + id).innerHTML += " <span style='font-size:20px;'>Bad</span>"
            points -= 1
        }
    }
    // Highlighting all the right answers that weren't chosen
    for (let index in rightAnswers) {
        let id = allAnswers.indexOf(rightAnswers[index])
        if (!selectedIds.includes(id)) {
            document.getElementById("word" + id).style.color = "#8fbc8f"
            document.getElementById("word" + id).innerHTML += " <span style='font-size:20px;'>Good</span>"
            points -= 1
        }
    }
    let button = document.getElementById("answersButton")
    button.innerHTML = "finish game"
    button.setAttribute("onclick", "submitAnswers()")
    document.getElementById("score").innerHTML = points + " points"
}

// Switching the view from game screen to score screen
function submitAnswers() {
    let gameScreen = document.getElementById("gameScreen")
    gameScreen.parentNode.removeChild(gameScreen)
    document.getElementById("scoreScreen").style.display = "block"
}
