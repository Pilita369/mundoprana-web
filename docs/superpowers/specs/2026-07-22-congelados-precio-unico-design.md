# Congelados: precio único y fin del sistema de combos

## Contexto

El modal de "Carta Congelados" (`index.html`, `js/combo.js`) usa un sistema de combos escalonados (x5/x10/x15+) con precio decreciente por cantidad y validación de mínimo/máximo por combo. Se simplifica a un precio único de $10.000 por vianda, sin importar la cantidad, y se elimina una imagen del carrusel que ya no corresponde.

## Cambios

### 1. Imagen del carrusel
- Eliminar `img/carta-congelados/5congelados.webp` del array `hojasCong` en `js/combo.js`.
- Borrar el archivo físico del repo.

### 2. Eliminar sistema de combos
- Quitar del HTML (`index.html`, sección `.modal-cong__opciones`) los 3 botones de combo (x5/x10/x15+).
- Quitar de `js/combo.js`: el objeto `combosCongelados`, la variable `comboCongActual` y el listener de `.cong-combo`.
- Cualquier CSS específico de `.cong-combo` que quede sin uso se puede dejar (no rompe nada); no es parte del alcance de este cambio.

### 3. Precio único
- `calcularTotalCong()`: `total = totalViandas * 10000`, sin validación de mínimo/máximo de combo.
- `actualizarBoton()`: el botón de enviar se habilita con `totalViandas > 0` (sin mínimo).
- Mensaje de WhatsApp: ya no menciona combo ni precio escalonado; usa el precio único.

### 4. Textos del modal
- Título: "Elegí tu combo de viandas congeladas 🍱" → "Armá tu pedido de viandas congeladas 🍱"
- Agregar línea de precio único: "$10.000 c/u"
- Agregar línea fija informativa (siempre visible, debajo del título/precio):
  "🚚 Envío SIN CARGO a partir de 15 viandas en zona centro y oeste de Neuquén. Indicá tu dirección al enviar el pedido para confirmar si aplica."

### 5. Mensaje de WhatsApp
- Quitar la mención al combo y su precio escalonado.
- Al final del mensaje, agregar un pedido explícito de:
  - Dirección de envío (para calcular costo de envío / confirmar si aplica el envío sin cargo).
  - Horario en que pueden recibir el pedido.
- El envío sin cargo por 15+ viandas NO se calcula ni menciona automáticamente en el mensaje (eso solo vive en el texto fijo del modal); el mensaje de WhatsApp solo pide dirección y horario.

## Fuera de alcance
- No se agrega lógica para detectar automáticamente si una dirección cae en zona centro/oeste (se resuelve manualmente por WhatsApp).
- No se toca el menú de almuerzo diario ni la carta fija.
- El futuro menú con carne queda fuera de este cambio; se abordará en una iteración aparte.
