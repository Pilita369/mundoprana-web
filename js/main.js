// main.js — Mundo Prana 🌱
// ----------------------------------------------------
// Este archivo controla:
// - Carrusel de Pilar (modal)
// - Carrusel galería saludable
// - Scroll suave de enlaces internos
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CARRUSEL DE PILAR
  ======================================================= */
  const modalPilar = document.getElementById("modalPilar");
  const abrirPilar = document.getElementById("abrirCarruselPilar");
  const cerrarPilar = document.getElementById("cerrarPilar");
  const tarjetasPilar = document.querySelectorAll(".tarjeta-pilar");
  const anteriorPilar = document.getElementById("anteriorPilar");
  const siguientePilar = document.getElementById("siguientePilar");
  let indicePilar = 0;

  function mostrarPilar(i) {
    tarjetasPilar.forEach(t => t.classList.remove("activa"));
    tarjetasPilar[i].classList.add("activa");
  }

  if (abrirPilar) {
    abrirPilar.addEventListener("click", () => {
      modalPilar.style.display = "flex";
      mostrarPilar(indicePilar);
    });
  }

  if (cerrarPilar) {
    cerrarPilar.addEventListener("click", () => {
      modalPilar.style.display = "none";
    });
  }

  if (anteriorPilar && siguientePilar) {
    anteriorPilar.addEventListener("click", () => {
      indicePilar = (indicePilar - 1 + tarjetasPilar.length) % tarjetasPilar.length;
      mostrarPilar(indicePilar);
    });

    siguientePilar.addEventListener("click", () => {
      indicePilar = (indicePilar + 1) % tarjetasPilar.length;
      mostrarPilar(indicePilar);
    });
  }

  if (modalPilar) {
    modalPilar.addEventListener("click", e => {
      if (e.target === modalPilar) modalPilar.style.display = "none";
    });
  }

  /* =======================================================
     GALERÍA SALUDABLE
  ======================================================= */
  const galeria = document.getElementById("galeria-saludables");
  if (galeria) {
    const slides = galeria.querySelectorAll(".slide");
    const prev = galeria.querySelector(".flecha-izq");
    const next = galeria.querySelector(".flecha-der");
    const indicadores = document.getElementById("indicadores-saludables");

    let indice = 0;
    let dots = [];

    function crearIndicadores() {
      indicadores.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => mostrarSlide(i));
        indicadores.appendChild(dot);
      });
      dots = indicadores.querySelectorAll("span");
    }

    function mostrarSlide(i) {
      slides.forEach(s => s.classList.remove("activo"));
      dots.forEach(d => d.classList.remove("activo"));
      slides[i].classList.add("activo");
      dots[i].classList.add("activo");
      indice = i;
    }

    function siguienteSlide() {
      indice = (indice + 1) % slides.length;
      mostrarSlide(indice);
    }

    function anteriorSlide() {
      indice = (indice - 1 + slides.length) % slides.length;
      mostrarSlide(indice);
    }

    if (prev && next) {
      prev.addEventListener("click", anteriorSlide);
      next.addEventListener("click", siguienteSlide);
    }

    crearIndicadores();
    mostrarSlide(0);

    // Auto avance
    setInterval(siguienteSlide, 4000);
  }

  /* =======================================================
     SCROLL SUAVE EN ENLACES INTERNOS
  ======================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(ancla => {
    ancla.addEventListener("click", e => {
      e.preventDefault();
      const destino = document.querySelector(ancla.getAttribute("href"));
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});





// ----- CARTA FIJA (2 páginas) -----
const modalCarta = document.getElementById("modalCarta");
const imgCartaAmpliada = document.getElementById("imgCartaAmpliada");
const verCartaZoom = document.getElementById("verCartaZoom");
const cerrarCarta = document.getElementById("cerrarCarta");
const cartaAnterior = document.getElementById("cartaAnterior");
const cartaSiguiente = document.getElementById("cartaSiguiente");

let paginaActual = 1;
const paginasCarta = [
  "./img/carta.fija/hoja1.png",
  "./img/carta.fija/hoja2.png"
];

// Abrir modal
verCartaZoom.addEventListener("click", () => {
  paginaActual = 1;
  imgCartaAmpliada.src = paginasCarta[paginaActual - 1];
  modalCarta.style.display = "flex";
});

// Cerrar modal
cerrarCarta.addEventListener("click", () => {
  modalCarta.style.display = "none";
});

// Flecha siguiente
cartaSiguiente.addEventListener("click", () => {
  paginaActual = paginaActual === 2 ? 1 : 2;
  imgCartaAmpliada.src = paginasCarta[paginaActual - 1];
});

// Flecha anterior
cartaAnterior.addEventListener("click", () => {
  paginaActual = paginaActual === 1 ? 2 : 1;
  imgCartaAmpliada.src = paginasCarta[paginaActual - 1];
});

// Cerrar haciendo clic afuera
modalCarta.addEventListener("click", (e) => {
  if (e.target === modalCarta) {
    modalCarta.style.display = "none";
  }
});



// ===== MENÚ DIARIO (CARRUSEL de 2 páginas) =====
const modalMenu = document.getElementById("modalMenu");
const verMenuZoom = document.getElementById("verMenuZoom");
const cerrarMenu = document.getElementById("cerrarMenu");
const menuAnterior = document.getElementById("menuAnterior");
const menuSiguiente = document.getElementById("menuSiguiente");
const imgMenuAmpliado = document.getElementById("imgMenuAmpliado");

let paginaMenuActual = 1;

// Lista de imágenes del menú diario
const paginasMenu = [
  "./img/menu.diario/menu17.11.25.png",
  
];

// Abrir modal
verMenuZoom.addEventListener("click", () => {
  paginaMenuActual = 1;
  imgMenuAmpliado.src = paginasMenu[paginaMenuActual - 1];
  modalMenu.style.display = "flex";
});

// Cerrar modal
cerrarMenu.addEventListener("click", () => {
  modalMenu.style.display = "none";
});

// Flecha siguiente
menuSiguiente.addEventListener("click", () => {
  paginaMenuActual = paginaMenuActual === paginasMenu.length ? 1 : paginaMenuActual + 1;
  imgMenuAmpliado.src = paginasMenu[paginaMenuActual - 1];
});

// Flecha anterior
menuAnterior.addEventListener("click", () => {
  paginaMenuActual = paginaMenuActual === 1 ? paginasMenu.length : paginaMenuActual - 1;
  imgMenuAmpliado.src = paginasMenu[paginaMenuActual - 1];
});

// Cerrar al hacer clic fuera
modalMenu.addEventListener("click", (e) => {
  if (e.target === modalMenu) {
    modalMenu.style.display = "none";
  }
});
