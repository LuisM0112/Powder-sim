
export class Grid {
  constructor(game, cell) {
    this.rows = Math.floor(game.height / cell.height)
    this.cols = Math.floor(game.width / cell.width)
    this.grid = this.fillGrid(cell)
  }

  fillGrid(cell) {
    return Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => ({
        ...cell,
        x: col * cell.width,
        y: row * cell.height
      }))
    )
  }

  getCellPos(cell) {
    const col = Math.floor(cell.x / cell.width)
    const row = Math.floor(cell.y / cell.height)
    if (row < 0 || row >= rows || col < 0 || col >= cols) return null
    return { row, col }
  }
}
