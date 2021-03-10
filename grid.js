const grid_width = 20
const grid_height = 50
export const gameBoard = document.getElementById('game-board')

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * grid_height) + 1,
    y: Math.floor(Math.random() * grid_width) + 1,
  }
}
export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > grid_height ||
    position.y < 1 ||
    position.y > grid_width
  )
}
