'use strict'

const config = require('../config')
const store = require('../store')

// Called in events for AJAX requests.

const createGame = function () {
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

const updateGame = function (cellIndex, cellValue, over) {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: cellIndex,
          value: cellValue
        },
        over: over
      }
    }
    // data: data
  })
}

module.exports = {
  createGame,
  indexGame,
  updateGame
}
