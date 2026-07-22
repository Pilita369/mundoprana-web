

/* =======================================================
   CONGELADOS — 4 imágenes + precio único + tabla + WhatsApp
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
];

let congIndex = 0;

/* ------------ PRECIO ÚNICO ------------ */
const PRECIO_VIANDA_CONG = 10000;

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

/* ------------ Habilitar/deshabilitar botón ------------ */
function actualizarBoton(totalViandas) {
  const valido = totalViandas > 0;
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
  const total = totalViandas * PRECIO_VIANDA_CONG;

  if (totalViandas === 0) {
    alertaCong.textContent = "";
    totalCong.textContent = "Seleccioná tus viandas 👇";
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
    `🍱 Pedido Congelados ($${PRECIO_VIANDA_CONG.toLocaleString("es-AR")} c/u)\n\n${resumen}\n\nTotal: $${total.toLocaleString("es-AR")}\n\n📍 Mi ubicación/dirección (para revisar si aplica el envío sin cargo):\n🕒 Horario en el que puedo recibir el pedido:`
  );

  location.href = `https://wa.me/5492996060776?text=${mensaje}`;
});
