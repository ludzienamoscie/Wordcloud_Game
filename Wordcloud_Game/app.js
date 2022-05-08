'use strict';

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
//let json = JSON.parse(questionsData)


// Checking if the user entered their nickname
function checkGuess() {
    if (!document.getElementById("nicknameInput").value) {
        alert("Please enter your nickname. ")
        return false
    }
    return true
}

let allAnswers = 0
let rightAnswers = 0
let selectedIds = []

function randomPosition(length) {
    let positions = []
    while (positions.length < length) {
        let row = Math.random()
        let col = Math.random()
        // If this position is not yet included, we can add it
        let duplicate = false
        positions.forEach((element, index, array) => {
            // 10% difference between words
            if (Math.abs(element.x - col) < 0.1 && Math.abs(element.y - row) < 0.1) {
                duplicate = true
                return
            }
        });
        if (!duplicate) {
            positions.push({x: col, y: row})
        }
    }
    return positions
}

function submitNickname() {
    if (!checkGuess()) {
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

function wordCallback(id) {
    // Removing previously selected element
    if (selectedIds.includes(id)) {
        selectedIds.splice(selectedIds.indexOf(id), 1)
        document.getElementById("word" + id).style.color = "black"
    } else {
        document.getElementById("word" + id).style.color = "#8c92ac"
        selectedIds.push(id)
    }
}

function checkAnswers() {
    let points = 0
    for (let index in selectedIds) {
        let id = selectedIds[index]
        if (rightAnswers.includes(allAnswers[id])) {
            document.getElementById("word" + id).style.color = "#8fbc8f"
            points += 2
        } else {
            document.getElementById("word" + id).style.color = "#cc3333"
            points -= 1
        }
    }
    for (let index in rightAnswers) {
        let id = allAnswers.indexOf(rightAnswers[index])
        if (!selectedIds.includes(id)) {
            document.getElementById("word" + id).style.color = "#8fbc8f"
            points -= 1
        }
    }
    let button = document.getElementById("answersButton")
    button.innerHTML = "finish game"
    button.setAttribute("onclick", "submitAnswers()")
    document.getElementById("score").innerHTML = points + " points"
}

function renderGame() {
    let choice = Math.floor(Math.random() * questionsData.length)
    let question = questionsData[choice].question
    question = question.charAt(0).toUpperCase() + question.slice(1)
    document.getElementById("question").innerHTML = question
    allAnswers = questionsData[choice].all_words
    rightAnswers = questionsData[choice].good_words
    let wordPositions = randomPosition(allAnswers.length)

    for (let i = 0; i < wordPositions.length; i++) {
        let wordNode = document.createElement('label');
        wordNode.setAttribute("id", "word"+i); 
        wordNode.setAttribute("onclick", "wordCallback("+i+")");     
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

function submitAnswers() {
    let gameScreen = document.getElementById("gameScreen")
    gameScreen.parentNode.removeChild(gameScreen)
    document.getElementById("scoreScreen").style.display = "block"
}
