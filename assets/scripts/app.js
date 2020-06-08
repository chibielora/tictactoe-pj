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
const winMessage = $('#wins-game-text')
const restartButton = $('#restart')
let xTurn
startGame()

restartButton.on('click', startGame)

function onClick (e) {
  const square = e.target
  const currentPlayer = xTurn ? X : O
  placeIcon(square, currentPlayer)
  if (checkWin(currentPlayer)) {
    gameOver(false)
  } else if (gameDraw()) {
    gameOver(true)
  } else {
    currentTurn()
  }
}

function startGame () {
  xTurn = false
  content.each(index => {
    const square = content[index]
    square.removeEventListener('click', onClick)
    square.addEventListener('click', onClick, { once: true })
  })
}

function gameOver (draw) {
  if (draw) {
    winMessage.text("It's a Draw!")
  } else {
    winMessage.text(`${xTurn ? 'X ' : 'O '} Wins!`)
  }
  winMessage.addClass('show')
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
