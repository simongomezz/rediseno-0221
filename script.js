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

// ================== FILTROS ==================

const filtroOpciones = document.querySelectorAll('.filtro-opcion');

filtroOpciones.forEach(opcion => {
  opcion.addEventListener('click', () => {
    filtroOpciones.forEach(o => o.classList.remove('selected'));
    opcion.classList.add('selected');
  });
});

// ================== CHECK ==================

const checkConfirm = document.getElementById('checkConfirm');
const filtrosContainer = document.querySelector('.agenda-filtros');
const planesContainer = document.querySelector('.agenda-plan-vista');

checkConfirm.addEventListener('click', () => {
  const selectedDay = document.querySelector('.day.selected');
  const selectedFiltro = document.querySelector('.filtro-opcion.selected');

  if (selectedDay && selectedFiltro) {
    filtrosContainer.style.display = 'none';
    checkConfirm.style.display = 'none';

    // Mostrar el contenedor de planes
    planesContainer.style.display = 'grid';

    // Vaciar por si ya había algo
    planesContainer.innerHTML = '';

    const planes = [
      { titulo: 'CINE', imagen: 'img/Calendario/plancine.png' },
      { titulo: 'MUESTRAS', imagen: 'img/Calendario/planmuestras.png' },
      { titulo: 'RECITALES', imagen: 'img/Calendario/planrecitales.png' },
      { titulo: 'COMIDA', imagen: 'img/Calendario/plancomida.png' }
    ];

    planes.forEach(plan => {
      const contenedor = document.createElement('div');
      contenedor.className = 'plan-card';

      const titulo = document.createElement('div');
      titulo.className = 'plan-titulo';
      titulo.textContent = plan.titulo;

      const imagen = document.createElement('img');
      imagen.src = plan.imagen;
      imagen.alt = plan.titulo;

      contenedor.appendChild(titulo);
      contenedor.appendChild(imagen);
      planesContainer.appendChild(contenedor);
    });
  } else {
    alert('Seleccioná un día y una opción antes de continuar.');
  }
});


// ================== PLANES ==================

document.addEventListener('click', (e) => {
  const planCard = e.target.closest('.plan-card');

  if (planCard) {
    // Marcar como seleccionado
    document.querySelectorAll('.plan-card').forEach(p => p.classList.remove('selected'));
    planCard.classList.add('selected');

    // Esperar para mostrar la selección
    setTimeout(() => {
      document.querySelectorAll('.plan-card').forEach(p => p.style.display = 'none');

      // Mostrar sección de noticias
      const noticiasContainer = document.createElement('div');
      noticiasContainer.className = 'agenda-noticias';

      const noticias = [
        {
          titulo: 'Feria del Vino de la Costa',
          descripcion: 'Se celebrará en el Gimnasio Municipal (9 y 169) con entrada libre y gratuita.',
          imagen: 'Img/Calendario/noticiacalendario1.png'
        },
        {
          titulo: 'Festival Ribera Música',
          descripcion: 'Evento que combina música en vivo, gastronomía y compromiso social en un entorno natural a la vera del río.',
          imagen: 'Img/Calendario/noticiacalendario2.png'
        }
      ];

      noticias.forEach(noticia => {
        const card = document.createElement('div');
        card.className = 'noticia-card';

        const texto = document.createElement('div');
        texto.className = 'noticia-texto';

        const h3 = document.createElement('h3');
        h3.textContent = noticia.titulo;

        const p = document.createElement('p');
        p.textContent = noticia.descripcion;

        const img = document.createElement('img');
        img.src = noticia.imagen;
        img.alt = noticia.titulo;

        texto.appendChild(h3);
        texto.appendChild(p);
        card.appendChild(texto);
        card.appendChild(img);
        noticiasContainer.appendChild(card);
      });

      document.querySelector('.agenda-contenedor').appendChild(noticiasContainer);
    }, 400);
  }
});


// ================== DESPLEGABLE DERECHO ==================
  document.addEventListener("DOMContentLoaded", () => {
    const toggleDesplegable = document.getElementById('toggle-desplegable');
    const menuExtendido = document.getElementById('menuExtendido');
    const menuDesplegableFijo = document.getElementById('menuDesplegableFijo');
    const cerrarDesplegable = document.getElementById('cerrarDesplegable');

    toggleDesplegable.addEventListener('click', () => {
      // Ocultar el menú fijo completo
      menuDesplegableFijo.style.display = 'none';
      // Mostrar el menú extendido
      menuExtendido.style.display = 'block';
    });

    cerrarDesplegable.addEventListener('click', () => {
      // Ocultar el menú extendido
      menuExtendido.style.display = 'none';
      // Volver a mostrar el menú fijo
      menuDesplegableFijo.style.display = 'block';
    });
  });

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

// ========== Botón "No me interesa" salta a la siguiente slide ==========
document.querySelectorAll('.btn-interes').forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent.includes('No me interesa')) {
      pauseAutoplay(); // Pausa autoplay para evitar conflicto
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
      resumeAutoplay();
    }
  });
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

// ================== CÓDIGO PARA LA PÁGINA DE NOTICIAS ==================
document.addEventListener('DOMContentLoaded', () => {
  const unlpArticle = document.querySelector('.noticia-destacada h2');
  if (unlpArticle && unlpArticle.textContent.includes('La UNLP fue reconocida')) {
    unlpArticle.parentElement.addEventListener('click', () => {
      window.location.href = 'nota-unlp.html';
    });
    // Opcional: cambiar el cursor a pointer
    unlpArticle.parentElement.style.cursor = 'pointer';
  }
});