const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// logiczny rozmiar gry (piksele CSS)
const GAME_W = 400;
const GAME_H = 600;
// kontroluje czy rury się poruszają (używane do zamrożenia rur po przegranej)
let pipesMoving = true;

// Obsługa HiDPI / Retina: dopasuj wewnętrzny rozmiar płótna do devicePixelRatio
function setupCanvasHiDPI() {
  const DPR = window.devicePixelRatio || 1;
  const logicalWidth = 400;
  const logicalHeight = 600;

  // zachowaj rozmiar CSS (zgodny z atrybutami HTML) i zwiększ wewnętrzny bufor pikseli
  canvas.style.width = logicalWidth + "px";
  canvas.style.height = logicalHeight + "px";
  canvas.width = logicalWidth * DPR;
  canvas.height = logicalHeight * DPR;

  // skaluj kontekst rysowania tak, aby 1 jednostka = 1 piksel CSS
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.imageSmoothingEnabled = false;
}

setupCanvasHiDPI();

// Pomocnicza funkcja bezpiecznego odtwarzania dźwięku (musi być zdefiniowana wcześniej)
function safePlay(audio) {
  if (audio && typeof audio.play === "function") {
    audio.currentTime = 0;
    audio.play().catch(() => {
      // cicho ignoruj błędy audio (wyciszone, zablokowane itp.)
    });
  }
}

// Nakładki DOM
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const playAgainBtn = document.getElementById("playAgainBtn");
const goScore = document.getElementById("goScore");
const topList = document.getElementById("topList");
const scoreHUD = document.getElementById("scoreHUD");

function showStartScreen() {
  startScreen.classList.remove("hidden");
}
function hideStartScreen() {
  startScreen.classList.add("hidden");
}

function showGameOverScreen() {
  // wypełnij statystyki
  goScore.textContent = "Wynik: " + score;
  // wypełnij listę najlepszych wyników
  topList.innerHTML = "";
  for (let i = 0; i < bestScores.length; i++) {
    const li = document.createElement("li");
    li.textContent = i + 1 + ". " + bestScores[i];
    topList.appendChild(li);
  }
  gameOverScreen.classList.remove("hidden");
  restartAvailable = true;
}

function hideGameOverScreen() {
  gameOverScreen.classList.add("hidden");
  restartAvailable = false;
}

playAgainBtn &&
  playAgainBtn.addEventListener("click", () => {
    hideGameOverScreen();
    resetGame();
  });

// HUD wyniku jest aktualizowany z pętli rysującej

// pokaż ekran startowy na początku (zostanie ukryty po rozpoczęciu gry)
showStartScreen();

let isGameOver = false;
let velocity = 0;
let gravity = 0.2;
let score = 0;
let bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];
let lastScore = parseInt(localStorage.getItem("lastScore")) || 0;
let isStarted = false;
let restartAvailable = false;
let justStarted = false;
let rafId = null;

// ====== ŁADOWANIE OBRAZÓW ======
const background = new Image();
background.src = "./assets/Flappy Bird/background-day.png";

const birdFramesSrc = [
  "./assets/Flappy Bird/yellowbird-downflap.png",
  "./assets/Flappy Bird/yellowbird-midflap.png",
  "./assets/Flappy Bird/yellowbird-upflap.png",
];

const pipeImg = new Image();
pipeImg.src = "./assets/Flappy Bird/pipe-green.png";

const baseImg = new Image();
baseImg.src = "./assets/Flappy Bird/base.png";
baseImg.onload = checkLoaded;

const messageImg = new Image();
messageImg.src = "./assets/UI/message.png";

messageImg.onload = checkLoaded;

const gameoverImg = new Image();
gameoverImg.src = "./assets/UI/gameover.png";

gameoverImg.onload = checkLoaded;

let birdSprites = [];
let loadedImages = 0;

// liczymy załadowane obrazki
function checkLoaded() {
  loadedImages++;

  // birdFramesSrc.length = 3
  // + background (1)
  // + pipe (1)
  // + message (1)
  // + gameover (1)
  // + base (1)
  // = 8 images total
  if (loadedImages === birdFramesSrc.length + 5) {
    // uruchom pętlę rysowania aby pokazać ekran powitalny (tylko raz)
    if (!rafId) draw();
  }
}

// tło
background.onload = checkLoaded;

// ptak
birdFramesSrc.forEach((src) => {
  const img = new Image();
  img.onload = checkLoaded;
  img.src = src;
  birdSprites.push(img);
});

// rury
pipeImg.onload = checkLoaded;

// ====== Ptak ======
let birdX = 80;
let birdY = 250;
let frame = 0;
const BIRD_W = 34;
const BIRD_H = 24;

