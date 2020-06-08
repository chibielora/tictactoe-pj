'use strict'

const onCreateSuccess = function (data) {
  $('#message').text('Game successfully created')
  $('#message').removeClass()
  $('#message').addClass('success')
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
  console.log('onIndexSuccess ran. Data is :', data.Games)
}

const onIndexFailure = function (error) {
  $('#message').text('Error on getting games')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('onIndexFailure ran. Error is :', error)
}

const onShowSuccess = function (data) {
  $('#message').text('One game successfully received')
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('onCreateSuccess ran. Data is :', data)
}

const onShowFailure = function (error) {
  $('#message').text('Error on getting game')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('onShowFailure ran. Error is :', error)
}

const onDestroySuccess = function () {
  $('#message').text('Game successfully deleted')
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('Game successfully deleted')
}

const onDestroyFailure = function (error) {
  $('#message').text('Error on deleting game')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('onDestroyFailure ran. Error is :', error)
}

const onUpdateSuccess = function () {
  $('#message').text('Game successfully updated')
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

module.exports = {
  onCreateSuccess,
  onCreateFailure,
  onIndexSuccess,
  onIndexFailure,
  onShowSuccess,
  onShowFailure,
  onDestroySuccess,
  onDestroyFailure,
  onUpdateSuccess,
  onUpdateFailure
}
