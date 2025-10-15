
export class Material {

  constructor(name, color) {
    this.name = name,
    this.color = color
  }
  
  move(){}

  tryMove(cell, grid, dr, dc) {
    const pos = grid.getCellPos(cell.x, cell.y)
    if (!pos) return false
    const nextRow = pos.row + dr
    const nextCol = pos.col + dc
    if (nextRow < 0 || nextRow >= grid.rows || nextCol < 0 || nextCol >= grid.cols) return false
    return grid.grid[nextRow][nextCol].material instanceof Void
  }

  swap({grid, currentRow, currentCol, targetRow, targetCol}) {
    grid.grid[targetRow][targetCol].material = this
    grid.grid[currentRow][currentCol].material = new Void()
  }

  moveIfPossible(cell, grid, dr, dc) {
    const pos = grid.getCellPos(cell.x, cell.y)
    if (!pos) return false
    const { row, col } = pos

    if (!this.tryMove(cell, grid, dr, dc)) return false

    this.swap({
      grid,
      currentRow: row,
      currentCol: col,
      targetRow: row + dr,
      targetCol: col + dc
    })
    return true
  }
}

export class Void extends Material {
  name = 'void'
  color = 'rgb(0,0,0)'
}

export class StoneLike extends Material {
  move(cell, grid){
    this.moveIfPossible(cell, grid, 1, 0)
  }
}

export class SandLike extends Material {
  move(cell, grid) {
    const directions = [
      [1, 0],
      [1, Math.random() < 0.5 ? -1 : 1],
    ]

    for (const [dr, dc] of directions) {
      if (this.moveIfPossible(cell, grid, dr, dc)) break
    }
  }
}

export class WaterLike extends Material {
  move(cell, grid) {
    const directions = [
      [1, 0],
      [1, Math.random() < 0.5 ? -1 : 1],
      [0, Math.random() < 0.5 ? -1 : 1]
    ]

    for (const [dr, dc] of directions) {
      if (this.moveIfPossible(cell, grid, dr, dc)) break
    }
  }
}
