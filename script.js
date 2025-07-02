// ================== MENÚ LATERAL ==================

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('active');
  document.body.classList.add('menu-open');
});

menuClose.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  document.body.classList.remove('menu-open');
});

document.querySelectorAll('.menu-link, .submenu-link').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// ================== CALENDARIO ==================

const calendar = document.getElementById('calendar');
const headers = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'];

headers.forEach(day => {
  const header = document.createElement('div');
  header.className = 'day-header';
  header.textContent = day;
  calendar.appendChild(header);
});

const totalDays = 30;
const startDayOffset = 6;

for (let i = 0; i < startDayOffset; i++) {
  const empty = document.createElement('div');
  calendar.appendChild(empty);
}

for (let i = 1; i <= totalDays; i++) {
  const day = document.createElement('div');
  day.className = 'day';
  day.textContent = i;

  day.addEventListener('click', () => {
    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    day.classList.add('selected');
  });

  calendar.appendChild(day);
};

// ================== CARRUSEL CON BAJADA ==================

const carouselInner = document.querySelector('.carousel-inner');
const slides = document.querySelectorAll('.slide');
const bajadaTexto = document.querySelector('.bajada-texto');

let currentIndex = 0;
const totalSlides = slides.length;
let startX = 0;
let isDragging = false;

const bajadas = [
  'Estado de alerta, se sumarán a un paro nacional universitario de 48 horas la próxima semana.',
  'Temperatura de 3°C a 10°C, con viento muy fuerte y ráfagas durante gran parte del día.',
  'El streaming platense arrancó su segunda temporada.',
  'En honor a Dante, que los une hace años.',
  'Será el primer arquero nacionalizado uruguayo en atajar en Estudiantes.'
];

// Función para mover el carrusel y actualizar bajada
function updateCarousel() {
  const width = carouselInner.clientWidth;
  carouselInner.style.transform = `translateX(-${currentIndex * width}px)`;
  bajadaTexto.textContent = bajadas[currentIndex];
}

// Inicialización
updateCarousel();


// Eventos de arrastre para mouse
carouselInner.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener('mouseup', (e) => {
  if (isDragging) {
    isDragging = false;
    const movedBy = startX - e.clientX;
    const threshold = 50;

    if (movedBy > threshold && currentIndex < totalSlides - 1) {
      currentIndex++;
    } else if (movedBy < -threshold && currentIndex > 0) {
      currentIndex--;
    }

    updateCarousel();
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const moved = e.clientX - startX;
    carouselInner.style.transform = `translateX(${-currentIndex * carouselInner.clientWidth + moved}px)`;
  }
});


// Eventos de arrastre para touch
carouselInner.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carouselInner.addEventListener('touchend', (e) => {
  if (isDragging) {
    isDragging = false;
    const movedBy = startX - e.changedTouches[0].clientX;
    const threshold = 50;

    if (movedBy > threshold && currentIndex < totalSlides - 1) {
      currentIndex++;
    } else if (movedBy < -threshold && currentIndex > 0) {
      currentIndex--;
    }

    updateCarousel();
  }
});

carouselInner.addEventListener('touchmove', (e) => {
  if (isDragging) {
    const moved = e.touches[0].clientX - startX;
    carouselInner.style.transform = `translateX(${-currentIndex * carouselInner.clientWidth + moved}px)`;
  }
});