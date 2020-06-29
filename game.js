window.onload = function () {
    var stage = document.getElementById("stage")
    var ctx = stage.getContext("2d")
    document.addEventListener("keydown", keypush)

    setInterval(game, 90)


    const vel = 1                    //vel
    var vx = vy = 0                 //vel to x and y
    var px = py = 10                // snake's head  position
    var tp = 20                     // step size
    var qp = 20                    // number of steps
    var ax = ay = 15                // apple  first position 
    var gax = gay = 0              // gold apple  first position
    var pox = poy = 10                // poison  first position
    var score = 0
    var trail = []
    tail = 5



    function game() {


        px += vx
        py += vy

        if (px < 0) {
            px = qp - 1
        }
        if (px > qp - 1) {
            px = 0
        }
        if (py < 0) {
            py = qp - 1
        }
        if (py > qp - 1) {
            py = 0
        }


        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, stage.width, stage.height)


        ctx.fillStyle = "red"
        ctx.fillRect(ax * tp, ay * tp, tp, tp)

        ctx.fillStyle = "green"
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1)

            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0
                px = py = 10
                ax = ay = 15
                tail = 5
                score = 0
                scr.innerHTML = `<h1>${score}</h1>`
            }
        }

        trail.push({ x: px, y: py })

        while (trail.length > tail) {
            trail.shift()
        }

        goldApple()
        poison()

        if (ax == px && ay == py) {
            tail++
            ax = Math.floor(Math.random() * qp)
            ay = Math.floor(Math.random() * qp)
            score++
            scr.innerHTML = `<h1>${score}</h1>`
        }
    }

    function keypush(event) {
        switch (event.keyCode) {
            case 37:  //left
                if (vx != vel) {
                    vx = -vel
                    vy = 0
                }
                break
            case 38: //up
                if (vy != vel) {
                    vx = 0
                    vy = -vel
                }
                break
            case 39: //right
                if (vx != -vel) {
                    vx = vel
                    vy = 0
                }
                break
            case 40: //down
                if (vy != -vel) {
                    vx = 0
                    vy = vel
                }
                break
            // same controls, but using the W A S D keys
            case 65:  //left
                if (vx != vel) {
                    vx = -vel
                    vy = 0
                }
                break
            case 87: //up 
                if (vy != vel) {
                    vx = 0
                    vy = -vel
                }
                break
            case 68: //right 
                if (vx != -vel) {
                    vx = vel
                    vy = 0
                }
                break
            case 83: //down
                if (vy != -vel) {
                    vx = 0
                    vy = vel
                }
                break
            case 32:    // spacebar = reload game
                vx = vy = 0
                break
        }
    }

    function goldApple() {
        if (score >= 5) {
            ctx.fillStyle = "yellow"
            ctx.fillRect(gax * tp, gay * tp, tp, tp)

            if (gax == px && gay == py) {
                tail += 2
                gax = Math.floor(Math.random() * qp)
                gay = Math.floor(Math.random() * qp)
                score += 2
                scr.innerHTML = `<h1>${score}</h1>`
            }
        }
    }

    function poison() {
        if (score >= 15) {
            ctx.fillStyle = "blue"
            ctx.fillRect(pox * tp, poy * tp, tp, tp)

            if (pox == px && poy == py) {
                tail -= 5
                pox = Math.floor(Math.random() * qp)
                poy = Math.floor(Math.random() * qp)
                score -= 5
                scr.innerHTML = `<h1>${score}</h1>`
            }
        }
    }
}

