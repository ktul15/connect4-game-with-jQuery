class Connect4 {
  constructor(selector) {
    this.ROWS = 6
    this.COLS = 7
    this.player = 'red'
    this.selector = selector
    this.createGrid()
    this.setupEventListeners()
  }

  createGrid() {
    const $board = $(this.selector)
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
      const $col = $(this).data('col')
      const $lastEmptyCell = findLastEmptyCell($col)
      $lastEmptyCell.addClass(`light-${that.player}`)
    })

    $board.on('mouseleave', '.col.empty', function () {
      $('.col').removeClass(`light-${that.player}`)
    })

    $board.on('click', '.col.empty', function () {
      const $col = $(this).data('col')
      const $lastEmptyCell = findLastEmptyCell($col)
      $lastEmptyCell.addClass(that.player)
      $lastEmptyCell.removeClass(`empty light-${that.player}`)
      that.player = (that.player === 'red') ? 'blue' : 'red'
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
}