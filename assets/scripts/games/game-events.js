'use strict'

const api = require('./game-api')
const ui = require('./game-ui')

const X = 'x'
const O = 'o'
let xTurn
const content = $('.square')
const winMessageText = $('#wins-game-text')
const winMessageElement = $('#winning-message')
const cells = ['', '', '', '', '', '', '', '', '']
const arrayCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Creates board and sets X as default to start every game.
const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateSuccess)
    .then(() => {
      xTurn = true
    })
    .catch(ui.onCreateFailure)
  console.log('onCreateGame ran!')
}

// If not X, then O will be next.
function changeTurn () {
  xTurn = !xTurn
}

// Places my elements in the board
function placeIcon (square, currentPlayer) {
  square.classList.add(currentPlayer)
}

// Runs while onCreateGame exists and tracks the board to send AJAX request to server
const onUpdateGame = function (e) {
  event.preventDefault()
  console.log('onUpdateGame ran!')
  // Game logic here
  const square = e.target
  const currentPlayer = xTurn ? X : O
  const cellIndex = square.dataset.index
  let gameIsOver
  if (square.classList.contains(X) || square.classList.contains(O)) {
    ui.onInvalidSpace()
    return
  }
  cells[cellIndex] = currentPlayer
  placeIcon(square, currentPlayer)
  if (checkWin(currentPlayer)) {
    gameOver(false)
    gameIsOver = true
  } else if (gameDraw()) {
    gameOver(true)
    gameIsOver = true
  } else {
    changeTurn()
    gameIsOver = false
  }
  // Game logic
  api.updateGame(cellIndex, currentPlayer, gameIsOver)
    .then(() => ui.onUpdateSuccess(xTurn))
    .catch(ui.onUpdateFailure)
}

// Runs through array and check for some combinations, then all inside that combination.
// Then it will rund through the code and determine if they have the same class in currentGame (If they're all x or o)
function checkWin (currentGame) {
  return arrayCombinations.some(combination => {
    return combination.every(cellIndex => {
      return content[cellIndex].classList.contains(currentGame)
    })
  })
}

// check all squares for O or X
function gameDraw () {
  return [...content].every(cell => {
    return cell.classList.contains(O) || cell.classList.contains(X)
  })
}

// Message for when if game not a draw, then X or O wins
function gameOver (draw) {
  if (draw) {
    winMessageText.text("It's a Draw!")
  } else {
    winMessageText.text(`${xTurn ? 'X ' : 'O '} Wins!`)
  }
  winMessageElement.show()
}

// Calls for ui message for total games
const onIndexGames = function (event) {
  event.preventDefault()
  console.log('onIndexGames ran!')
  api.indexGame()
    .then(ui.onIndexSuccess)
    .catch(ui.onIndexFailure)
}

// Add event listeners that connect to my functions
const addHandlers = () => {
  $('#play-game').on('submit', onCreateGame) // Top left, Resets game board when clicked
  $('#restart').on('click', onCreateGame) // On game over message button that also resets the board when clicked
  $('#game-index').on('click', onIndexGames)
  $('.square').on('click', onUpdateGame)
  // $('#total-score').on('change', totalScore)
}

// Adds some lovely dark mode
function darkMode () {
  const element = document.body
  element.classList.toggle('.dark-mode')
}

module.exports = {
  onIndexGames,
  addHandlers,
  darkMode
}
