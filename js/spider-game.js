// Variables del juego
let score = 0;
let timeLeft = 30;
let level = 1;
let gameInterval;
let spiderInterval;
let isPlaying = false;
let isPaused = false;

// Elementos del DOM
const gameArea = document.getElementById('gameArea');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const levelElement = document.getElementById('level');
const gameMessage = document.getElementById('gameMessage');

// Mensajes personalizados
const messages = {
    excellent: ["¡Excelente Laura! 🎉", "¡Eres la mejor cazadora! 🏆", "¡Increíble! 💪"],
    good: ["¡Bien hecho! 👍", "¡Sigue así! ⭐", "¡Muy bien! 😊"],
    encourage: ["¡Puedes hacerlo mejor! 💖", "¡No te rindas! 🌟", "¡Tú puedes Laura! 🎯"]
};

// Iniciar el juego
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', resetGame);

function startGame() {
    startScreen.style.display = 'none';
    isPlaying = true;
    pauseBtn.disabled = false;
    score = 0;
    timeLeft = 30;
    level = 1;
    updateStats();
    
    // Timer del juego
    gameInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            // Aumentar nivel cada 10 segundos
            if (timeLeft % 10 === 0 && timeLeft > 0) {
                level++;
                levelElement.textContent = level;
                showMessage("¡Nivel " + level + "! Las arañas son más rápidas 🕷️");
            }
            
            if (timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);
    
    // Generar arañas
    spiderInterval = setInterval(() => {
        if (!isPaused && isPlaying) {
            createSpider();
        }
    }, 2000 - (level * 200)); // Las arañas aparecen más rápido en niveles superiores
}

function createSpider() {
    const spider = document.createElement('div');
    spider.className = 'spider';
    
    // Posición aleatoria desde los bordes
    const side = Math.floor(Math.random() * 4);
    let startX, startY, endX, endY;
    
    switch(side) {
    case 0: // Desde arriba
        startX = Math.random() * (gameArea.offsetWidth - 60);
        startY = -60;
        endX = Math.random() * (gameArea.offsetWidth - 60);
        endY = Math.random() * (gameArea.offsetHeight - 120) + 60; // Centro pantalla
        break;
    case 1: // Desde derecha
        startX = gameArea.offsetWidth;
        startY = Math.random() * (gameArea.offsetHeight - 60);
        endX = Math.random() * (gameArea.offsetWidth - 120);
        endY = Math.random() * (gameArea.offsetHeight - 60);
        break;
    case 2: // Desde abajo
        startX = Math.random() * (gameArea.offsetWidth - 60);
        startY = gameArea.offsetHeight;
        endX = Math.random() * (gameArea.offsetWidth - 60);
        endY = Math.random() * (gameArea.offsetHeight - 120);
        break;
    case 3: // Desde izquierda
        startX = -60;
        startY = Math.random() * (gameArea.offsetHeight - 60);
        endX = Math.random() * (gameArea.offsetWidth - 120) + 60;
        endY = Math.random() * (gameArea.offsetHeight - 60);
        break;
}

    
    spider.style.left = startX + 'px';
    spider.style.top = startY + 'px';
    
    // Movimiento de la araña
    const duration = 5000 - (level * 500); // Más rápido en niveles superiores
    spider.style.transition = `left ${duration}ms linear, top ${duration}ms linear`;
    
    spider.addEventListener('click', (e) => crushSpider(e, spider));
    
    gameArea.appendChild(spider);
    
    // Mover la araña
    setTimeout(() => {
        spider.style.left = endX + 'px';
        spider.style.top = endY + 'px';
    }, 10);
    
    // Eliminar la araña si no fue aplastada
    setTimeout(() => {
        if (spider.parentNode) {
            spider.remove();
        }
    }, duration);
}

function crushSpider(event, spider) {
    if (isPaused || !isPlaying) return;
    
    event.stopPropagation();
    
    // Incrementar puntuación
    score += 10 * level;
    updateStats();
    
    // Efecto de trapeador
    const mop = document.createElement('div');
    mop.className = 'mop-effect';
    mop.style.left = (event.clientX - gameArea.getBoundingClientRect().left - 50) + 'px';
    mop.style.top = (event.clientY - gameArea.getBoundingClientRect().top - 50) + 'px';
    gameArea.appendChild(mop);
    
    // Efecto de aplastamiento
    const splat = document.createElement('div');
    splat.className = 'splat';
    splat.style.left = spider.style.left;
    splat.style.top = spider.style.top;
    gameArea.appendChild(splat);
    
    // Eliminar araña y efectos
    spider.remove();
    setTimeout(() => {
        mop.remove();
        splat.remove();
    }, 500);
    
    // Mostrar mensaje motivacional
    if (score % 50 === 0) {
        const msgArray = score > 100 ? messages.excellent : messages.good;
        showMessage(msgArray[Math.floor(Math.random() * msgArray.length)]);
    }
}

function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Reanudar' : 'Pausar';
    if (isPaused) {
        showMessage("Juego pausado ⏸️");
    } else {
        showMessage("¡Continúa cazando! 🕷️");
    }
}

function updateStats() {
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    levelElement.textContent = level;
}

