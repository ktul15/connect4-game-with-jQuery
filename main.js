$(document).ready(function () {
  // TODO: draw a grid
  const connect4 = new Connect4('#connect-4')

  $('#restart').click(() => {
    connect4.restart()
  })
})