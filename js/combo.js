

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
  "img/carta-congelados/1portadacongelados.webp",
  "./img/carta-congelados/2congelados.webp",
  "./img/carta-congelados/3congelados.webp",
  "./img/carta-congelados/4congelados.webp",
  "./img/carta-congelados/5congelados.webp",
];

let congIndex = 0;

/* ------------ COMBOS ------------ */
const combosCongelados = {
  5: { precio: 10000, min: 5, max: 9 },
  10: { precio: 9000, min: 10, max: 14 },
  15: { precio: 8000, min: 15, max: 50 }
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

/* ------------ Deshabilitar botón al inicio ------------ */
enviarCong.disabled = true;
enviarCong.style.opacity = "0.4";
enviarCong.style.cursor = "not-allowed";

/* ------------ Cambiar combo ------------ */
document.querySelectorAll(".cong-combo").forEach(btn => {
  btn.addEventListener("click", () => {
    comboCongActual = parseInt(btn.dataset.cong);
    document.querySelectorAll(".cong-combo").forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
    totalCong.textContent = "Seleccioná tus viandas 👇";
    alertaCong.textContent = "";
    tablaCongBody.querySelectorAll("input").forEach(inp => inp.value = 0);
    actualizarBoton(0);
  });
});

/* ------------ Habilitar/deshabilitar botón ------------ */
function actualizarBoton(totalViandas) {
  const { min, max } = combosCongelados[comboCongActual];
  const valido = totalViandas >= min && totalViandas <= max;
  enviarCong.disabled = !valido;
  enviarCong.style.opacity = valido ? "1" : "0.4";
  enviarCong.style.cursor = valido ? "pointer" : "not-allowed";
}

/* ------------ Calcular total ------------ */
tablaCongBody.addEventListener("input", () => calcularTotalCong());

function calcularTotalCong() {
  const datos = [...tablaCongBody.querySelectorAll("input")]
    .map(inp => ({ nombre: inp.dataset.vianda, cantidad: parseInt(inp.value) || 0 }))
    .filter(x => x.cantidad > 0);

  const totalViandas = datos.reduce((a, x) => a + x.cantidad, 0);
  const { min, max, precio } = combosCongelados[comboCongActual];
  const total = totalViandas * precio;

  if (totalViandas === 0) {
    alertaCong.textContent = "";
    totalCong.textContent = "Seleccioná tus viandas 👇";
  } else if (totalViandas < min) {
    alertaCong.textContent = `⚠️ Necesitás al menos ${min} viandas para este combo (te faltan ${min - totalViandas}).`;
    totalCong.textContent = `Viandas: ${totalViandas}`;
  } else if (totalViandas > max) {
    alertaCong.textContent = `⚠️ Máximo ${max} viandas para este combo.`;
    totalCong.textContent = `Viandas: ${totalViandas}`;
  } else {
    alertaCong.textContent = "✅ ¡Listo! Podés enviar tu pedido.";
    totalCong.textContent = `Viandas: ${totalViandas} — Total: $${total.toLocaleString("es-AR")}`;
  }

  actualizarBoton(totalViandas);
  return { datos, total, totalViandas };
}

/* ------------ Enviar a WhatsApp ------------ */
enviarCong.addEventListener("click", () => {
  if (enviarCong.disabled) return;

  const { datos, total, totalViandas } = calcularTotalCong();
  const resumen = datos.map(d => `• ${d.nombre}: ${d.cantidad}`).join("\n");

  const mensaje = encodeURIComponent(
    `🍱 Pedido Congelados\n\nCombo: ${comboCongActual} viandas ($${combosCongelados[comboCongActual].precio.toLocaleString("es-AR")} c/u)\n${resumen}\n\nTotal: $${total.toLocaleString("es-AR")}`
  );

  location.href = `https://wa.me/5492996060776?text=${mensaje}`;
});
