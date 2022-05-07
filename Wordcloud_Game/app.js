'use strict';

// Questions and right answers
/*{
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
}
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
}
{
    question: "select vehicles",
        "all_words": [
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
            "good_words": [
                "car",
                "bus",
                "train"
            ]
*/

// Checking if the user entered their nickname
function checkGuess() {
    if (!document.getElementById("nicknameInput").value) {
        alert("Please enter your nickname. ")
        return false
    }
    return true
}

/*
function drawGameBoard() {
    var c = document.getElementById("gameBoard");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(20, 20, 250, 300);
    ctx.stroke();
}*/


function submitNickname() {
    if (!checkGuess()) {
        return
    }
    let title = document.getElementById("title")
    let nicknameInput = document.getElementById("nicknameInput")
    let submitButton = document.getElementById("submitButton")
    title.parentNode.removeChild(title)
    nicknameInput.parentNode.removeChild(nicknameInput)
    submitButton.parentNode.removeChild(submitButton)
    document.getElementsByClassName("content")[0].style.height = "80%"
    document.getElementById("gameScreen").style.height = "100%"
    document.getElementById("gameScreen").style.display = "block"
    document.getElementById("footer").style.padding = "80px"
    //drawGameBoard()
}

function submitAnswers() {
    let gameScreen = document.getElementById("gameScreen")
    gameScreen.parentNode.removeChild(gameScreen)
}