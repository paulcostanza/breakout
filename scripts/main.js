import { keyDown, keyUp } from './components/moving.js'
import { testing } from './components/test.js'
testing()

// buttons
const rulesBtn = document.getElementById('rules-btn')
const optionsBtn = document.getElementById('options-btn')
const closeRulesBtn = document.getElementById('close-btn')
const closeOptionsBtn = document.getElementById('close-options-btn')
const highScoreBtn = document.getElementById('high-score-btn')
const closeHighScoreBtn = document.getElementById('close-high-score-btn')

// rules menu
const rules = document.getElementById('rules')

// high score menu
const highScore = document.querySelector('.high-score')

// Canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Score board
let score = 0

// Total lives
let lives = 3

// Bricks
const brickRowCount = 9
const brickColumnCount = 8

// create ball properties
let howFast = 4
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: howFast,
    dx: howFast,
    dy: -howFast
}

// draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#0095dd';
    ctx.fill()
    ctx.closePath()
}

// create paddle properties
export const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

// create brick properties
const brickProp = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// create bricks
const bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickProp.w + brickProp.padding) + brickProp.offsetX
        const y = j * (brickProp.h + brickProp.padding) + brickProp.offsetY
        bricks[i][j] = { x, y, ...brickProp }
    }
}

// draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

// draw score onto canvas
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// draw lives onto canvas
function drawLives() {
    ctx.font = '20px Arial'
    ctx.fillText(`Lives: ${lives}`, 30, 30)
}

// draw bricks onto the canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

// move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx

    // wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }

    if (paddle.x < 0) {
        paddle.x = 0
    }
}

// move ball on canvas
function moveBall() {
    ball.x += ball.dx
    ball.y += ball.dy

    // ball & wall collision, x-axis (left/right)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx = -ball.dx
    }

    // ball & wall collision, y-axis (top/botom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy = -ball.dy
    }

    // ball & paddle collision
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed
    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {

                //  ball hits bottom of block
                if (ball.x > brick.x &&
                    ball.x < brick.x + brick.w &&
                    ball.y - ball.size === brick.y + brick.h) {
                    ball.dy = -ball.dy
                    brick.visible = false
                    increaseScore()

                    // ball hits top of block
                } else if (ball.x > brick.x &&
                    ball.x < brick.x + brick.w &&
                    ball.y + ball.size === brick.y) {
                    ball.dy = -ball.dy
                    brick.visible = false
                    increaseScore()

                    // ball hits left side of block
                } else if (ball.x + ball.size > brick.x &&
                    ball.x < brick.x &&
                    ball.y > brick.y &&
                    ball.y < brick.y + brick.h) {
                    ball.dx = -ball.dx
                    brick.visible = false
                    increaseScore()

                    // ball hits right side of block
                } else if (ball.x - ball.size < brick.x + brick.w &&
                    ball.x > brick.x + brick.w &&
                    ball.y > brick.y &&
                    ball.y < brick.y + brick.h) {
                    ball.dx = -ball.dx
                    brick.visible = false
                    increaseScore()
                } else if (ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h) {
                    ball.dy = -ball.dy
                    brick.visible = false

                    increaseScore()
                }
            }
        })
    })

    // When we hit the bottom wall
    if (ball.y + ball.size > canvas.height) {

        if (lives > 0) {
            lives--;
        } else {
            showAllBricks()
            score = 0
            lives = 3
        }
    }
}

// increase score
function increaseScore() {
    score++

    if (score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks()
    }
}

// make all bricks appear
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
        })
    })
}

// draw everything onto the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawScore()
    drawLives()
    drawBricks()
}

// update canvas drawing and animation
function update() {
    movePaddle()
    moveBall()

    // draw everything
    draw()

    requestAnimationFrame(update)
}


update()


// keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

// rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'))
closeRulesBtn.addEventListener('click', () => rules.classList.remove('show'))

optionsBtn.addEventListener('click', () => options.classList.add('show'))
closeOptionsBtn.addEventListener('click', () => options.classList.remove('show'))

highScoreBtn.addEventListener('click', () => highScore.classList.add('show'))
closeHighScoreBtn.addEventListener('click', () => highScore.classList.remove('show'))