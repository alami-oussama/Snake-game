import { getInputDirection, rotateHead } from './input.js'

export const snakeSpeed = 15
const snakeBody = [
    { x: 9, y: 8 },
    { x: 8, y: 8 },
    { x: 7, y: 8 },
]
let newSegments = 0
let score = document.getElementById('score')
const scoreDiv = document.createElement('div')
scoreDiv.innerHTML = 0
score.appendChild(scoreDiv)

export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    if (inputDirection.x === 0 && inputDirection.y === 0) return
    for (let i = snakeBody.length - 2; i >= 0; i--)
        snakeBody[i + 1] = { ...snakeBody[i] }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBorad) {
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div')
        let rotateBody = 0
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        if (index === 0) {
            snakeElement.classList.add('snake-head')
            snakeElement.style.transform = `rotate(${rotateHead}deg)`
        } else if (index === snakeBody.length - 1)
            snakeElement.classList.add('snake-tail')
        else snakeElement.classList.add('snake-body')
        if (index !== 0) {
            if (snakeBody[index].y < snakeBody[index - 1].y) rotateBody = 90
            else if (snakeBody[index].y > snakeBody[index - 1].y)
                rotateBody = 270
            else if (snakeBody[index].x < snakeBody[index - 1].x) rotateBody = 0
            else if (snakeBody[index].x > snakeBody[index - 1].x)
                rotateBody = 180
            snakeElement.style.transform = `rotate(${rotateBody}deg)`
        }
        if (index !== 0 && index !== snakeBody.length - 1) {
            if (
                (snakeBody[index].y < snakeBody[index - 1].y &&
                    snakeBody[index].x < snakeBody[index + 1].x) ||
                (snakeBody[index].y < snakeBody[index + 1].y &&
                    snakeBody[index].x < snakeBody[index - 1].x)
            ) {
                snakeElement.classList.add('snake-zig')
                rotateBody = 90
            } else if (
                (snakeBody[index].y < snakeBody[index - 1].y &&
                    snakeBody[index].x > snakeBody[index + 1].x) ||
                (snakeBody[index].y < snakeBody[index + 1].y &&
                    snakeBody[index].x > snakeBody[index - 1].x)
            ) {
                snakeElement.classList.add('snake-zig')
                rotateBody = 180
            } else if (
                (snakeBody[index].y > snakeBody[index - 1].y &&
                    snakeBody[index].x < snakeBody[index + 1].x) ||
                (snakeBody[index].y > snakeBody[index + 1].y &&
                    snakeBody[index].x < snakeBody[index - 1].x)
            ) {
                snakeElement.classList.add('snake-zig')
                rotateBody = 0
            } else if (
                (snakeBody[index].y > snakeBody[index - 1].y &&
                    snakeBody[index].x > snakeBody[index + 1].x) ||
                (snakeBody[index].y > snakeBody[index + 1].y &&
                    snakeBody[index].x > snakeBody[index - 1].x)
            ) {
                snakeElement.classList.add('snake-zig')
                rotateBody = 270
            }
            snakeElement.style.transform = `rotate(${rotateBody}deg)`
        }
        gameBorad.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegments += amount
    scoreDiv.innerHTML++
    score.appendChild(scoreDiv)
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPoistions(segment, position)
    })
}

function equalPoistions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}
