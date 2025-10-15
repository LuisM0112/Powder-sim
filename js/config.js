const $ = (element) => document.querySelector(element)

export function setupGame(selector) {
  const canvas = $(selector)
  const ctx = canvas.getContext('2d')

  return {
    canvas,
    ctx,
    game: {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    },
  }
}

export function setupMouse(canvas) {
  const mouse = {
    x: 0,
    y: 0,
    isDrawing: false,
  }

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.offsetX
    mouse.y = e.offsetY
  })
  canvas.addEventListener('mousedown', () => (mouse.isDrawing = true))
  canvas.addEventListener('mouseup', () => (mouse.isDrawing = false))

  return mouse
}

export function setupUI({ MATERIALS, onMaterialChange, onReset }) {
  const container = $('#material-radio-container')
  const template = $('#material-radio-template')
  const resetBtn = $('#reset-btn')

  Object.entries(MATERIALS).forEach(([key, value]) => {
    const clone = template.content.cloneNode(true)
    const input = clone.querySelector('input')
    const label = clone.querySelector('.label-text')

    input.value = key
    label.textContent = key
    input.addEventListener('change', () => onMaterialChange(value))

    container.appendChild(clone)
  })

  resetBtn.addEventListener('click', onReset)
}
