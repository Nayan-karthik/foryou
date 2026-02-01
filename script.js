window.onload = () => {

const music = document.getElementById("bgMusic");
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

startBtn.addEventListener("click", () => {
  music.volume = 0.4;
  music.play().catch(() => {});
  startScreen.style.display = "none";
});



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const girl = new Image();
girl.src = "assets/girl.png";

const heart = new Image();
heart.src = "assets/heart.png";

const me = new Image();
me.src = "assets/me.png";
canvas.addEventListener("touchstart", e => {
  const touchX = e.touches[0].clientX;
  const canvasRect = canvas.getBoundingClientRect();
  const mid = canvasRect.left + canvas.width / 2;

  if (touchX < mid && player.x > 0) {
    player.x -= player.speed * 4;
  } else if (touchX > mid && player.x < 340) {
    player.x += player.speed * 4;
  }
});

function drawBackground() {
  // Sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#ffe0ec");
  gradient.addColorStop(1, "#fff5fa");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft hearts in background
  ctx.font = "20px Arial";
  ctx.fillStyle = "rgba(255, 77, 109, 0.15)";
  for (let i = 0; i < 10; i++) {
    ctx.fillText(
      "💗",
      (i * 40 + (Date.now() / 50) % 40) % canvas.width,
      (i * 60) % canvas.height
    );
  }
}
function drawCloudPlatform() {
  const y = canvas.height - 40;

  ctx.fillStyle = "#ffffff";

  // main cloud base
  ctx.beginPath();
  ctx.arc(80, y, 30, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(130, y - 20, 40, Math.PI, Math.PI * 2);
  ctx.arc(200, y, 35, Math.PI * 1.5, Math.PI * 0.5);
  ctx.closePath();
  ctx.fill();

  // soft shadow
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(60, y + 20, 160, 5);
}

let player = {
  x: 170,
  y: 500,
  width: 60,
  height: 60,
  speed: 5
};

let falling = {
  x: Math.random() * 340,
  y: -60,
  width: 40,
  height: 40,
  speed: 3,
  type: "heart"
};

let score = 0;
let gameOver = false;

// Controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
  if (e.key === "ArrowRight" && player.x < 340) player.x += player.speed;
});

// Collision
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Game Loop
function gameLoop() {
  drawBackground();
    drawCloudPlatform();

  // Draw player
  ctx.drawImage(girl, player.x, player.y, player.width, player.height);

  // Draw falling object
  if (falling.type === "heart") {
    ctx.drawImage(heart, falling.x, falling.y, falling.width, falling.height);
  } else {
    ctx.drawImage(me, falling.x, falling.y, 60, 60);
  }

  falling.y += falling.speed;

  // Collision
  if (isColliding(player, falling)) {
    if (falling.type === "heart") {
      score++;
      if (score === 10) {
        falling.type = "me";
        falling.y = -80;
        falling.x = player.x;
      } else {
        resetFalling();
      }
    } else {
      endGame();
      return;
    }
  }

  // Missed
  if (falling.y > canvas.height) {
    resetFalling();
  }

  // Score
  ctx.fillStyle = "#ff4d6d";
  ctx.font = "20px Arial";
  ctx.fillText(`Hearts: ${score}/10`, 10, 30);

  requestAnimationFrame(gameLoop);
}

function resetFalling() {
  falling.y = -60;
  falling.x = Math.random() * 340;
}

function endGame() {
  canvas.style.display = "none";
  document.getElementById("final").style.display = "block";
}
function acceptLove() {
  document.getElementById("final").style.display = "none";
  document.getElementById("celebrate").style.display = "block";
}


gameLoop();
};

