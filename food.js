import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

let food = { x: 20, y: 8 };
const expantion_rate = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(expantion_rate);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBorad) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBorad.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition))
    newFoodPosition = randomGridPosition();
  return newFoodPosition;
}
