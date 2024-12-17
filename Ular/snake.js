const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Konfigurasi permainan
const box = 20;
const rows = canvas.height / box;
const cols = canvas.width / box;

let snake = [{ x: 5 * box, y: 5 * box }];
let food = {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
};
let direction = "RIGHT";
let gameInterval;

// Gambar item
function drawBox(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, box, box);
}

// Gambar ular dan makanan
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar makanan
    drawBox(food.x, food.y, "red");

    // Gambar ular
    
    snake.forEach((segment, index) => {
        const isHead = index === 0; // Kepala ular
        const size = isHead ? box * 0.8 : box; // Kepala lebih kecil
        ctx.fillStyle = isHead ? "yellow" : "green"; // Warna kepala berbeda
        ctx.fillRect(segment.x + (box - size) / 2, segment.y + (box - size) / 2, size, size);
    });
    
}

// Gerakan ular
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    snake.unshift(head);

    // Cek apakah ular makan
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * cols) * box,
            y: Math.floor(Math.random() * rows) * box,
        };
    } else {
        snake.pop();
    }

    // Periksa tabrakan
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert("Game Over!");
    }
}

// Input kontrol
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Jalankan permainan
function startGame() {
    gameInterval = setInterval(() => {
        moveSnake();
        draw();
    }, 150);
}

startGame();
