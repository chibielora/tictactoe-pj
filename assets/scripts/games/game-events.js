'use strict'

const api = require('./game-api')
const ui = require('./game-ui')
const store = require('../store')

const X = 'x'
const O = 'o'
let xTurn
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

function changeTurn () {
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
    .then(() => {
      xTurn = true
    })
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

// let result = 0
// const totalScore = function (event) {
//   event.preventDefault()
//   api.indexGame()
//   if (store.game.gameOver === true) {
//     result += 1
//     return result
//   }
//   console.log(result)
// }

// function totalScore (result) {
//   document.querySelector('#total-score').innerHTML = result
// }

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

const addHandlers = () => {
  $('#play-game').on('submit', onCreateGame)
  $('#restart').on('click', onCreateGame)
  $('#game-index').on('click', onIndexGames)
  $('.square').on('click', onUpdateGame)
  // $('#total-score').on('change', totalScore)
  // $('#total-score').on( ,totalScore)
}

function darkMode () {
  const element = document.body
  element.classList.toggle('.dark-mode')
}

module.exports = {
  onIndexGames,
  addHandlers,
  darkMode
}
