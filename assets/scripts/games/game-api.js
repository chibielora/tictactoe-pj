'use strict'

const config = require('../config')
const store = require('../store')

const createGame = function (data) {
  console.log('data: ', data)
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ''
    // data: data
  })
}

const indexGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showGame = function (game) {
  return $.ajax({
    url: config.apiUrl + '/games/' + game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const destroyGame = function (id) {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGame = function (data) {
  return $.ajax({
    url: config.apiUrl + '/games/' + data.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': 0,
          'value': 'x'
        },
        over: false
      }
    }
    // data: data
  })
}

module.exports = {
  createGame,
  indexGame,
  showGame,
  destroyGame,
  updateGame
}
