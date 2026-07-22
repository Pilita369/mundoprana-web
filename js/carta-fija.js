

/* =======================================================
   CARTA FIJA — precio único + tabla + WhatsApp
======================================================= */

const tablaCartaBody = document.querySelector("#tablaCartaFija tbody");
const totalCarta = document.getElementById("totalCartaFija");
const alertaCarta = document.getElementById("alertaCartaFija");
const enviarCarta = document.getElementById("enviarCartaFija");

/* ------------ PRECIO ÚNICO ------------ */
const PRECIO_VIANDA_CARTA = 14000;

/* ------------ LISTA DE PREPARACIONES ------------ */
const viandasCarta = [
  "Sándwich Veggie Burger (mijo, quinoa, lentejas o aduki)",
  "Sándwich de Champis salteados",
  "Sándwich de Pollo",
  "Sándwich de Bondiola desmechada",
  "Tartaleta de Pollo",
  "Tartaleta de Vegetales al wok y muzza",
  "Tartaleta de Atún",
  "Pizzeta La clásica muzza de siempre",
  "Pizzeta Alma Napoletana",
  "Pizzeta Huerta Asada",
  "Pizzeta Del Bosque"
];

/* ------------ Generar tabla ------------ */
function generarTablaCarta() {
  tablaCartaBody.innerHTML = "";
  viandasCarta.forEach(v => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${v}</td>
      <td><input type="number" min="0" max="50" value="0" data-vianda="${v}"></td>
    `;
    tablaCartaBody.appendChild(fila);
  });
}
generarTablaCarta();

/* ------------ Deshabilitar botón al inicio ------------ */
enviarCarta.disabled = true;
enviarCarta.style.opacity = "0.4";
enviarCarta.style.cursor = "not-allowed";

/* ------------ Habilitar/deshabilitar botón ------------ */
function actualizarBotonCarta(totalViandas) {
  const valido = totalViandas > 0;
  enviarCarta.disabled = !valido;
  enviarCarta.style.opacity = valido ? "1" : "0.4";
  enviarCarta.style.cursor = valido ? "pointer" : "not-allowed";
}

/* ------------ Calcular total ------------ */
tablaCartaBody.addEventListener("input", () => calcularTotalCarta());

function calcularTotalCarta() {
  const datos = [...tablaCartaBody.querySelectorAll("input")]
    .map(inp => ({ nombre: inp.dataset.vianda, cantidad: parseInt(inp.value) || 0 }))
    .filter(x => x.cantidad > 0);

  const totalViandas = datos.reduce((a, x) => a + x.cantidad, 0);
  const total = totalViandas * PRECIO_VIANDA_CARTA;

  if (totalViandas === 0) {
    alertaCarta.textContent = "";
    totalCarta.textContent = "Seleccioná tus preparaciones 👇";
  } else {
    alertaCarta.textContent = "✅ ¡Listo! Podés enviar tu pedido.";
    totalCarta.textContent = `Unidades: ${totalViandas} — Total: $${total.toLocaleString("es-AR")}`;
  }

  actualizarBotonCarta(totalViandas);
  return { datos, total, totalViandas };
}

/* ------------ Enviar a WhatsApp ------------ */
enviarCarta.addEventListener("click", () => {
  if (enviarCarta.disabled) return;

  const { datos, total, totalViandas } = calcularTotalCarta();
  const resumen = datos.map(d => `• ${d.nombre}: ${d.cantidad}`).join("\n");

  const mensaje = encodeURIComponent(
    `🍱 Pedido Carta Fija ($${PRECIO_VIANDA_CARTA.toLocaleString("es-AR")} c/u)\n\n${resumen}\n\nTotal: $${total.toLocaleString("es-AR")}\n\n📍 Dirección de envío:\n🕒 Horario en que pueden recibir el pedido:`
  );

  location.href = `https://wa.me/5492996060776?text=${mensaje}`;
});
