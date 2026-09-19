/* ==========================================================================
   CONFIGURACIÓN CENTRAL DE LA TIENDA
   Este es el ÚNICO archivo donde cambias los datos del negocio.
   Todo lo marcado con "EJEMPLO" debe reemplazarse antes de publicar.
   ========================================================================== */

const STORE_CONFIG = {
  /* ---- Identidad ---- */
  name: "Florería Rosa de Sarón",
  shortName: "Rosa de Sarón",
  tagline: "Flores con mensaje, entregadas con cariño",
  logo: "",                       // Ruta a tu logo, ej: "img/logo.png". Vacío = usa el ícono de flor.

  /* ---- Moneda ---- */
  currency: "PYG",
  currencySymbol: "₲",

  /* ---- WhatsApp del vendedor (SOLO aquí) ----
     Formato internacional, solo números, sin "+" ni espacios.
     Paraguay: 595 + número sin el 0 inicial. Ej: 0981 123 456 -> "595981123456" */
  sellerWhatsapp: "595XXXXXXXXX", // EJEMPLO: reemplazar

  /* ---- Pago por transferencia (ALIAS) ---- */
  payment: {
    alias: "MI.TIENDA.PAGO",        // EJEMPLO: reemplazar
    holder: "NOMBRE DEL TITULAR",   // EJEMPLO: reemplazar
    bank: "BANCO DE EJEMPLO",       // EJEMPLO: reemplazar
    instructions:
      "Transfiere el monto exacto al alias indicado y luego presiona CONFIRMAR PEDIDO. " +
      "Te pediremos el comprobante por WhatsApp para verificar el pago."
  },

  /* ---- Contacto (déjalo vacío "" para ocultar un dato) ---- */
  contact: {
    phone: "+595 XXX XXX XXX",      // EJEMPLO
    email: "contacto@ejemplo.com",  // EJEMPLO
    address: "Dirección del local, Ciudad, Paraguay", // EJEMPLO
    hours: "Lunes a sábado, 8:00 a 18:00"             // EJEMPLO
  },

  /* ---- Redes sociales (URL completa; vacío = no se muestra) ---- */
  social: {
    instagram: "",   // ej: "https://instagram.com/tu_usuario"
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
    catalogTitle: "Ramos y arreglos",
    catalogText: "Cada pedido se prepara al momento. Consulta disponibilidad de entrega por WhatsApp.",
    aboutTitle: "Sobre nosotros",
    aboutText:
      "En Rosa de Sarón armamos cada ramo pensando en quién lo va a recibir. " +
      "Trabajamos con flores frescas y una presentación cuidada para que tu detalle llegue como lo imaginaste.",
    footerText: "Flores frescas, presentación cuidada y atención personalizada.",
    checkoutNote: "El delivery y su costo se coordinan por WhatsApp una vez confirmado el pedido."
  },

  /* ---- Puntos destacados bajo el encabezado ---- */
  perks: [
    { t: "Delivery disponible", d: "Coordinamos la entrega por WhatsApp" },
    { t: "Tarjeta dedicatoria", d: "Incluida en los ramos" },
    { t: "Pago por transferencia", d: "Sin tarjeta, sin comisiones" }
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
