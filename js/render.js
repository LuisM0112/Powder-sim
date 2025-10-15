export function drawGrid(ctx, grid) {
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const cell = grid.grid[row][col]
      ctx.fillStyle = cell.material.color
      ctx.fillRect(cell.x, cell.y, cell.width, cell.height)
    }
  }
}

export function drawHighlight(ctx, row, col, grid) {
  if (row == null || col == null) return
  const cell = grid.grid[row][col]
  const [r, g, b] = cell.material.color
    .match(/\d+/g)
    .map((channel) => Math.min(255, +channel + 40))
  ctx.fillStyle = `rgb(${r},${g},${b})`
  ctx.fillRect(cell.x, cell.y, cell.width, cell.height)
}

export function clearElement(ctx, element) {
  ctx.clearRect(element.x, element.y, element.width, element.height)
}
