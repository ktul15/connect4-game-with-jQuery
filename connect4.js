class Connect4 {
  constructor(selector) {
    this.ROWS = 6
    this.COLS = 7
    this.player = 'red'
    this.selector = selector
    this.isGameOver = false
    this.createGrid()
    this.setupEventListeners()
  }

  createGrid() {
    const $board = $(this.selector)
    $board.empty()
    this.isGameOver = false
    this.player = 'red'
    for (let row = 0; row < this.ROWS; row++) {
      let $row = $('<div>')
        .addClass('row')

      for (let col = 0; col < this.COLS; col++) {
        let $col = $('<div>')
          .addClass('col empty')
          .attr('data-col', col)
          .attr('data-row', row)
        $row.append($col)
      }

      $board.append($row)
    }
  }

  setupEventListeners() {
    const $board = $(this.selector)
    const that = this

    $board.on('mouseenter', '.col.empty', function () {
      if (that.isGameOver) return
      const $col = $(this).data('col')
      const $lastEmptyCell = findLastEmptyCell($col)
      $lastEmptyCell.addClass(`light-${that.player}`)
    })

    $board.on('mouseleave', '.col.empty', function () {
      $('.col').removeClass(`light-${that.player}`)
    })

    $board.on('click', '.col.empty', function () {
      if (that.isGameOver) return
      const col = $(this).data('col')
      const $lastEmptyCell = findLastEmptyCell(col)
      $lastEmptyCell.addClass(that.player)
      $lastEmptyCell.removeClass(`empty light-${that.player}`)
      $lastEmptyCell.data(`player`, that.player)
      const row = $lastEmptyCell.data('row')

      const winner = that.checkForWinner(row, col)
      if (winner) {
        that.isGameOver = true
        alert(`Game Over! Player ${that.player} has won!`)
        $(`.col.empty`).removeClass(`empty`)
        return
      }

      that.player = (that.player === 'red') ? 'blue' : 'red'
      $(`#player`).text(that.player)
      $(this).trigger('mouseenter')
    })

    function findLastEmptyCell(col) {
      const colEl = $(`.col[data-col=${col}]`)
      for (let i = colEl.length - 1; i >= 0; i--) {
        const $cell = $(colEl[i])
        if ($cell.hasClass('empty')) {
          return $cell
        }
      }
      return null
    }
  }

  checkForWinner(row, col) {
    const that = this

    const $getCell = (row, col) => {
      return $(`.col[data-row=${row}][data-col=${col}]`)
    }

    function checkDirection(direction) {
      let total = 0
      let i = row + direction.i
      let j = col + direction.j
      let $next = $getCell(i, j)
      while (i >= 0 &&
        i < that.ROWS &&
        j >= 0 &&
        j < that.COLS &&
        $next.data('player') === that.player
      ) {
        total++
        console.log(total)
        i += direction.i
        j += direction.j
        $next = $getCell(i, j)
      }
      return total
    }

    function checkWin(directionA, directionB) {
      const total = 1 +
        checkDirection(directionA) +
        checkDirection(directionB)

      if (total >= 4) return that.player
      return null
    }

    function checkDiagBLtoTR() {
      return checkWin({ i: 1, j: -1 }, { i: -1, j: 1 })
    }

    function checkDiagTLtoBR() {
      return checkWin({ i: -1, j: -1 }, { i: 1, j: 1 })
    }

    function checkVerticals() {
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 })
    }

    function checkHorizontals() {
      return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 })
    }

    return checkVerticals() || checkHorizontals() || checkDiagBLtoTR() || checkDiagTLtoBR()
  }

  restart() {
    this.createGrid()
  }
}