// ================== MENÚ LATERAL ==================

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sideMenu = document.getElementById('side-menu');

// Abrir menú
menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('active');
  document.body.classList.add('menu-open');
  menuToggle.classList.add('oculto');
});

// Cerrar menú
menuClose.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  document.body.classList.remove('menu-open');
  menuToggle.classList.remove('oculto');
});

document.querySelectorAll('.menu-link:not(.toggle-submenu), .submenu-link').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuToggle.classList.remove('oculto');
  });
});

// Toggle de submenús
document.querySelectorAll('.toggle-submenu').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = toggle.getAttribute('data-target');
    const submenu = document.getElementById(targetId);
    submenu.classList.toggle('show');
    toggle.classList.toggle('active');
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
}

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

  if (bajadaTexto) {
    bajadaTexto.textContent = bajadas[currentIndex];
  }
}

// Inicialización
updateCarousel();

// Autoplay del carrusel cada 5 segundos
let autoplayInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 5000);

// Pausar autoplay mientras se arrastra
function pauseAutoplay() {
  clearInterval(autoplayInterval);
}

function resumeAutoplay() {
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 5000);
}

// Eventos de arrastre para mouse
carouselInner.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  pauseAutoplay();
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
    resumeAutoplay();
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
  pauseAutoplay();
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
    resumeAutoplay();
  }
});

carouselInner.addEventListener('touchmove', (e) => {
  if (isDragging) {
    const moved = e.touches[0].clientX - startX;
    carouselInner.style.transform = `translateX(${-currentIndex * carouselInner.clientWidth + moved}px)`;
  }
});

// ================== MODAL DE REGIÓN ==================
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('regionModal');
  const botones = document.querySelectorAll('.region-btn');
  const regionDisplay = document.querySelector('.region-display');

  const regionesLegibles = {
    'la-plata': 'La Plata'
  };

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.dataset.region;

      // Solo actúa si se eligió "la-plata"
      if (region === 'la-plata') {
        modal.style.display = 'none';
        regionDisplay.textContent = `Tu región: ${regionesLegibles[region]}`;
        regionDisplay.style.display = 'flex';
      }
    });
  });

  // Al hacer clic en "Tu región: La Plata", vuelve a mostrar el modal
  regionDisplay.addEventListener('click', () => {
    modal.style.display = 'flex';
    regionDisplay.style.display = 'none';
  });
});
