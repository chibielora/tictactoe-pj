'use strict'

const store = require('../store')

// This document holds my top messages, my score message, and console log errors.

const onCreateSuccess = function (data) {
  $('#game-board').show()
  $('#winning-message').hide()
  $('.square').removeClass('x o')
  store.game = data.game
  store.game.currentTurn = 'x'
}

const onCreateFailure = function () {
  $('#message').text('Error on creating game')
  $('#message').removeClass()
  $('#message').addClass('failure')
}

const onIndexSuccess = function (data) {
  $('#message').text('All games successfully received')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('#total-score').text('You have played ' + data.games.length + ' games.')
}

const onIndexFailure = function () {
  $('#message').text('Error on getting games')
  $('#message').removeClass()
  $('#message').addClass('failure')
}

const onUpdateSuccess = function (xTurn, data) {
  $('#message').text(xTurn ? "X's turn" : "O's turn")
  $('#message').removeClass()
  $('#message').addClass('success')
}

const onUpdateFailure = function () {
  $('#message').text('Error on updating game')
  $('#message').removeClass()
  $('#message').addClass('failure')
}

const onInvalidSpace = function () {
  $('#invalid-move').show()
  $('#invalid-move').text("Can't play in this spot")
  setTimeout(() => {
    $('#invalid-move').fadeOut(500)
  }, 300)
  $('#invalid-move').removeClass()
}

module.exports = {
  onCreateSuccess,
  onCreateFailure,
  onIndexSuccess,
  onIndexFailure,
  onUpdateSuccess,
  onUpdateFailure,
  onInvalidSpace
}
