

/* =======================================================
   CONGELADOS — Carta Clásica ($10.000) + Carta Premium ($15.000)
======================================================= */

const NUMERO_WHATSAPP = "5492996060776";

/* ------------ CARTA CLÁSICA ------------ */
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
  "./img/carta-congelados/menu_nuevo.png",
  "./img/carta-congelados/vegetariano_nevo.png",
];

let congIndex = 0;

const PRECIO_VIANDA_CONG = 10000;

const viandasCong = [
  {
    categoria: "Carnes",
    items: [
      "Cuadril a las Hierbas",
      "Carne Desmechada a la Criolla",
      "Guiso de Lentejas con Carne",
      "Tacos de Carne y Vegetales",
    ],
  },
  {
    categoria: "Pollo",
    items: [
      "Pollo a las Finas Hierbas",
      "Pollo a la Criolla",
      "Milanesa de Pollo",
      "Chop Suey de Pollo",
      "Tarta Integral de pollo y acelga",
      "Tarta Integral de pollo Primavera",
    ],
  },
  {
    categoria: "Bondiola",
    items: [
      "Bondiola Braseada",
      "Bondiola Desmenuzada",
    ],
  },
  {
    categoria: "Vegetariano",
    items: [
      "Guiso de Lentejas con Hongos de pino",
      "Salteado de Vegetales con Arroz Yamaní",
      "Hamburguesas Vegetarianas",
      "Salteado de Vegetales",
      "Tarta Integral de Acelga",
      "Tarta Integral de Brócoli",
      "Pizzeta Napolitana Gourmet",
      "Pizzeta Vegetariana Mediterránea",
    ],
  },
];

/* ------------ Generar tabla con categorías ------------ */
function generarTablaCategorizada(tbody, categorias) {
  tbody.innerHTML = "";
  categorias.forEach(cat => {
    const filaCategoria = document.createElement("tr");
    filaCategoria.className = "modal-cong__categoria";
    filaCategoria.innerHTML = `<th colspan="2">${cat.categoria}</th>`;
    tbody.appendChild(filaCategoria);

    cat.items.forEach(nombre => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${nombre}</td>
        <td><input type="number" min="0" max="50" value="0" data-vianda="${nombre}"></td>
      `;
      tbody.appendChild(fila);
    });
  });
}
generarTablaCategorizada(tablaCongBody, viandasCong);

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

function actualizarBoton(boton, totalViandas) {
  const valido = totalViandas > 0;
  boton.disabled = !valido;
  boton.style.opacity = valido ? "1" : "0.4";
  boton.style.cursor = valido ? "pointer" : "not-allowed";
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

  actualizarBoton(enviarCong, totalViandas);
  return { datos, total, totalViandas };
}

/* ------------ Enviar a WhatsApp ------------ */
enviarCong.addEventListener("click", () => {
  if (enviarCong.disabled) return;
  enviarPedidoWhatsApp("Carta Clásica", calcularTotalCong(), PRECIO_VIANDA_CONG);
});

/* =======================================================
   CARTA PREMIUM
======================================================= */

const modalCongPremium = document.getElementById("modalCongPremium");
const abrirCongPremium = document.getElementById("btnCongPremium");
const cerrarCongPremium = document.getElementById("cerrarCongPremium");

const tablaCongPremiumBody = document.querySelector("#tablaCongPremium tbody");
const totalCongPremium = document.getElementById("totalCongPremium");
const alertaCongPremium = document.getElementById("alertaCongPremium");
const enviarCongPremium = document.getElementById("enviarCongPremium");

const PRECIO_VIANDA_PREMIUM = 15000;

const viandasPremium = [
  "Vacío Braseado",
  "Matambre a la Pizza",
  "Pollo Relleno",
];

function generarTablaPremium() {
  tablaCongPremiumBody.innerHTML = "";
  viandasPremium.forEach(nombre => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${nombre}</td>
      <td><input type="number" min="0" max="50" value="0" data-vianda="${nombre}"></td>
    `;
    tablaCongPremiumBody.appendChild(fila);
  });
}
generarTablaPremium();

abrirCongPremium?.addEventListener("click", () => {
  modalCongPremium.classList.add("activo");
});

cerrarCongPremium?.addEventListener("click", () => modalCongPremium.classList.remove("activo"));
modalCongPremium?.addEventListener("click", e => {
  if (e.target === modalCongPremium) modalCongPremium.classList.remove("activo");
});

enviarCongPremium.disabled = true;
enviarCongPremium.style.opacity = "0.4";
enviarCongPremium.style.cursor = "not-allowed";

tablaCongPremiumBody.addEventListener("input", () => calcularTotalCongPremium());

function calcularTotalCongPremium() {
  const datos = [...tablaCongPremiumBody.querySelectorAll("input")]
    .map(inp => ({ nombre: inp.dataset.vianda, cantidad: parseInt(inp.value) || 0 }))
    .filter(x => x.cantidad > 0);

  const totalViandas = datos.reduce((a, x) => a + x.cantidad, 0);
  const total = totalViandas * PRECIO_VIANDA_PREMIUM;

  if (totalViandas === 0) {
    alertaCongPremium.textContent = "";
    totalCongPremium.textContent = "Seleccioná tus preparaciones 👇";
  } else {
    alertaCongPremium.textContent = "✅ ¡Listo! Podés enviar tu pedido.";
    totalCongPremium.textContent = `Preparaciones: ${totalViandas} — Total: $${total.toLocaleString("es-AR")}`;
  }

  actualizarBoton(enviarCongPremium, totalViandas);
  return { datos, total, totalViandas };
}

enviarCongPremium.addEventListener("click", () => {
  if (enviarCongPremium.disabled) return;
  enviarPedidoWhatsApp("Carta Premium", calcularTotalCongPremium(), PRECIO_VIANDA_PREMIUM);
});

/* ------------ Mensaje de WhatsApp compartido ------------ */
function enviarPedidoWhatsApp(nombreCarta, { datos, total }, precioUnitario) {
  const resumen = datos.map(d => `- ${d.cantidad} × ${d.nombre}`).join("\n");

  const mensaje = encodeURIComponent(
    `Hola, quiero realizar un pedido de la ${nombreCarta} 🍱:\n\n${resumen}\n\nPrecio unitario: $${precioUnitario.toLocaleString("es-AR")}\nTotal: $${total.toLocaleString("es-AR")}\n\n📍 Mi ubicación/dirección (para revisar si aplica el envío sin cargo):\n🕒 Horario en el que puedo recibir el pedido:`
  );

  location.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
}
