
import { Material, Void, StoneLike, SandLike, WaterLike } from "@/class/material.js"
import { Grid } from "@/class/grid.js"
import { Cell } from "@/class/cell.js"

const $ = (element) => document.querySelector(element)

const canvas = $('#game')
const materialRadioContainer = $('#material-radio-container')
const materialRadioTemplate = $('#material-radio-template')
const resetBtn = $('#reset-btn')
const ctx = canvas.getContext('2d')

const game = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
}

const cell = new Cell({
  X: 0,
  y: 0,
  width: 10,
  height: 10,
  material: new Void()
})

const mouse = {
  x: 0,
  y: 0,
  isDrawing: false
}

const MATERIALS = {
  VOID: new Void(),
  METAL: new Material('metal', 'rgb(54,54,54)'),
  STONE: new StoneLike('stone', 'rgb(128,128,128)'),
  SAND: new SandLike('sand', 'rgb(255,232,173)'),
  WATER: new WaterLike('water', 'rgb(23,131,255)'),
}

let animationFrameID = null
let grid = new Grid(game, cell)
let selectedMaterial = MATERIALS.VOID

function handleDrawing(row, col, grid, material) {
  if (!mouse.isDrawing) return
  if (row == null || col == null) return
  const cell = grid.grid[row][col]
  if (cell.material == selectedMaterial) return
  cell.material = material
}

function drawGrid(grid) {
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const cell = grid.grid[row][col]
      ctx.fillStyle = cell.material.color
      ctx.fillRect(cell.x, cell.y, cell.width, cell.height)
    }
  }
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

function drawHighlight(row, col, grid) {
  if (row == null || col == null) return
  const cell = grid.grid[row][col]
  const [r, g, b] = cell.material.color.match(/\d+/g).map(channel => Math.min(255, +channel + 40))
  ctx.fillStyle = `rgb(${r},${g},${b})`
  ctx.fillRect(cell.x, cell.y, cell.width, cell.height)
}

function clearElement(element) {
  ctx.clearRect(element.x, element.y, element.width, element.height)
}

function addMaterialRadioButtons(materials) {
  Object.entries(materials).forEach(([key, value]) => {
    const clone = materialRadioTemplate.content.cloneNode(true)
    const input = clone.querySelector("input")
    const label = clone.querySelector(".label-text")

    input.value = key
    label.textContent = key
    input.addEventListener("change", () => {
      selectedMaterial = MATERIALS[key]
    })
    materialRadioContainer.appendChild(clone)
  });
}

resetBtn.addEventListener('click', start)

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.offsetX
  mouse.y = event.offsetY
})

canvas.addEventListener('mousedown', (event) => {
  mouse.isDrawing = true
})

canvas.addEventListener('mouseup', (event) => {
  if (mouse.isDrawing) {
    mouse.isDrawing = false
  }
})

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

  clearElement(game)
  drawGrid(grid)

  moveCells(grid)
  const mousePos = grid.getCellPos(mouse.x, mouse.y)

  if (mousePos) {
    drawHighlight(mousePos.row, mousePos.col, grid)
    handleDrawing(mousePos.row, mousePos.col, grid, selectedMaterial)
  }

  animationFrameID = window.requestAnimationFrame(process)
}
addMaterialRadioButtons(MATERIALS)
start()
