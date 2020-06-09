'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./game-api')
const ui = require('./game-ui')

const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateSuccess)
  console.log('onCreateGame ran!')

  const data = getFormFields(event.target)
  api.create(data)
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFailure)
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

  const data = getFormFields(event.target)
  const game = data.game

  if (game.id.length !== 0) {
    api.showGame(game)
      .then(ui.onShowSuccess)
      .catch(ui.onShowFailure)
  } else {
    $('#message').html('<p>Please provide a game id!</p>')
    $('#message').css('background-color', 'red')
    console.log('Please enter a game id!')
  }
}

const onDeleteGame = function (event) {
  event.preventDefault()
  console.log('onDeleteGame ran!')

  const data = getFormFields(event.target)
  const game = data.game

  if (game.id.length !== 0) {
    api.destroyGame(game.id)
      .then(ui.onDeleteSuccess)
      .catch(ui.onDeleteFailure)
  } else {
    $('#message').html('<p>Please provide a game id!</p>')
    $('#message').css('background-color', 'red')
    console.log('Please provide an game id!')
  }
}

const onUpdateGame = function (event) {
  event.preventDefault()
  console.log('onUpdateGame ran!')

  const data = getFormFields(event.target)
  const game = data.game

  if (game.text === '') {
    $('#message').html('<p>Text is required</p>')
    $('#message').css('background-color', 'red')
    console.log('Text is required!')
    return false
  }
  if (game.id.length !== 0) {
    api.updateGame(data)
      .then(ui.onUpdateSuccess)
      .catch(ui.onUpdateFailure)
  } else {
    $('#message').html('<p>Please provide a game id!</p>')
    $('#message').css('background-color', 'red')
    console.log('Please provide a game id!')
  }
}

const addHandlers = () => {
  $('#game-create').on('submit', onCreateGame)
  $('#game-index').on('submit', onIndexGames)
  $('#game-show').on('submit', onShowGame)
  $('#game-delete').on('submit', onDeleteGame)
  $('#game-update').on('submit', onUpdateGame)
}

module.exports = {
  addHandlers
}
