'use strict'

const api = require('./game-api')
const ui = require('./game-ui')

const X = 'x'
const O = 'o'
let xTurn = false
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

const content = $('.square')
const winMessageText = $('#wins-game-text')
const winMessageElement = $('#winning-message')

function gameOver (draw) {
  if (draw) {
    winMessageText.text("It's a Draw!")
  } else {
    winMessageText.text(`${xTurn ? 'X ' : 'O '} Wins!`)
  }
  winMessageElement.show()
}

function gameDraw () {
  return [...content].every(cell => {
    return cell.classList.contains(O) || cell.classList.contains(X)
  })
}

function placeIcon (square, currentPlayer) {
  square.classList.add(currentPlayer)
}

function currentTurn () {
  xTurn = !xTurn
}

function checkWin (currentGame) {
  return arrayCombinations.some(combination => {
    return combination.every(cellIndex => {
      return content[cellIndex].classList.contains(currentGame)
    })
  })
}

const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFailure)
  console.log('onCreateGame ran!')
}

const onIndexGames = function (event) {
  event.preventDefault()
  console.log('onIndexGames ran!')

  api.indexGame()
    .then(ui.onIndexSuccess)
    .catch(ui.onIndexFailure)
}

const onShowGame = function (event) {
  event.preventDefault()
  console.log('onShowGame ran!')

  if (game.id.length !== 0) {
    api.showGame()
      .then(ui.onShowSuccess)
      .catch(ui.onShowFailure)
  } else {
    $('#message').html('<p>Please provide a game id!</p>')
    $('#message').css('background-color', 'red')
    console.log('Please enter a game id!')
  }
}

const onUpdateGame = function (e) {
  event.preventDefault()
  console.log('onUpdateGame ran!')
  // Game logic here
  const square = e.target
  const currentPlayer = xTurn ? X : O
  let gameIsOver
  if (square.classList.contains(X) || square.classList.contains(O)) {
    return
  }
  placeIcon(square, currentPlayer)
  if (checkWin(currentPlayer)) {
    gameOver(false)
    gameIsOver = true
  } else if (gameDraw()) {
    gameOver(true)
    gameIsOver = true
  } else {
    currentTurn()
    gameIsOver = false
  }
  // Game logic
  api.updateGame(square.dataset.index, currentPlayer, gameIsOver)
    .then(ui.onUpdateSuccess)
    .catch(ui.onUpdateFailure)
}

const onDeleteGame = function (event) {
  event.preventDefault()
  console.log('onDeleteGame ran!')

  if (game.id.length !== 0) {
    api.destroyGame()
      .then(ui.onDeleteSuccess)
      .catch(ui.onDeleteFailure)
  } else {
    $('#message').html('<p>Please provide a game id!</p>')
    $('#message').css('background-color', 'red')
    console.log('Please provide an game id!')
  }
}

const addHandlers = () => {
  $('#play-game').on('submit', onCreateGame)
  $('#restart').on('click', onCreateGame)
  // $('#game-index').on('submit', onIndexGames)
  // $('#game-show').on('submit', onShowGame)
  // $('#game-delete').on('click', onDeleteGame)
  $('.square').on('click', onUpdateGame)
}

module.exports = {
  addHandlers
}
