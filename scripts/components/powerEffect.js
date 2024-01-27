// My power-ups and power-downs for the game
// need to make them appear
// need to catch them with the paddle or the ball. 

const ctx = canvas.getContext('2d')

class Effect {
    constructor(apply, timer, sound, end) {
        this.apply = apply
        this.timer = timer
        this.sound = sound
        this.end = end
    }

}

export class Item {
    width = 70
    height = 20
    dy = 2
    notDestroyed = true

    constructor(startX, startY) {
        this.startX = startX
        this.startY = startY

        // get a random block to come from
        this.createIcon()
    }

    createIcon() {
        ctx.beginPath()
        ctx.rect(this.startX, this.startY, this.width, this.height)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'    // set to all zeros when done
        ctx.fill()
        ctx.closePath()
    }

    addSpeed() {
        this.startY += 2
    }

    getStartY() {
        return this.startY
    }

    fall() {
        while (this.notDestroyed) {
            console.log("Running!!")
            this.startY += 2

            ctx.beginPath()
            ctx.rect(this.startX, this.startY, this.width, this.height)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
            ctx.fill()
            ctx.closePath()

            if (this.startY > 1000) {
                this.notDestroyed = false
            }
        }
    }
}