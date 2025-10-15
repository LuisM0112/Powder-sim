import { Cell } from '@/class/cell.js'
import { Void } from '@/class/material.js'

export class Grid {
  constructor(game, cell) {
    this.rows = Math.floor(game.height / cell.height)
    this.cols = Math.floor(game.width / cell.width)
    this.grid = this.fillGrid(cell)
  }

  fillGrid(cell) {
    return Array.from({ length: this.rows }, (_, row) =>
      Array.from({ length: this.cols }, (_, col) =>
        new Cell({
          x: col * cell.width,
          y: row * cell.height,
          width: cell.width,
          height: cell.height,
          material: new Void(),
        })
      )
    )
  }

  getCellPos(x, y) {
    const col = Math.floor(x / this.grid[0][0].width)
    const row = Math.floor(y / this.grid[0][0].height)
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return null
    return { row, col }
  }
}
