/* ======================================================= */
/* ======== CARRUSEL DE TESTIMONIOS AUTOMÁTICO ============ */
/* ======================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grupos = document.querySelectorAll(".grupo-testimonios");
  const indicadores = document.getElementById("indicadoresTestimonios");
  let indice = 0;

  // Crear las bolitas (una por grupo)
  grupos.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => mostrarGrupo(i));
    indicadores.appendChild(dot);
  });

  const dots = indicadores.querySelectorAll("span");

  // Función para mostrar el grupo actual
  function mostrarGrupo(i) {
    grupos.forEach(g => g.classList.remove("activo"));
    dots.forEach(d => d.classList.remove("activo"));
    grupos[i].classList.add("activo");
    dots[i].classList.add("activo");
    indice = i;
  }

  // Cambio automático cada 6 segundos
  setInterval(() => {
    indice = (indice + 1) % grupos.length;
    mostrarGrupo(indice);
  }, 6000);

  // Mostrar el primero al cargar
  mostrarGrupo(0);
});
