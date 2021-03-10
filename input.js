let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
export let rotateHead = 0

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      rotateHead = 270
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      rotateHead = 90
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      rotateHead = 180
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      rotateHead = 0
      break
  }
})

export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}