function checkCollision(pipe) {
  // granice ptaka
  const birdLeft = birdX;
  const birdRight = birdX + BIRD_W;
  const birdTop = birdY;
  const birdBottom = birdY + BIRD_H;

  // granice rur
  const pipeLeft = pipe.x;
  const pipeRight = pipe.x + pipeWidth;

  const topPipeBottom = pipe.topHeight;
  const bottomPipeTop = pipe.topHeight + pipe.gap;

  // czy ptak jest na szerokości rury?
  const horizontally = birdRight > pipeLeft && birdLeft < pipeRight;

  // kolizja z górną rurą
  const hitTop = birdTop < topPipeBottom && horizontally;

  // kolizja z dolną rurą
  const hitBottom = birdBottom > bottomPipeTop && horizontally;

  return hitTop || hitBottom;
}

function startGame() {
  // rozpocznij rozgrywkę
  isStarted = true;
  isGameOver = false;
  restartAvailable = false;
  score = 0;
  // natychmiast zaktualizuj HUD DOM
  if (scoreHUD) scoreHUD.textContent = score;
  pipes = [];
  birdX = 80;
  birdY = 250;
  velocity = 0;
  justStarted = true;

  hideStartScreen();
  hideGameOverScreen();

  // odtwórz muzykę jeśli dostępna
  if (backgroundMusic) {
    backgroundMusic.currentTime = 0;
    backgroundMusic.loop = true;
    safePlay(backgroundMusic);
  }
  // upewnij się, że rury się poruszają po rozpoczęciu gry
  pipesMoving = true;
}

let pipes = [];
let pipeWidth = 52;
let pipeSpeed = 2;
let frameCount = 0;

// DŹWIĘKI
const sounds = {
  wing: new Audio("./assets/Sound Efects/wing.wav"),
  hit: new Audio("./assets/Sound Efects/hit.wav"),
  die: new Audio("./assets/Sound Efects/die.wav"),
  point: new Audio("./assets/Sound Efects/point.wav"),
  swoosh: new Audio("./assets/Sound Efects/swoosh.wav"),
};

// Opcjonalna muzyka tła (jeśli dodasz plik do assets)
let backgroundMusic = null;
try {
  backgroundMusic = new Audio("./assets/Sound Efects/music.mp3");
  // Jeśli plik nie istnieje, odtwarzanie może nie powieść się cicho, co jest akceptowalne
} catch (e) {
  backgroundMusic = null;
}

// wysokość bazy w pikselach logicznych (skalowana w razie potrzeby)
const BASE_H = 112;

// ====== Rysowanie ======
function draw() {
  // zawsze rysuj tło i HUD (w tym ekran powitalny)
  ctx.drawImage(background, 0, 0, GAME_W, GAME_H);
  frameCount++;

  // generuj rury i uruchamiaj fizykę tylko gdy gra się rozpoczęła
  if (isStarted && !isGameOver) {
    if (frameCount % 100 === 0) {
      let topHeight = Math.random() * 200 + 50;

      // LOSOWA PRZERWA - między 120 a 180
      let gap = Math.random() * 60 + 120;

      pipes.push({
        x: GAME_W,
        topHeight: topHeight,
        gap: gap,
        passed: false,
      });
    }

    // Fizyka ptaka: pomiń pierwszy krok fizyki zaraz po rozpoczęciu, aby uniknąć dodatkowego impulsu
    if (justStarted) {
      justStarted = false;
    } else {
      velocity += gravity;
      birdY += velocity;
    }
  }

  pipes.forEach((pipe) => {
    // GÓRNA RURA (odwrócona) - otwór skierowany w dół
    ctx.save();
    ctx.translate(pipe.x + pipeWidth / 2, pipe.topHeight);
    ctx.scale(1, -1);
    ctx.drawImage(pipeImg, -pipeWidth / 2, 0, pipeWidth, 400);
    ctx.restore();

    // DOLNA RURA (normalna)
    ctx.drawImage(pipeImg, pipe.x, pipe.topHeight + pipe.gap, pipeWidth, 400);
  });
  pipes.forEach((pipe) => {
    if (pipesMoving) {
      pipe.x -= pipeSpeed;
    }
  });

  // zwiększaj wynik (tylko podczas gry)
  if (isStarted) {
    pipes.forEach((pipe) => {
      if (!pipe.passed && pipe.x + pipeWidth < birdX) {
        score++;
        // szybko zapisz ostatni wynik
        localStorage.setItem("lastScore", score);
        safePlay(sounds.point);
        pipe.passed = true;
      }
    });
  }

  pipes = pipes.filter((pipe) => pipe.x > -pipeWidth);

  // sprawdź kolizje z rurami
  pipes.forEach((pipe) => {
    if (!isGameOver && checkCollision(pipe)) {
      // zagraj dźwięk uderzenia
      safePlay(sounds.hit);
      gameOver();
      return; // exit early to prevent multiple gameOver calls
    }
  });

  // kolizja z ziemią/bazą (jeśli ptak dotknie bazy)
  if (!isGameOver && birdY + BIRD_H >= GAME_H - BASE_H) {
    // ustaw ptaka dokładnie nad bazą
    birdY = GAME_H - BASE_H - BIRD_H;
    gameOver();
  }

  // rysuj ptaka
  // rysuj ptaka z obrotem zależnym od prędkości
  let angle = velocity * 3;

  if (angle > 25) angle = 25;
  if (angle < -25) angle = -25;

  ctx.save();
  ctx.translate(birdX + 17, birdY + 12);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.drawImage(birdSprites[frame], -17, -12);
  ctx.restore();

  // rysuj bazę na dole
  if (baseImg.complete) {
    ctx.drawImage(baseImg, 0, GAME_H - BASE_H, GAME_W, BASE_H);
  }

  // aktualizuj HUD DOM (górny prawy) zamiast rysować wynik na canvas
  if (scoreHUD) scoreHUD.textContent = score;

  rafId = requestAnimationFrame(draw);
}

