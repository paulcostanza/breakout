// all keyboard actions are stored here
import { paddle, ball } from '../main.js'

// keydown event
export function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }

    if (e.key === " ") {
        ball.dy = -ball.speed
    }
}

// keyup event
export function keyUp(e) {
    if (e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft') {
        paddle.dx = 0
    }

}