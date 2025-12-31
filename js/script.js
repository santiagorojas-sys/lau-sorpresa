// MÚSICA AUTOPLAY FIJA
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    // INTENTAR AUTOPLAY
    audio.volume = 0.3; // BAJO para navegadores
    audio.play().then(() => {
        musicBtn.textContent = '🔇';
    }).catch(() => {
        // SI BLOQUEA → Esperar primer click
        document.addEventListener('click', function firstClick() {
            audio.play().then(() => {
                musicBtn.textContent = '🔇';
                document.removeEventListener('click', firstClick);
            }).catch(() => {});
        }, { once: true });
    });
});

// Variables globales
let musicPlaying = false;
const bgMusic = document.getElementById('bgMusic');

function startExperience() {
    // Ocultar pantalla de bienvenida
    document.getElementById('welcomeScreen').style.display = 'none';
    
    // Mostrar contenido principal
    document.getElementById('mainContent').style.display = 'block';
    
    // Mostrar navegación
    document.getElementById('mainNav').style.display = 'flex'; // O 'block'
    
    // Mostrar hamburguesa
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.style.display = 'block';
    }
}



// Control de música
function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
    } else {
        bgMusic.play();
        musicBtn.textContent = '🎵';
    }
    musicPlaying = !musicPlaying;
}

// Crear pétalos cayendo
function createPetals() {
    const container = document.getElementById('petalsContainer');
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * window.innerWidth + 'px';
        petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
        petal.style.opacity = Math.random() * 0.5 + 0.5;
        
        container.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 8000);
    }, 300);
}

function openBook() {
    const book = document.querySelector('.book');
    book.classList.toggle('open');
    
    if (book.classList.contains('open')) {
        document.getElementById('bookPages').innerHTML = `
            <div class="book-open-content">
                <div class="page-left">
                    <h3>📚 Capítulo 26</h3>
                    <p><strong>Tu amor por los libros</strong><br>
                    Tu sensibilidad<br>
                    Tu nobleza<br><br>
                    <em>T U E R E S &nbsp; Ú N I C A</em></p>
                </div>
                <div class="page-right">
                    <h3>✨ Tu futuro</h3>
                    <p>Este año lleno de<br>
                    páginas en blanco<br>
                    esperando <strong>tus sueños</strong></p>
                    <p style="background: var(--rosa-pastel); padding: 1.2rem; border-radius: 15px; font-weight: 700; font-size: 1.2rem;">
                        Tu Santiago favorito<br>
                        SIEMPRE aquí para<br>
                        leerlos contigo 📚💕
                    </p>
                </div>
            </div>
        `;
    }
}



