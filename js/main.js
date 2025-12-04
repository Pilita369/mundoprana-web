// main.js — Mundo Prana 🌱
// -------------------------------------------------------------

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

  if (abrirPilar) abrirPilar.addEventListener("click", () => {
    modalPilar.style.display = "flex";
    mostrarPilar(indicePilar);
  });

  if (cerrarPilar) cerrarPilar.addEventListener("click", () => modalPilar.style.display = "none");

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
    setInterval(siguienteSlide, 4000); // auto-carrusel
  }



  /* =======================================================
      SCROLL SUAVE
  ======================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(ancla => {
    ancla.addEventListener("click", e => {
      e.preventDefault();
      const destino = document.querySelector(ancla.getAttribute("href"));
      if (destino) destino.scrollIntoView({ behavior: "smooth" });
    });
  });



  /* =======================================================
      MODAL — CARTA FIJA (2 páginas)
  ======================================================= */
  const modalCarta = document.getElementById("modalCarta");
  const imgCarta = document.getElementById("imgCartaAmpliada");
  const abrirCarta = document.getElementById("verCartaZoom");
  const cerrarCarta = document.getElementById("cerrarCarta");
  const cartaAnt = document.getElementById("cartaAnterior");
  const cartaSig = document.getElementById("cartaSiguiente");

  const paginasCarta = [
    "./img/carta.fija/hoja1.webp",
    "./img/carta.fija/hoja2.webp"
  ];
  let indexCarta = 0;

  if (abrirCarta) {
    abrirCarta.addEventListener("click", () => {
      indexCarta = 0;
      imgCarta.src = paginasCarta[indexCarta];
      modalCarta.style.display = "flex";
    });
  }

  if (cerrarCarta) cerrarCarta.addEventListener("click", () => modalCarta.style.display = "none");

  if (cartaSig) cartaSig.addEventListener("click", () => {
    indexCarta = (indexCarta + 1) % paginasCarta.length;
    imgCarta.src = paginasCarta[indexCarta];
  });

  if (cartaAnt) cartaAnt.addEventListener("click", () => {
    indexCarta = (indexCarta - 1 + paginasCarta.length) % paginasCarta.length;
    imgCarta.src = paginasCarta[indexCarta];
  });

  if (modalCarta) modalCarta.addEventListener("click", e => {
    if (e.target === modalCarta) modalCarta.style.display = "none";
  });



  /* =======================================================
      MODAL — MENÚ DIARIO
  ======================================================= */
  const modalMenu = document.getElementById("modalMenu");
  const abrirMenu = document.getElementById("verMenuZoom");
  const cerrarMenu = document.getElementById("cerrarMenu");
  const menuAnt = document.getElementById("menuAnterior");
  const menuSig = document.getElementById("menuSiguiente");
  const imgMenu = document.getElementById("imgMenuAmpliado");

  const paginasMenu = ["./img/menu.diario/menu17.11.25.png"];
  let indexMenu = 0;

  if (abrirMenu) abrirMenu.addEventListener("click", () => {
    indexMenu = 0;
    imgMenu.src = paginasMenu[indexMenu];
    modalMenu.style.display = "flex";
  });

  if (cerrarMenu) cerrarMenu.addEventListener("click", () => modalMenu.style.display = "none");

  if (menuSig) menuSig.addEventListener("click", () => {
    indexMenu = (indexMenu + 1) % paginasMenu.length;
    imgMenu.src = paginasMenu[indexMenu];
  });

  if (menuAnt) menuAnt.addEventListener("click", () => {
    indexMenu = (indexMenu - 1 + paginasMenu.length) % paginasMenu.length;
    imgMenu.src = paginasMenu[indexMenu];
  });

  if (modalMenu) {
    modalMenu.addEventListener("click", e => {
      if (e.target === modalMenu) modalMenu.style.display = "none";
    });
  }



  /* =======================================================
      FOOTER — Hamburguesa Index
  ======================================================= */
  const hamburguer = document.getElementById("hamburgerMenu");
  const menuFooter = document.getElementById("footerMenu");

  if (hamburguer) {
    hamburguer.addEventListener("click", () => {
      menuFooter.style.display = menuFooter.style.display === "block" ? "none" : "block";
    });
  }

});
