'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events')
$(() => {
  // your JS code goes here
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePw)
  $('#sign-out').on('click', authEvents.onSignOut)
})

const gameEvents = require('./games/game-events')
$(() => {
  // $('#play-game').on('submit', gameEvents.onCreateGame)
  // $('#container').hide()
  // $('#main').hide()
  // $('.box').on('click', gameEvents.onUpdateGame)
  // // $('#new-game').on('submit', gamesEvents.onCreateGame)
  // $('#stats').on('submit', gameEvents.onGetGames)
})

const X = 'x'
const O = 'o'
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
const winMessageText = $('#winsGameText')
const winMessageElement = $('#winningMessage')
const restartButton = $('#restart')
let xTurn

startGame()
restartButton.on('click', startGame)

function onClick (e) {
  const square = e.target
  console.log(square.dataset.index)
  const currentPlayer = xTurn ? X : O
  let gameIsOver
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
  // updateGame(index, currentPlayer, gameIsOver)

}

function startGame () {
  xTurn = false
  content.each(index => {
    const square = content[index]
    square.removeEventListener('click', onClick)
    square.addEventListener('click', onClick, { once: true })
  })
  winMessageElement.removeClass('show')
}

function gameOver (draw) {
  if (draw) {
    winMessageText.text("It's a Draw!")
  } else {
    winMessageText.text(`${xTurn ? 'X ' : 'O '} Wins!`)
  }
  winMessageElement.addClass('show')
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
