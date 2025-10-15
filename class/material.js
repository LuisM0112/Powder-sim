
export const MATERIALS = {
  VOID: {
    name: 'void',
    color:'rgb(0,0,0)'
  },
  SAND: {
    name: 'sand',
    color:'rgb(255,232,173)'
  },
  STONE: {
    name: 'stone',
    color:'rgb(128,128,128)'
  },
  WATER: {
    name: 'water',
    color:'rgb(23,131,255)'
  },
  METAL: {
    name: 'metal',
    color:'rgb(54,54,54)'
  },
}

export class Material {
  tryMove(r, c, grid) {
    if (r < 0 || r >= grid.rows || c < 0 || c >= grid.cols) return false
    if (!(grid.grid[r][c].material instanceof Void)) return false
    return true
  }

  move(){}

  // swap(grid, currentRow, currentCol, targetRow, targetCol, NewMaterial) {
  //   grid.grid[targetRow][targetCol].material = new NewMaterial()
  //   grid.grid[currentRow][currentCol].material = new Void()
  // }
}

export class Void extends Material {
  name = MATERIALS.VOID.name
  color = MATERIALS.VOID.color
}

export class Metal extends Material {
  name = MATERIALS.METAL.name
  color = MATERIALS.METAL.color
}

export class StoneLike extends Material {
  name = MATERIALS.STONE.name
  color = MATERIALS.STONE.color

  move(cell, grid){
    const pos = grid.getCellPos(cell.x, cell.y)
    if (!pos) return
    const {row, col} = pos
    if (this.tryMove(row + 1, col, grid)) {
      grid.grid[row + 1][col].material = new StoneLike()
      grid.grid[row][col].material = new Void()
      return
    }
  }
}

export class SandLike extends Material {
  name = MATERIALS.SAND.name
  color = MATERIALS.SAND.color

  move(cell, grid) {
    const pos = grid.getCellPos(cell.x, cell.y)
    if (!pos) return
    const {row, col} = pos

    if (this.tryMove(row + 1, col, grid)) {
      grid.grid[row + 1][col].material = new SandLike()
      grid.grid[row][col].material = new Void()
      return
    }
    if (this.tryMove(row + 1, col - 1, grid)) {
      grid.grid[row + 1][col - 1].material = new SandLike()
      grid.grid[row][col].material = new Void()
      return
    }
    if (this.tryMove(row + 1, col + 1, grid)) {
      grid.grid[row + 1][col + 1].material = new SandLike()
      grid.grid[row][col].material = new Void()
      return
    }
  }
}

export class WaterLike extends Material {
  name = MATERIALS.WATER.name
  color = MATERIALS.WATER.color

  move(cell, grid) {
    const pos = grid.getCellPos(cell.x, cell.y)
    if (!pos) return
    const { row, col } = pos

    if (this.tryMove(row + 1, col, grid)) {
      grid.grid[row + 1][col].material = new WaterLike()
      grid.grid[row][col].material = new Void()
      return
    }

    if (Math.random() < 0.5) {
      if (this.tryMove(row, col - 1, grid)) {
        grid.grid[row][col - 1].material = new WaterLike()
        grid.grid[row][col].material = new Void()
        return
      }
      if (this.tryMove(row, col + 1, grid)) {
        grid.grid[row][col + 1].material = new WaterLike()
        grid.grid[row][col].material = new Void()
        return
      }
    } else {
      if (this.tryMove(row, col + 1, grid)) {
        grid.grid[row][col + 1].material = new WaterLike()
        grid.grid[row][col].material = new Void()
        return
      }
      if (this.tryMove(row, col - 1, grid)) {
        grid.grid[row][col - 1].material = new WaterLike()
        grid.grid[row][col].material = new Void()
        return
      }
    }
  }
}
