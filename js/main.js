import { setupGame, setupMouse, setupUI } from '@/config.js'
import { drawGrid, drawHighlight, clearElement } from '@/render.js'

import {
  Material,
  Void,
  StoneLike,
  SandLike,
  WaterLike,
} from '@/class/material.js'

import { Grid } from '@/class/grid.js'
import { Cell } from '@/class/cell.js'

const { canvas, ctx, game } = setupGame('#game')
const mouse = setupMouse(canvas)

const cell = new Cell({
  X: 0,
  y: 0,
  width: 10,
  height: 10,
  material: new Void(),
})

const MATERIALS = {
  VOID: new Void(),
  METAL: new Material('metal', 'rgb(54,54,54)'),
  STONE: new StoneLike('stone', 'rgb(128,128,128)'),
  SAND: new SandLike('sand', 'rgb(255,232,173)'),
  WATER: new WaterLike('water', 'rgb(23,131,255)'),
}

let grid = new Grid(game, cell)
let selectedMaterial = MATERIALS.VOID
let animationFrameID = null

setupUI({
  MATERIALS,
  onMaterialChange: (material) => (selectedMaterial = material),
  onReset: start,
})

function handleDrawing(row, col, grid, material) {
  if (!mouse.isDrawing) return
  if (row == null || col == null) return
  const cell = grid.grid[row][col]
  if (cell.material == selectedMaterial) return
  cell.material = material
}

function moveCells(grid) {
  for (let row = grid.rows - 1; row >= 0; row--) {
    if (row % 2 === 0) {
      for (let col = 0; col < grid.cols; col++) {
        const cell = grid.grid[row][col]
        if (cell.material.move) cell.material.move(cell, grid)
      }
    } else {
      for (let col = grid.cols - 1; col >= 0; col--) {
        const cell = grid.grid[row][col]
        if (cell.material.move) cell.material.move(cell, grid)
      }
    }
  }
}

function stop() {
  if (animationFrameID == null) return
  window.cancelAnimationFrame(animationFrameID)
  animationFrameID = null
}

function start() {
  stop()
  grid = new Grid(game, cell)
  animationFrameID = window.requestAnimationFrame(process)
}

function process() {
  clearElement(ctx, game)
  drawGrid(ctx, grid)

  moveCells(grid)
  const mousePos = grid.getCellPos(mouse.x, mouse.y)

  if (mousePos) {
    drawHighlight(ctx, mousePos.row, mousePos.col, grid)
    handleDrawing(mousePos.row, mousePos.col, grid, selectedMaterial)
  }

  animationFrameID = window.requestAnimationFrame(process)
}

start()