function gameOver() {
  // zapobiegaj wielokrotnym wywołaniom gameOver w tej samej klatce
  if (isGameOver) return;

  isGameOver = true;
  isStarted = false; // stop gameplay input

  // wyczyść ID animacji, ponieważ zatrzymujemy pętlę główną
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  // natychmiast zamroź rury, aby przestały się poruszać na canvas
  pipesMoving = false;

  // animacja opadania - szybkie opadnięcie na ziemię, potem całkowite zatrzymanie
  let drop = setInterval(() => {
    velocity += 0.2;
    birdY += velocity;

    // Stop after bird reaches ground
    if (birdY + BIRD_H >= GAME_H - BASE_H) {
      birdY = GAME_H - BASE_H - BIRD_H;
      clearInterval(drop);

      // save to TOP 5
      lastScore = score;
      localStorage.setItem("lastScore", lastScore);

      bestScores.push(score);
      bestScores.sort((a, b) => b - a);
      bestScores = bestScores.slice(0, 5);
      localStorage.setItem("bestScores", JSON.stringify(bestScores));

      // zagraj dźwięk śmierci
      safePlay(sounds.die);

      // narysuj OSTATECZNĄ statyczną klatkę - tylko tło, bez dalszych aktualizacji
      ctx.drawImage(background, 0, 0, GAME_W, GAME_H);

      // narysuj statyczną bazę
      if (baseImg.complete) {
        ctx.drawImage(baseImg, 0, GAME_H - BASE_H, GAME_W, BASE_H);
      }

      // show DOM game-over overlay (this covers the canvas with stats)
      showGameOverScreen();

      // WAŻNE: NIE wywołuj ponownie requestAnimationFrame - canvas pozostaje zamrożony
    } else {
      // rysuj pośrednie klatki podczas opadania
      ctx.drawImage(background, 0, 0, GAME_W, GAME_H);
      pipes.forEach((pipe) => {
        ctx.save();
        ctx.translate(pipe.x + pipeWidth / 2, pipe.topHeight);
        ctx.scale(1, -1);
        ctx.drawImage(pipeImg, -pipeWidth / 2, 0, pipeWidth, 400);
        ctx.restore();
        ctx.drawImage(
          pipeImg,
          pipe.x,
          pipe.topHeight + pipe.gap,
          pipeWidth,
          400
        );
      });
      if (baseImg.complete) {
        ctx.drawImage(baseImg, 0, GAME_H - BASE_H, GAME_W, BASE_H);
      }
      ctx.drawImage(birdSprites[frame], birdX, birdY);
    }
  }, 16);
}

function resetGame() {
  // natychmiast zrestartuj grę
  isGameOver = false;
  isStarted = false; // Nie uruchamiaj automatycznie, poczekaj na wejście gracza
  restartAvailable = false;
  score = 0;
  // natychmiast zaktualizuj HUD DOM
  if (scoreHUD) scoreHUD.textContent = score;
  birdX = 80;
  birdY = 250;
  velocity = 0; // CRITICAL: reset velocity here
  justStarted = false;
  pipes = [];
  frameCount = 0;

  hideGameOverScreen();
  showStartScreen(); // pokaż ponownie ekran startowy

  // zagraj dźwięk swoosh
  safePlay(sounds.swoosh);

  // wznow pętlę rysowania
  if (!rafId) {
    rafId = requestAnimationFrame(draw);
  }
}

// animacja skrzydeł
setInterval(() => {
  frame = (frame + 1) % 3;
}, 150);

// sterowanie
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    // rozpocznij jeśli jeszcze nie rozpoczęto
    if (!isStarted && !isGameOver) {
      startGame();
      return;
    }

    // zablokuj wejście jeśli gra się zakończyła lub restart oczekuje
    if (!isStarted || isGameOver || restartAvailable) return;

    // normal flap while playing
    velocity = -3;
    safePlay(sounds.wing);
  }
});

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // jeśli gra się nie rozpoczęła – kliknięcie = start
  if (!isStarted && !isGameOver) {
    startGame();
    return;
  }

  // sprawdź kliknięcie wewnątrz obszaru przycisku restartu
  if (restartAvailable) {
    const bx = (GAME_W - 220) / 2;
    const by = GAME_H - 140;
    if (x >= bx && x <= bx + 220 && y >= by && y <= by + 60) {
      restartAvailable = false;
      resetGame();
      return;
    }
  }

  // normal click = flap
  if (isStarted && !restartAvailable) {
    velocity = -3;
    safePlay(sounds.wing);
  }
});
