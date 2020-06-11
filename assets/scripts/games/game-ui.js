'use strict'

const store = require('../store')

const onCreateSuccess = function (data) {
  $('#game-board').show()
  $('#winning-message').hide()
  $('.square').removeClass('x o')
  store.game = data.game
  store.game.currentTurn = 'x'
  console.log(store)
  console.log('onCreateSuccess ran. Data is :', data)
}

const onCreateFailure = function (error) {
  $('#message').text('Error on creating game')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('onCreateFailure ran. Error is :', error)
}

const onIndexSuccess = function (data) {
  $('#message').text('All games successfully received')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('#total-score').text('You have played ' + data.games.length + ' games.')
  console.log('onIndexSuccess ran. Data is :', data.games.length)
  console.log('Only complete games: ', data.games.filter(game => {
    return game.over
  }))
}

const onIndexFailure = function (error) {
  $('#message').text('Error on getting games')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('onIndexFailure ran. Error is :', error)
}

const onUpdateSuccess = function (xTurn, data) {
  $('#message').text(xTurn ? "X's turn" : "O's turn")
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('Game successfully updated')
}

const onUpdateFailure = function (error) {
  $('#message').text('Error on updating game')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('onUpdateFailure ran. Error is :', error)
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
