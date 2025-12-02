

/* =======================================================
   CONGELADOS — 4 imágenes + combos + tabla + WhatsApp
======================================================= */

const modalCong = document.getElementById("modalCong");
const abrirCong = document.getElementById("btnCong");
const cerrarCong = document.getElementById("cerrarCong");

const congImg = document.getElementById("congImg");
const congPrev = document.getElementById("congPrev");
const congNext = document.getElementById("congNext");

const tablaCongBody = document.querySelector("#tablaCongelados tbody");
const totalCong = document.getElementById("totalCong");
const alertaCong = document.getElementById("alertaCong");
const enviarCong = document.getElementById("enviarCong");

const hojasCong = [
  "./img/carta-congelados/1.png",
  "./img/carta-congelados/6.jpg",
  "./img/carta-congelados/7.jpg",
  "./img/carta-congelados/8.jpg",
];

let congIndex = 0;

/* ------------ COMBOS ------------ */
const combosCongelados = {
  5: { precio: 8000, min: 5, max: 9 },
  10: { precio: 7500, min: 10, max: 14 },
  15: { precio: 7000, min: 15, max: 50 }
};

let comboCongActual = 5;

/* ------------ LISTA DE VIANDAS ------------ */
const viandasCong = [
  "Tarta de acelga, cebolla, huevo y queso",
  "Tarta de berenjenas asadas, champiñones y queso",
  "Tarta de brócoli, huevo y queso",
  "Estofado de lentejas campesino",
  "Guiso criollo de porotos aduki",
  "Guiso de garbanzos mediterráneo",
  "Napolitana gourmet pizzeta",
  "Vegetariana mediterránea pizzeta",
  "Tacos integrales de verduras al wok",
  "Crema de calabaza",
  "Pollo campestre con arroz yamani y vegetales asados",
  "Cuadril a las hierbas con arroz yamani y vegetales rústicos",
  "Rolls de pollo, acelga y queso (masa integral)",
  "Chop suey",
  "Tacos de carne y vegetales"
];

/* ------------ Generar tabla ------------ */
function generarTablaCong() {
  tablaCongBody.innerHTML = "";
  viandasCong.forEach(v => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${v}</td>
      <td><input type="number" min="0" max="50" value="0" data-vianda="${v}"></td>
    `;
    tablaCongBody.appendChild(fila);
  });
}
generarTablaCong();

/* ------------ Abrir modal ------------ */
abrirCong?.addEventListener("click", () => {
  congIndex = 0;
  congImg.src = hojasCong[0];
  modalCong.classList.add("activo");
});

/* ------------ Cerrar modal ------------ */
cerrarCong?.addEventListener("click", () => modalCong.classList.remove("activo"));
modalCong?.addEventListener("click", e => {
  if (e.target === modalCong) modalCong.classList.remove("activo");
});

/* ------------ Flechas ------------ */
congNext?.addEventListener("click", () => {
  congIndex = (congIndex + 1) % hojasCong.length;
  congImg.src = hojasCong[congIndex];
});

congPrev?.addEventListener("click", () => {
  congIndex = (congIndex - 1 + hojasCong.length) % hojasCong.length;
  congImg.src = hojasCong[congIndex];
});

/* ------------ Cambiar combo ------------ */
document.querySelectorAll(".cong-combo").forEach(btn => {
  btn.addEventListener("click", () => {
    comboCongActual = parseInt(btn.dataset.cong);
    totalCong.textContent = "Seleccioná tus viandas 👇";
    alertaCong.textContent = "";
    tablaCongBody.querySelectorAll("input").forEach(inp => inp.value = 0);
  });
});

/* ------------ Calcular total ------------ */
tablaCongBody.addEventListener("input", () => calcularTotalCong());

function calcularTotalCong() {
  const datos = [...tablaCongBody.querySelectorAll("input")]
    .map(inp => ({ nombre: inp.dataset.vianda, cantidad: parseInt(inp.value) || 0 }))
    .filter(x => x.cantidad > 0);

  const totalViandas = datos.reduce((a, x) => a + x.cantidad, 0);
  const precioUnit = combosCongelados[comboCongActual].precio;
  const total = totalViandas * precioUnit;

  const { min, max } = combosCongelados[comboCongActual];

  if (totalViandas < min) {
    alertaCong.textContent = `⚠️ Debés elegir al menos ${min} viandas.`;
  } else if (totalViandas > max) {
    alertaCong.textContent = `⚠️ Máximo permitido: ${max} viandas.`;
  } else {
    alertaCong.textContent = "";
  }

  totalCong.textContent = `Viandas: ${totalViandas} — Total: $${total.toLocaleString("es-AR")}`;

  return { datos, total, totalViandas };
}

/* ------------ Enviar a WhatsApp ------------ */
enviarCong.addEventListener("click", () => {
  const { datos, total, totalViandas } = calcularTotalCong();
  const { min, max } = combosCongelados[comboCongActual];

  if (totalViandas < min || totalViandas > max) {
    alertaCong.textContent = "⚠️ Revisá las cantidades antes de enviar.";
    return;
  }

  const resumen = datos.map(d => `• ${d.nombre}: ${d.cantidad}`).join("\n");

  const mensaje = encodeURIComponent(
    `🍱 Pedido Congelados\n\nCombo: ${comboCongActual} viandas\n${resumen}\n\nTotal: $${total.toLocaleString("es-AR")}`
  );

  window.open(`https://wa.me/5492996060776?text=${mensaje}`, "_blank");
});
