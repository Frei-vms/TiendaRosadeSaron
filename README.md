# Tienda online — Florería Rosa de Sarón

Tienda estática (HTML + CSS + JavaScript puro). **No usa servidor, base de datos ni servicios de pago**, por lo que se puede publicar gratis.

Flujo de compra: catálogo → carrito → datos del comprador → instrucciones de pago por ALIAS → **CONFIRMAR PEDIDO** → se abre WhatsApp con el mensaje del pedido ya redactado, dirigido al vendedor.

## 1. Archivos

```
tienda-rosa-de-saron/
├── index.html          Estructura de la página (normalmente no se toca)
├── css/styles.css      Diseño y colores (variables al inicio, en :root)
├── js/config.js        ★ Datos del negocio: nombre, WhatsApp, ALIAS, contacto, redes, textos
├── js/products.js      ★ Catálogo de productos y categorías
├── js/legal.js         ★ Términos y condiciones y Política de privacidad (plantilla)
├── js/app.js           Lógica: catálogo, carrito, checkout, WhatsApp (no se toca)
└── img/                Logo (logo.png) y fotos de productos (img/products/)
```

Los archivos marcados con ★ son los únicos que necesitas editar.

## 2. Instalación y ejecución local

No hay nada que instalar. Opciones:

- **Más simple:** haz doble clic en `index.html`.
- **Recomendado** (así se comporta igual que publicado, incluido el botón «Copiar ALIAS»): abre una terminal en la carpeta y ejecuta

  ```
  python3 -m http.server 8000
  ```

  Luego entra a `http://localhost:8000`.

## 3. Cambiar el WhatsApp del vendedor

En `js/config.js`:

```js
sellerWhatsapp: "595981123456",
```

Formato internacional, solo números, sin `+` ni espacios. Paraguay: `595` + número sin el `0` inicial (0981 123 456 → `595981123456`). Es el único lugar donde aparece el número. Mientras tenga las «X» de ejemplo, el botón CONFIRMAR PEDIDO queda bloqueado y se muestra un aviso.

## 4. Cambiar el ALIAS, titular y banco

En `js/config.js`:

```js
payment: {
  alias: "TU.ALIAS",
  holder: "NOMBRE REAL DEL TITULAR",
  bank: "TU BANCO",
  instructions: "..."
}
```

Mientras los datos sean los de ejemplo, la pantalla de pago muestra la etiqueta «DATOS DE EJEMPLO».

## 5. Cambiar productos

En `js/products.js`, dentro de `PRODUCTS`, copia un bloque `{ ... }` y edita sus datos:

| Campo | Descripción |
|---|---|
| `id` | Único, sin espacios (`"rosa-roja"`) |
| `name` | Nombre visible |
| `price` | Precio en guaraníes, sin puntos (`25000`) |
| `oldPrice` | Precio anterior (opcional; se muestra tachado y aparece la etiqueta «Oferta») |
| `description` | Descripción corta |
| `includes` | Lista de lo que incluye (opcional) |
| `image` | Foto, por ejemplo `"img/products/mi-primera-rosa.jpg"`. Si falta o falla, se usa una ilustración automática |
| `category` | Debe coincidir con un `id` de `CATEGORIES` |
| `stock` | Unidades disponibles (`0` = Agotado) |
| `status` | `"available"` o `"unavailable"` |
| `tags` | Etiquetas opcionales (`["Regalo"]`) |

Para quitar un producto, bórralo o pon `status: "unavailable"`. Para agregar categorías, añádelas a `CATEGORIES`.

**Agregar un producto con foto:** guarda la foto (cuadrada, unos 800 px) en `img/products/`, copia un bloque de `products.js` y cambia `id`, `name`, `price`, `includes` e `image`.

## 6. Cambiar nombre, logo, contacto, redes y textos

Todo en `js/config.js`. El logo se coloca en `img/` y se indica en `logo: "img/logo.png"`. Las redes sociales que dejes vacías no se muestran.

## 7. Términos y política de privacidad

Edita `js/legal.js`. Son **plantillas**: deben adaptarse y revisarse según las leyes aplicables (idealmente con un profesional del derecho) antes de operar comercialmente. Ambas páginas lo indican con un aviso visible.

## 8. Estados del pedido

`ORDER_STATUSES` en `js/config.js` define: Pendiente de pago, Pago informado, Pago verificado, Preparando pedido, Enviado, Entregado y Cancelado. Hoy el pedido nace como **Pago informado** al confirmarse. La estructura queda lista para conectar un panel de administración más adelante.

## 9. Publicar gratis

**GitHub Pages**
1. Crea una cuenta en github.com y un repositorio nuevo (público), por ejemplo `tienda`.
2. Sube todos los archivos de esta carpeta (botón *Add file → Upload files*), con `index.html` en la raíz.
3. Ve a *Settings → Pages*, en *Source* elige *Deploy from a branch*, rama `main`, carpeta `/ (root)` y guarda.
4. En unos minutos tendrás la tienda en `https://TU-USUARIO.github.io/tienda/`.

**Cloudflare Pages**
1. Sube la carpeta a un repositorio de GitHub.
2. En Cloudflare: *Workers & Pages → Create → Pages → Connect to Git*.
3. Elige el repositorio. Framework: *None*. Comando de build: vacío. Directorio de salida: `/`.
4. Publica. Obtienes una dirección `*.pages.dev` gratuita.

**Netlify Drop:** entra a app.netlify.com/drop y arrastra la carpeta.

Si quieres una dirección propia (por ejemplo `rosadesaron.com.py`), el dominio se paga aparte; la publicación en sí sigue siendo gratuita.

## 10. Seguridad: qué debes saber

- **No hay pago con tarjeta** ni se guardan datos de tarjetas.
- **No hay servidor:** los datos personales del comprador no se guardan en ningún lugar de la tienda. Solo viajan en el mensaje de WhatsApp. En el navegador del comprador se guarda el carrito y un historial mínimo (número, fecha, total, estado), sin nombre, teléfono ni dirección.
- Como toda tienda 100 % estática, **los precios viven en el navegador**: un usuario con conocimientos técnicos podría alterarlos. Por eso el flujo se basa en que **tú verifiques el monto contra tu banco antes de preparar el pedido**. El número de pedido se genera en el dispositivo del comprador (6 dígitos derivados de la hora) y sirve como referencia, no como registro central.
- El stock no se descuenta automáticamente; actualízalo a mano en `products.js`.
- Si más adelante necesitas validación de precios y stock en servidor, la evolución natural y gratuita es agregar un backend (por ejemplo Cloudflare Workers + D1, o Supabase con plan gratuito) que reciba el pedido, recalcule el total con los precios reales y guarde el estado. La estructura de `order` en `app.js` y `ORDER_STATUSES` ya está pensada para eso.
