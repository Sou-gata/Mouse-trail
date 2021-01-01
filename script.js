const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = Math.floor(Math.random() * 360);
let particleArry = [];
let mouse = {
    x: undefined,
    y: undefined,
};

let speed = 3;
let effectSize = 15;

class Particle {
    constructor(x, y, directionX, directionY) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        ctx.closePath();
    }
    update() {
        if (this.x + 3 > canvas.width || this.x - 3 < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + 3 > canvas.height || this.y - 3 < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particleArry = [];
    for (let i = 0; i < 300; i++) {
        let x = Math.random() * innerWidth - 6;
        let y = Math.random() * innerHeight - 6;
        let directionX = Math.random() * speed - speed / 2;
        let directionY = Math.random() * speed - speed / 2;
        particleArry.push(new Particle(x, y, directionX, directionY));
    }
}

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particleArry.length; i++) {
        particleArry[i].update();
    }
    mouseConnect();
    requestAnimationFrame(animate);
}
init();
animate();
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
canvas.addEventListener("mouseleave", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
function mouseConnect() {
    if (hue > 360) {
        hue = 0;
    }
    for (let a = 0; a < particleArry.length; a++) {
        hue += 2;
        let dx = particleArry[a].x - mouse.x;
        let dy = particleArry[a].y - mouse.y;
        let distance = dx * dx + dy * dy;
        if (distance < effectSize * 1000) {
            ctx.strokeStyle = `hsla(${hue},80%,50%,0.75)`;
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particleArry[a].x, particleArry[a].y);
            ctx.stroke();
        }
    }
}
