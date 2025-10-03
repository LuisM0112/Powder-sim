
export const MATERIALS = {
  VOID: "void",
  SAND: "sand",
  STONE: "stone",
  WATER: "water",
  METAL: "metal",
}

export class Material {
  constructor ({name, color}) {
    this.name = name
    this.color = color
  }

  move(){}
}

export class Void extends Material {}

export class StoneLike extends Material {
  move(cell, grid, rows){
    const pos = getCell(cell.x, cell.y)
    if (!pos) return
    const {row, col} = pos
    const nextRow = row + 1
    if (!(nextRow < rows)) return
    const nextCell = grid[nextRow][col]
    if (nextCell && nextCell.material == MATERIALS.VOID) {
      cell.material = new Void()
      nextCell.material = new StoneLike(this.name, this.color)
    }
  }
}
