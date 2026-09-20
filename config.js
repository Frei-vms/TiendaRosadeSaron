/* ==========================================================================
   CONFIGURACIÓN CENTRAL DE LA TIENDA
   Este es el ÚNICO archivo donde cambias los datos del negocio.
   Datos configurados para Florería Rosa de Sarón. Un dato vacío ("") no se muestra.
   ========================================================================== */

const STORE_CONFIG = {
  /* ---- Identidad ---- */
  name: "Florería Rosa de Sarón",
  shortName: "Rosa de Sarón",
  tagline: "Flores con mensaje, entregadas con cariño",
  logo: "img/logo.png",           // Ruta a tu logo. Vacío = usa el ícono de flor.

  /* ---- Moneda ---- */
  currency: "PYG",
  currencySymbol: "₲",

  /* ---- WhatsApp del vendedor (SOLO aquí) ----
     Formato internacional, solo números, sin "+" ni espacios.
     Paraguay: 595 + número sin el 0 inicial. Ej: 0981 123 456 -> "595981123456" */
  sellerWhatsapp: "595984183711",

  /* ---- Pago por transferencia (ALIAS) ---- */
  payment: {
    alias: "4.192.227",
    holder: "Juan Daniel Torres Flores",
    bank: "Itaú",
    instructions:
      "Transfiere el monto exacto al alias indicado desde la aplicación de tu banco y luego presiona CONFIRMAR PEDIDO. " +
      "Envía el comprobante de la transferencia por WhatsApp para que podamos verificar tu pago y coordinar la entrega."
  },

  /* ---- Contacto (déjalo vacío "" para ocultar un dato) ---- */
  contact: {
    phone: "",                      // Se omite: ya se muestra el WhatsApp (mismo número)
    email: "",                      // Sin correo: se usa Instagram (ver «social»)
    address: "JF43+4MP, 111214 Ñemby, Paraguay", // Ubicación del local (código de Google Maps)
    mapUrl: "https://maps.app.goo.gl/cshZgyDDWuoqDKNq6", // Enlace de Google Maps del local
    whatsappCatalog: "https://wa.me/c/595984183711",     // Catálogo de WhatsApp Business (vacío = no se muestra)
    hours: "Atención de 07:00 a 19:00"
  },

  /* ---- Redes sociales (URL completa; vacío = no se muestra) ---- */
  social: {
    instagram: "https://instagram.com/rosadesaronnemby",
    facebook: "",    // ej: "https://facebook.com/tu_pagina"
    tiktok: ""       // ej: "https://tiktok.com/@tu_usuario"
  },

  /* ---- Textos de la tienda ---- */
  texts: {
    heroTitle: "Flores que dicen lo que las palabras no alcanzan",
    heroText:
      "Ramos y arreglos armados a mano, con tarjeta dedicatoria y delivery. " +
      "Elige, paga por transferencia y confirmamos tu pedido por WhatsApp.",
    heroCta: "Ver catálogo",
    catalogTitle: "Nuestro catálogo",
    catalogText: "Cada pedido se prepara al momento. Consulta disponibilidad de entrega por WhatsApp.",
    aboutTitle: "Sobre nosotros",
    aboutText:
      "En Rosa de Sarón armamos cada ramo pensando en quién lo va a recibir. " +
      "Trabajamos con flores frescas y una presentación cuidada para que tu detalle llegue como lo imaginaste.",
    footerText: "Flores frescas, presentación cuidada y atención personalizada.",
    checkoutNote: "El delivery y su costo se coordinan por WhatsApp una vez confirmado el pedido.",
    amountNote: "Este monto corresponde a los productos. El costo de delivery, si corresponde, se coordina por WhatsApp.",
    howToTitle: "Cómo comprar",
    howToText: "Comprar es simple: elige, transfiere y confirma por WhatsApp."
  },

  /* ---- Fotos de la portada (3 imágenes; si se deja vacío se usa una ilustración) ---- */
  heroImages: [
    "img/products/sol-de-saron.jpg",
    "img/products/ramo-arcoiris.jpg",
    "img/products/bella-tentacion.jpg"
  ],

  /* ---- Pasos de compra (sección «Cómo comprar») ---- */
  howTo: [
    { t: "Elige tus flores",        d: "Explora el catálogo y agrega al carrito lo que más te guste." },
    { t: "Completa tus datos",      d: "Indica quién recibe, la dirección de entrega y la ciudad." },
    { t: "Transfiere con el alias", d: "Paga el monto exacto desde la aplicación de tu banco." },
    { t: "Confirma por WhatsApp",   d: "Envía tu pedido y el comprobante; coordinamos la entrega contigo." }
  ],

  /* ---- Puntos destacados bajo el encabezado ---- */
  perks: [
    { t: "Delivery disponible", d: "Coordinamos la entrega por WhatsApp" },
    { t: "Dedicatoria personalizada", d: "Incluida en la mayoría de nuestros arreglos" },
    { t: "Pago por transferencia", d: "Con el alias de tu banco, sin tarjeta" }
  ],

  /* ---- Pedidos ---- */
  orderPrefix: "PEDIDO #"
};

/* ==========================================================================
   ESTADOS DE PEDIDO
   Estructura lista para un futuro panel de administración.
   Hoy la tienda solo usa PENDIENTE_PAGO y PAGO_INFORMADO.
   ========================================================================== */
const ORDER_STATUSES = {
  PENDIENTE_PAGO:   { label: "Pendiente de pago",   order: 1 },
  PAGO_INFORMADO:   { label: "Pago informado",      order: 2 },
  PAGO_VERIFICADO:  { label: "Pago verificado",     order: 3 },
  PREPARANDO:       { label: "Preparando pedido",   order: 4 },
  ENVIADO:          { label: "Enviado",             order: 5 },
  ENTREGADO:        { label: "Entregado",           order: 6 },
  CANCELADO:        { label: "Cancelado",           order: 99 }
};