function showMessage(text) {
    gameMessage.textContent = text;
    setTimeout(() => {
        gameMessage.textContent = '';
    }, 2000);
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(spiderInterval);
    
    // Limpiar arañas
    document.querySelectorAll('.spider').forEach(spider => spider.remove());
    
    // Highscore
    const highscore = localStorage.getItem('spiderHighscore') || 0;
    const newHighscore = score > highscore;
    if (newHighscore) localStorage.setItem('spiderHighscore', score);
    
    // Pantalla ÉPICA final
    const endScreen = document.createElement('div');
    endScreen.className = 'end-screen';
    endScreen.style.cssText = `
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(118,75,162,0.98), rgba(102,126,234,0.98));
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    color: white; text-align: center; padding: 40px; border-radius: 20px;
    animation: celebrate 1s ease-out;
    font-size: 1.3em; line-height: 1.6; max-width: 700px; margin: 0 auto;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    overflow-y: auto;
`;
    
    endScreen.innerHTML = `
    <h2 style="font-size: 3.2em; margin-bottom: 25px;">${getEndMessage(score)}</h2>
    <div class="score" style="font-size: 3.5em; margin: 30px 0; color: #FFD700; text-shadow: 3px 3px 6px rgba(0,0,0,0.7);">
        ${score} PUNTOS 🏆<br>
        ${newHighscore ? '<span style="font-size: 0.6em; color: #FF6B6B;">¡NUEVO RÉCORD MUNDIAL! 🔥</span>' : ''}
    </div>
    <div style="font-size: 1.8em; margin-bottom: 35px; color: #FFD700;">Nivel ${level} ⭐⭐⭐</div>
    <div id="achievements" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin: 30px 0;"></div>
    <div class="quote" style="font-size: 1.6em; font-style: italic; padding: 30px; border-radius: 25px; background: rgba(255,255,255,0.25); max-width: 650px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        "${getPersonalQuote(score)}"
    </div>
`;

    
    gameArea.appendChild(endScreen);
    
    // Generar logros dinámicos
    setTimeout(() => generateAchievements(score, level, newHighscore), 1500);
    
    pauseBtn.disabled = true;
    restartBtn.style.display = 'inline-block';
}

function getEndMessage(score) {
    if (score >= 500) {
        return "¡INCREÍBLE LAURA! 🏆 Eres la campeona absoluta del Club de Cazadores de Arañas. ¡Las arañas huyen con solo escuchar tu nombre!";
    } else if (score >= 300) {
        return "¡Excelente trabajo! 🌟 Eres una verdadera experta cazadora. ¡Las arañas no tienen oportunidad contra ti!";
    } else if (score >= 150) {
        return "¡Muy bien! 👏 Has demostrado grandes habilidades. ¡Sigue practicando y serás imparable!";
    } else {
        return "¡Buen intento! 💪 Cada gran cazadora empieza así. ¡Inténtalo de nuevo y muéstrales quién manda!";
    }
}

function resetGame() {
    // Limpiar el área de juego
    gameArea.innerHTML = '';
    gameArea.appendChild(startScreen);
    startScreen.style.display = 'flex';
    
    // Resetear variables
    score = 0;
    timeLeft = 30;
    level = 1;
    isPlaying = false;
    isPaused = false;
    
    // Actualizar interfaz
    updateStats();
    pauseBtn.textContent = 'Pausar';
    pauseBtn.disabled = true;
    restartBtn.style.display = 'none';
    gameMessage.textContent = '';
}
function generateAchievements(score, level, newHighscore) {
    const achievementsDiv = document.getElementById('achievements');
    const achievements = [];
    
    // Logros dinámicos
    if (score >= 500) achievements.push('🥇 MAESTRA DE ARAÑAS');
    if (score >= 300) achievements.push('🕷️ EXPERta CAZADORA');
    if (score >= 150) achievements.push('⭐ NIVEL PRO');
    if (level >= 3) achievements.push('⚡ SUPERVELCIZ');
    if (newHighscore) achievements.push('🔥 RÉCORD MUNDIAL');
    if (score % 77 === 0) achievements.push('🎂 CUMPLEAÑOS ÉPICO'); // Suerte especial
    
    achievements.forEach((text, i) => {
        const badge = document.createElement('div');
        badge.style.cssText = `
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #333; padding: 15px 25px; border-radius: 30px;
            font-weight: bold; font-size: 1.1em; box-shadow: 0 8px 25px rgba(255,215,0,0.4);
            animation: badgePop 0.6s ease-out ${i * 0.2}s both;
            border: 3px solid rgba(255,255,255,0.3);
        `;
        badge.textContent = text;
        achievementsDiv.appendChild(badge);
    });
}

function getPersonalQuote(score) {
    const quotes = {
        500: "¡Laura, ese día matamos la araña JUNTOS por videollamada! ¡ERES IMPARABLE! 🕷️💕",
        300: "Recuerdas cuando celebramos como 'pareja de cazadores'? ¡AÚN LO HACEMOS! 🎉",
        150: "23/6/25 - La araña más épica. Tú con trapeador, yo gritando. LEGENDARIA 🏠",
        default: "Ese recuerdo de la araña nos UNIRÁ SIEMPRE. ¡Cazadores forever! 💑🕷️"
    };
    return quotes[score] || quotes.default;
}

function getEndMessage(score) {
    if (score >= 500) return "¡LA MEJOR CAZADORA DEL MUNDO! 🌍";
    if (score >= 300) return "¡Cazadora LEGENDARIA! 🏆";
    if (score >= 150) return "¡Imparable! 🔥";
    return "¡Gran cazadora! ⭐";
}
