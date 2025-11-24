// combos.js — Mundo Prana 🍱
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modalCombo");
  const abrir = document.getElementById("abrirCombos");
  const cerrar = document.getElementById("cerrarCombo");
  const tablaBody = document.querySelector("#tablaViandas tbody");
  const totalTexto = document.getElementById("totalCombo");
  const alerta = document.getElementById("alertaCombo");
  const btnEnviar = document.getElementById("btnEnviarCombo");

  const combos = {
    5: { precio: 8000, min: 5, max: 9 },
    10: { precio: 7500, min: 10, max: 14 },
    15: { precio: 7000, min: 15, max: 50 } // sin tope fijo
  };

  let comboActual = 5;

  const viandas = [
    "Tarta integral de calabaza",
    "Hamburguesa de mijo",
    "Pollo con vegetales",
    "Ensalada 4 colores",
    "Yogur natural con granola",
    "Guiso de lentejas",
    "Tarta de espinaca",
    "Wok de verduras con arroz yamani",
    "Hamburguesa de garbanzos",
    "Tarta de berenjena",
    "Wrap veggie integral",
    "Bowl de quinoa",
    "Croquetas de mijo y zanahoria",
    "Tarta de brócoli",
    "Budín proteico"
  ];

  // === Generar tabla de viandas ===
  function generarTabla() {
    tablaBody.innerHTML = "";
    viandas.forEach(v => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${v}</td>
        <td><input type="number" min="0" max="50" value="0" data-vianda="${v}"></td>
      `;
      tablaBody.appendChild(fila);
    });
  }
  generarTabla();

  // === Abrir/Cerrar Modal ===
  abrir.addEventListener("click", () => modal.style.display = "flex");
  cerrar.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

  // === Cambiar combo ===
  document.querySelectorAll(".combo-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      comboActual = parseInt(btn.dataset.combo);
      alerta.textContent = "";
      totalTexto.textContent = "Seleccioná tus viandas 👇";
      tablaBody.querySelectorAll("input").forEach(inp => inp.value = 0);
    });
  });

  // === Calcular total ===
  tablaBody.addEventListener("input", () => calcularTotal());

  function calcularTotal() {
    const datos = Array.from(tablaBody.querySelectorAll("input"))
      .map(inp => ({ nombre: inp.dataset.vianda, cantidad: parseInt(inp.value) || 0 }))
      .filter(x => x.cantidad > 0);

    const totalViandas = datos.reduce((acc, x) => acc + x.cantidad, 0);
    const precioUnit = combos[comboActual].precio;
    const total = totalViandas * precioUnit;

    const { min, max } = combos[comboActual];

    if (totalViandas < min) {
      alerta.textContent = `⚠️ Debés elegir al menos ${min} viandas para el combo de ${comboActual}.`;
    } else if (totalViandas > max) {
      alerta.textContent = `⚠️ Máximo permitido: ${max} viandas en este combo.`;
    } else {
      alerta.textContent = "";
    }

    totalTexto.textContent = `Viandas: ${totalViandas}  —  Total: $${total.toLocaleString("es-AR")}`;
    return { datos, total, totalViandas };
  }

  // === Enviar pedido a WhatsApp ===
  btnEnviar.addEventListener("click", () => {
    const { datos, total, totalViandas } = calcularTotal();
    const { min, max } = combos[comboActual];

    if (totalViandas < min || totalViandas > max) {
      alerta.textContent = "⚠️ Revisá la cantidad de viandas antes de enviar.";
      return;
    }

    const resumen = datos.map(d => `• ${d.nombre}: ${d.cantidad}`).join("\n");

    const mensaje = encodeURIComponent(
      `🍱 Pedido Mundo Prana\n\nCombo seleccionado: ${comboActual} viandas\n\n` +
      `${resumen}\n\n💰 Total: $${total.toLocaleString("es-AR")}\nForma de pago: transferencia ✅`
    );

    window.open(`https://wa.me/5492996060776?text=${mensaje}`, "_blank");
  });

});
