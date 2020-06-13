'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events')
const gameEvents = require('./games/game-events')
const Darkmode = require('darkmode-js')
$(() => {
  // your JS code goes here
  authEvents.addHandlers()
  gameEvents.addHandlers()
  // Initial UI setup
  $('#game-board').hide()
  $('#winning-message').hide()

  new Darkmode().showWidget()
})
