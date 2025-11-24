// Blog - Manejo de apertura de artículos
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalBlog");
  const cerrar = document.getElementById("cerrarModal");
  const texto = document.getElementById("textoBlog");

  const articulos = {
    1: `
      <h2>🍞 El pan integral no siempre es integral</h2>
      <p>¿Sabías que muchos panes “integrales” solo tienen color marrón porque les agregan melaza o caramelo? 
      El verdadero pan integral se elabora con harina de grano entero, manteniendo su fibra y nutrientes.</p>
      <p>💡 Consejo Prana: leé las etiquetas. Si el primer ingrediente no dice “harina integral”, probablemente no lo sea.</p>
    `,
    2: `
      <h2>🥕 Cuando una receta sale mal (y por qué eso está bien)</h2>
      <p>Si alguna vez salaste de más o tu tarta se desarmó al cortarla, ¡bienvenida al club! 
      La cocina real no es de revista, es un laboratorio de prueba y error con aroma a vida cotidiana.</p>
      <p>🌿 En Prana creemos que cocinar también es soltar el control y disfrutar del proceso, incluso cuando no sale perfecto.</p>
    `,
    3: `
      <h2>🌿 La cocina como meditación</h2>
      <p>Hay algo profundamente terapéutico en cortar verduras despacio, escuchar el sonido del hervor y 
      sentir los aromas. Cocinar nos invita al presente, a conectar con el cuerpo y a nutrirnos con atención.</p>
      <p>🪷 La próxima vez que cocines, apagá el celular y observá cómo se transforma lo simple en algo pleno.</p>
    `
  };

  document.querySelectorAll(".blog-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-articulo");
      texto.innerHTML = articulos[id];
      modal.style.display = "flex";
    });
  });

  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});