// Mostrar mensajes emergentes
function showMessage(text) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.innerHTML = `
        <h3 style="color: var(--vino-tinto); margin-bottom: 1rem;">✨ Mensaje especial ✨</h3>
        <p style="color: var(--azul-oscuro);">${text}</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--rosa-pastel);
            border: none;
            border-radius: 20px;
            color: var(--vino-tinto);
            cursor: pointer;
        ">Cerrar 💕</button>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 5000);
}

// Cargar al final
document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Easter egg Konami
    let konamiCode = [];
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (JSON.stringify(konamiCode) === JSON.stringify(secretCode)) {
            showMessage('🎮 ¡Código secreto activado! Laura, eres la mejor jugadora de la vida 🏆');
        }
    });
});
// ========== LIBRO INTERACTIVO ==========
const bookPages = [
    {
        left: `<h3>Capítulo 1</h3>
               <p>Laura Lizeth, una mujer que llegó al mundo hace 26 años para llenarlo de luz, amor y magia.</p>
               <p>Desde pequeña, los libros fueron sus mejores amigos, y con cada página leída, su alma se hacía más hermosa.</p>
               <p>Soñadora incansable, siempre ha creído que el mundo puede ser un lugar mejor, y trabaja cada día para demostrarlo.</p>`,
        right: `<h3>Tu esencia</h3>
                <p>Tienes esa rara habilidad de hacer sentir especial a quien está contigo. Tu sonrisa ilumina hasta los días más grises.</p>
                <p>Eres generosa con tu tiempo, tu amor y tu energía. Das sin esperar nada a cambio.</p>
                <p>Tu pasión por la lectura te ha convertido en una persona sabia, empática y profunda.</p>`
    },
    {
        left: `<h3>Capítulo 2</h3>
               <p>Futura profesora de inglés, porque sabes que la educación cambia vidas y quieres ser parte de ese cambio.</p>
               <p>Te apasiona aprender idiomas, conocer culturas y entender cómo piensa el mundo.</p>
               <p>No solo quieres enseñar gramática, quieres inspirar, motivar y dejar huella en cada estudiante.</p>`,
        right: `<h3>Tus sueños</h3>
                <p>Viajar por el mundo, conocer cada rincón, cada historia, cada persona que cruce tu camino.</p>
                <p>Vivir cerca de tus seres queridos, construir recuerdos hermosos y nunca olvidar de dónde vienes.</p>
                <p>Ser feliz, simplemente feliz, rodeada de amor, libros y momentos inolvidables.</p>`
    },
    {
        left: `<h3>Capítulo 3</h3>
               <p>Eres de esas personas que aman con todo el corazón. Das todo por quienes amas.</p>
               <p>Tu familia y amigos saben que siempre pueden contar contigo, en las buenas y en las malas.</p>
               <p>Tienes esa capacidad única de hacer sentir en casa a cualquiera que esté contigo.</p>`,
        right: `<h3>Lo que te hace única</h3>
                <p>Tu risa contagiosa que alegra cualquier momento.</p>
                <p>Tu forma de ver el mundo con optimismo y esperanza.</p>
                <p>Tu amor por las pequeñas cosas: un buen libro, una taza de café, una conversación profunda.</p>
                <p>Tu valentía para perseguir tus sueños sin importar los obstáculos.</p>`
    },
    {
        left: `<h3>Capítulo 4</h3>
               <p>26 años de una vida llena de amor, aprendizaje y crecimiento.</p>
               <p>Has superado desafíos, has celebrado victorias y has dejado huella en cada persona que ha tenido la fortuna de conocerte.</p>
               <p>Este es solo el comienzo de una historia aún más increíble.</p>`,
        right: `<h3>Feliz cumpleaños</h3>
                <p>Que este nuevo año esté lleno de:</p>
                <p>✨ Aventuras inolvidables</p>
                <p>📚 Libros que te hagan soñar</p>
                <p>💕 Amor en abundancia</p>
                <p>🌍 Viajes maravillosos</p>
                <p>🎓 Éxitos en tu carrera</p>
                <p><strong>Eres increíble, Laura. Nunca lo olvides.</strong></p>
                <p style="text-align: right; margin-top: 30px; font-style: italic;">- Con todo el cariño, Tu Santiago 🕷️💙</p>`
    }
];

let currentPageIndex = 0;

function openBookModal() {
    document.getElementById('bookModal').classList.add('active');
    currentPageIndex = 0;
    updatePages();
}

function closeBookModal() {
    document.getElementById('bookModal').classList.remove('active');
}

function updatePages() {
    const leftPage = document.querySelector('.left-page .page-content');
    const rightPage = document.querySelector('.right-page .page-content');
    const leftNumber = document.querySelector('.left-page .page-number');
    const rightNumber = document.querySelector('.right-page .page-number');
    
    const currentSpread = bookPages[currentPageIndex];
    
    leftPage.innerHTML = currentSpread.left;
    rightPage.innerHTML = currentSpread.right;
    
    leftNumber.textContent = (currentPageIndex * 2 + 1);
    rightNumber.textContent = (currentPageIndex * 2 + 2);
    
    // Actualizar botones
    document.querySelector('.prev-btn').disabled = currentPageIndex === 0;
    document.querySelector('.next-btn').disabled = currentPageIndex === bookPages.length - 1;
}

function nextPage() {
    if (currentPageIndex < bookPages.length - 1) {
        currentPageIndex++;
        updatePages();
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updatePages();
    }
}

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookModal();
    }
});
// ========== MENÚ HAMBURGUESA ==========
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// Cierra menú al clickear link
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mainNav').classList.remove('active');
    });
});
