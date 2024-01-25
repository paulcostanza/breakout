import { keyDown, keyUp } from './components/moving.js'
import { testing } from './components/test.js'
import { toggleNameMenu, toggleRulesMenu, getUserName, addPlayerToScoreBoard, highScoreName, getUserInfo } from './components/menu.js'
// import { chooseBrick } from './components/powerUps.js'

// functions that are imported
testing()
toggleRulesMenu()
toggleNameMenu()
getUserName()
getUserInfo()

// buttons
const optionsBtn = document.getElementById('options-btn')
const closeOptionsBtn = document.getElementById('close-options-btn')
const highScoreBtn = document.getElementById('high-score-btn')
const closeHighScoreBtn = document.getElementById('close-high-score-btn')

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
const brickRowCount = 10
const brickColumnCount = 11

// create paddle properties
export const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

// create ball properties
let howFast = 4
let r = 5;
const ball = {
    x: paddle.x + paddle.w / 2,
    y: paddle.y - 20,
    size: r * 2,
    speed: 4, // original speed:  howFast,
    dx: 0, // howFast,
    dy: -4, // -howFast
}

// draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#0095dd';
    ctx.fill()
    ctx.closePath()
}

// create brick properties
const brickProp = {
    w: 70,
    h: 20,
    padding: 5,

    // offsets: border area where ball can travel around bricks
    offsetX: 25,
    offsetY: 60,
    visible: true,
    strength: 2
}

// create bricks
const bricks = []
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickRowCount; j++) {
        const x = j * (brickProp.w + brickProp.padding) + brickProp.offsetX
        const y = i * (brickProp.h + brickProp.padding) + brickProp.offsetY
        bricks[i][j] = { x, y, ...brickProp }
    }


}

