import {
    update as update_snake,
    draw as draw_snake,
    snakeSpeed,
    snakeIntersection,
    getSnakeHead,
} from './snake.js'

import { update as update_food, draw as draw_food } from './food.js'

import { outsideGrid, gameBoard } from './grid.js'

let lastRenderTime = 0
let gameOver = false

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lose. Press ok to restart')) window.location = '/'
        return
    }
    window.requestAnimationFrame(main)
    const deltaTime = (currentTime - lastRenderTime) / 1000
    if (deltaTime < 1 / snakeSpeed) return
    lastRenderTime = currentTime
    update()
    if (!gameOver) draw()
}

window.requestAnimationFrame(main)

function update() {
    update_snake()
    update_food()
    check_death()
}

function draw() {
    gameBoard.innerHTML = ''
    draw_snake(gameBoard)
    draw_food(gameBoard)
}

function check_death() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