// chooseBrick(bricks, brickRowCount, brickColumnCount)

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

            // determin opacity -> three different states
            let op = 1.0
            if (brick.strength == 2)
                op = 1.0
            else if (brick.strength == 1)
                op = 0.5

            ctx.fillStyle = brick.visible ? `rgb(0, 149, 221, ${op})` : 'transparent'
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
        ball.y + ball.size > paddle.y &&
        ball.y === 572 &&
        ball.speed > 0) {

        // The ball is given a new direction according to how far from the center of the paddle it collided. 
        // If the ball hits the paddle right in the center, it is sent straight up
        // If it hits towards the edge, it flies off at an angle 

        let distance = ball.x - paddle.x - (paddle.w / 2)

        let relativeCenterOfPaddle = distance / (paddle.h / 2)
        let bounceAngle = relativeCenterOfPaddle * 4

        // ballDX represents the angle the ball will bounce off at
        let ballDX = ball.speed * Math.cos(bounceAngle);

        // double checks which side of the paddle the ball strikes
        // ball.dx is neg for left side, or pos for right side
        if (ball.x > paddle.x + (paddle.w / 2)) {
            ball.dx = Math.abs(ballDX)
        } else {
            ball.dx = -Math.abs(ballDX)
        }

        ball.dy = -Math.abs(ball.dy)

    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {

                // BALL HITTING A FLAT SIDE OF THE BRICK
                // ball hits bottom of brick
                if (ball.x > brick.x &&
                    ball.x < brick.x + brick.w &&
                    ball.y + (ball.size / 2) > brick.y &&
                    ball.y - (ball.size / 2) < brick.y + brick.h) {

                    ball.dy *= -1;

                    outOfStrength(brick)



                    // ball hits top of brick
                } else if (ball.x > brick.x &&
                    ball.x < brick.x + brick.w &&
                    ball.y - (ball.size / 2) < brick.y + brick.h &&
                    ball.y + (ball.size / 2) > brick.y) {

                    ball.dy *= -1;
                    outOfStrength(brick)

                    // ball hits left side of brick
                } else if (ball.y > brick.y &&
                    ball.y < brick.y + brick.h &&
                    ball.x + (ball.size / 2) > brick.x &&
                    ball.x - (ball.size / 2) < brick.x + brick.w) {

                    ball.dx *= -1
                    outOfStrength(brick)

                    // ball hits right side of brick
                } else if (ball.y > brick.y &&
                    ball.y < brick.y + brick.h &&
                    ball.x - (ball.size / 2) < ball.x + ball.w &&
                    ball.x > brick.x) {

                    ball.dx *= -1
                    outOfStrength(brick)
                }

                // BALL HITTING CORNER OF THE BRICK - need to add direction it is coming from
                // Top Left corner
                if (ball.x < brick.x &&
                    ball.y < brick.y) {
                    let a = brick.x - ball.x
                    let b = brick.y - ball.y
                    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

                    if (c < (ball.size / 2)) {
                        // console.log("Top Left Corner: " + c)

                        if (ball.dx > 0 && ball.dy < 0) {
                            ball.dx *= -1
                        } else if (ball.dx < 0 && ball.dy > 0) {
                            ball.dy *= -1
                        } else {
                            ball.dx *= -1
                            ball.dy *= -1
                        }

                        outOfStrength(brick)
                    }

                    // Bottom Left Corner
                } else if (ball.x < brick.x &&
                    ball.y > brick.y + brick.h) {
                    let a = brick.x - ball.x
                    let b = ball.y - (brick.y + brick.h)
                    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

                    if (c < ball.size / 2) {
                        // console.log("Bottom Left Corner: " + c)

                        if (ball.dx < 0 && ball.dy < 0) {
                            ball.dy *= -1
                        } else if (ball.dx > 0 && ball.dy > 0) {
                            ball.dx *= -1
                        } else {
                            ball.dx *= -1
                            ball.dy *= -1
                        }

                        outOfStrength(brick)
                    }

                    // Top Right Corner
                } else if (ball.x > brick.x + brick.w &&
                    ball.y < brick.y) {
                    let a = ball.x - (brick.x + brick.w)
                    let b = brick.y - ball.y
                    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

                    if (c < ball.size / 2) {
                        // console.log("Top Right Corner: " + c)

                        if (ball.dx < 0 && ball.dy < 0) {
                            ball.dx *= -1
                        } else if (ball.dx > 0 && ball.dy > 0) {
                            ball.dy *= -1
                        } else {
                            ball.dx *= -1
                            ball.dy *= -1
                        }

                        outOfStrength(brick)
                    }

                    // Bottom Right Corner
                } else if (ball.x > brick.x + brick.w &&
                    ball.y > brick.y + brick.h) {
                    let a = ball.x - (brick.x + brick.w)
                    let b = ball.y - (brick.y + brick.h)
                    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

                    if (c < ball.size / 2) {
                        // console.log("Bottom Right Corner: " + c)

                        if (ball.dx < 0 && ball.dy > 0) {
                            ball.dx *= -1
                        } else if (ball.dx > 0 && ball.dy < 0) {
                            ball.dy *= -1
                        } else {
                            ball.dx *= -1
                            ball.dy *= -1
                        }

                        outOfStrength(brick)
                    }
                }
            }
        })
    })

    // When we hit the bottom wall
    if (ball.y + ball.size > canvas.height) {

        if (lives > 0) {
            lives--;
        } else {
            addPlayerToScoreBoard(highScoreName, score)
            showAllBricks()
            score = 0
            lives = 3
            getUserInfo()
        }
    }
}

// deletes brick if out of strength
function outOfStrength(brick) {

    brick.strength = brick.strength - 1

    console.log(brick.strength)

    if (brick.strength == 0) {
        brick.visible = false
        increaseScore();
    }
}

// increase score
function increaseScore() {

    score++

    // detects if all the bricks have been cleared
    if (score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks()
        ball.x = paddle.x + paddle.w / 2
        ball.y = paddle.y - 20
    }
}

// make all bricks appear
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
            brick.strength = 2
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

// options and high score menu open/close event handlers
optionsBtn.addEventListener('click', () => options.classList.add('show'))
closeOptionsBtn.addEventListener('click', () => options.classList.remove('show'))

highScoreBtn.addEventListener('click', () => highScore.classList.add('show'))
closeHighScoreBtn.addEventListener('click', () => highScore.classList.remove('show'))

