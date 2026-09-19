/* ==========================================================================
   CATÁLOGO DE PRODUCTOS
   Para agregar un producto: copia un bloque { ... } y cambia sus datos.
   Para quitarlo: bórralo, o pon status: "unavailable".

   Campos:
     id           Único, sin espacios (ej: "rosa-roja")
     name         Nombre visible
     price        Precio en guaraníes, número sin puntos (25000)
     oldPrice     Precio anterior (opcional). Si lo pones, se muestra tachado.
     description  Descripción corta (se ve en la tarjeta)
     includes     Lista de lo que incluye (se ve en el detalle del producto)
     image        Foto, ej: "img/products/mi-primera-rosa.jpg". Si falla, se usa una ilustración.
     category     Debe coincidir con un "id" de CATEGORIES
     stock        Unidades disponibles (0 = agotado). Ajústalo según tu realidad.
     status       "available" o "unavailable"
     tags         Etiquetas opcionales, ej: ["Con chocolates"]
   ========================================================================== */

const CATEGORIES = [
  { id: "ramos",    name: "Ramos" },
  { id: "arreglos", name: "Arreglos y baúles" },
  { id: "novias",   name: "Ramos de novia" }
  // Agrega más categorías así: { id: "plantas", name: "Plantas" }
];

const PRODUCTS = [
  /* ------------------------------ RAMOS ------------------------------ */
  {
    id: "mi-primera-rosa", name: "Mi Primera Rosa", price: 25000, oldPrice: null,
    description: "Una hermosa rosa roja para regalar un detalle especial y expresar cariño, amor o admiración.",
    includes: ["🌹 1 rosa roja", "🎁 Envoltura en papel tipo madera y moño decorativo", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/mi-primera-rosa.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "solcito-1-girasol", name: "Solcito (1 girasol)", price: 35000, oldPrice: null,
    description: "Un girasol con envoltura en papel madera y moño decorativo.",
    includes: ["🌻 1 girasol", "🎁 Envoltura en papel madera y moño decorativo", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/solcito-1-girasol.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "lirio-de-amor-xs", name: "Lirio de Amor XS", price: 80000, oldPrice: null,
    description: "Un lirio rosado con envoltura en papel coreano y moño decorativo.",
    includes: ["🌸 1 lirio rosado", "🎀 Envoltura en papel coreano y moño decorativo", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/lirio-de-amor-xs.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "sol-de-saron", name: "Sol de Sarón", price: 95000, oldPrice: null,
    description: "Un delicado detalle compuesto por rosas amarillas, ideal para regalar cariño, alegría y buenos deseos.",
    includes: ["💛 3 rosas amarillas", "🎁 Envoltura en papel coreano color blanco, con moño decorativo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/sol-de-saron.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "sol-radiante", name: "Sol Radiante", price: 125000, oldPrice: null,
    description: "Un hermoso arreglo compuesto por 2 girasoles y 1 rosa amarilla, ideal para regalar alegría y buenos deseos.",
    includes: ["💛 2 girasoles más 1 rosa amarilla", "🎁 Envoltura en papel coreano color amarillo y moño decorativo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/sol-radiante.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "renacer-amarillo", name: "Renacer Amarillo", price: 130000, oldPrice: null,
    description: "Ramo de 4 rosas amarillas con envoltura en papel coreano blanco y moño decorativo.",
    includes: ["💛 4 rosas amarillas", "🎁 Envoltura en papel coreano color blanco, con moño decorativo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/renacer-amarillo.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "solcito", name: "Solcito (margaritas amarillas)", price: 135000, oldPrice: null,
    description: "Ramo de margaritas amarillas con envoltura en papel coreano blanco y moño decorativo.",
    includes: ["💛 Margaritas amarillas", "🎁 Envoltura en papel coreano color blanco, con moño decorativo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/solcito.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "sol-radiante-4-girasoles", name: "Sol Radiante (4 girasoles)", price: 155000, oldPrice: null,
    description: "Un hermoso arreglo compuesto por 4 girasoles, ideal para regalar energía, alegría y buenos deseos.",
    includes: ["🌻 4 girasoles", "🎁 Envoltura en papel tipo madera y moño decorativo", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/sol-radiante-4-girasoles.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "pasion-eterna", name: "Pasión Eterna", price: 160000, oldPrice: null,
    description: "Ramo de 2 girasoles y 3 rosas rojas con envoltura en papel coreano rosado y moño decorativo.",
    includes: ["🌻 2 girasoles + 🌹 3 rosas rojas", "🎁 Envoltura en papel coreano rosado y moño decorativo", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/pasion-eterna.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "jardin-soleado", name: "Jardín Soleado", price: 165000, oldPrice: null,
    description: "Ramo de 3 rosas amarillas y 2 girasoles con envoltura en papel coreano blanco y moño decorativo.",
    includes: ["💛 3 rosas amarillas + 🌻 2 girasoles", "🎁 Envoltura en papel coreano color blanco, con moño decorativo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/jardin-soleado.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "bella-tentacion", name: "Bella Tentación", price: 165000, oldPrice: null,
    description: "Ramo de 6 rosas rojas con envoltura en papel coreano y moño decorativo.",
    includes: ["🌹 6 rosas rojas", "🎁 Envoltura en papel coreano y moño decorativo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/bella-tentacion.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "sol-de-amor", name: "Sol de Amor", price: 175000, oldPrice: null,
    description: "Ramo de 4 girasoles y 1 rosa roja con envoltura en papel coreano blanco y moño decorativo.",
    includes: ["🌻 4 girasoles + 🌹 1 rosa roja", "🎁 Envoltura en papel coreano blanco y moño decorativo", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/sol-de-amor.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "jardin-dulce", name: "Jardín Dulce", price: 195000, oldPrice: null,
    description: "Ramo de rosas coloridas, girasol y margaritas coloridas, con 3 unidades de Ferrero Rocher.",
    includes: ["💐 2 rosas coloridas más 1 girasol y margaritas coloridas", "🍫 Ferrero Rocher, 3 unidades", "🎀 Envoltura en papel coreano y moño decorativo", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/jardin-dulce.jpg", category: "ramos", stock: 50, status: "available", tags: ["Con chocolates"]
  },
  {
    id: "ramo-alegria-floral", name: "Ramo Alegría Floral", price: 230000, oldPrice: null,
    description: "Ramo de girasoles, rosas y margaritas.",
    includes: ["🌸 Girasoles, rosas y margaritas", "📌 Color de papel sujeto a disponibilidad"],
    image: "img/products/ramo-alegria-floral.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "ramo-arcoiris", name: "Ramo Arcoíris", price: 240000, oldPrice: null,
    description: "Ramo de 9 rosas coloridas, ideal para sorprender con un regalo alegre, original y lleno de color.",
    includes: ["🌈 9 rosas coloridas", "📌 Color de papel sujeto a disponibilidad"],
    image: "img/products/ramo-arcoiris.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "amanecer-rosado", name: "Amanecer Rosado", price: 265000, oldPrice: null,
    description: "Un detalle sofisticado que combina frescura, belleza y sentimientos sinceros para cualquier ocasión.",
    includes: ["🌷 10 rosas rosadas", "🎀 Envoltura en papel blanco y moño decorativo", "💌 Tarjeta dedicatoria incluida"],
    image: "img/products/amanecer-rosado.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "ramo-xxl", name: "Ramo XXL", price: 275000, oldPrice: null,
    description: "Hermoso ramo que contiene rosas y margaritas coloridas.",
    includes: ["💐 Rosas y margaritas coloridas", "📌 El color del papel está sujeto a disponibilidad"],
    image: "img/products/ramo-xxl.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "amanecer-dorado", name: "Amanecer Dorado", price: 345000, oldPrice: null,
    description: "Ramo de 4 rosas amarillas y 6 girasoles con envoltura en papel coreano negro y moño decorativo.",
    includes: ["💛 4 rosas amarillas + 🌻 6 girasoles", "🎁 Envoltura en papel coreano color negro, con moño decorativo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/amanecer-dorado.jpg", category: "ramos", stock: 50, status: "available", tags: []
  },
  {
    id: "bouquet-dulce", name: "Bouquet Dulce", price: 380000, oldPrice: null,
    description: "Ramo de 12 rosas rojas con 8 unidades de Ferrero Rocher, en envoltorio de papel coreano blanco.",
    includes: ["🌹 12 rosas rojas", "🍫 Ferrero Rocher, 8 unidades", "🎁 Envoltorio en papel coreano color blanco (sujeto a disponibilidad)", "💌 Tarjeta dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/bouquet-dulce.jpg", category: "ramos", stock: 50, status: "available", tags: ["Con chocolates"]
  },

  /* ------------------------ ARREGLOS Y BAÚLES ------------------------ */
  {
    id: "baul-de-sol", name: "Baúl de Sol", price: 195000, oldPrice: null,
    description: "Arreglo de 6 rosas amarillas en base de baúl color madera.",
    includes: ["💛 6 rosas amarillas", "🪵 Base en baúl color madera", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/baul-de-sol.jpg", category: "arreglos", stock: 50, status: "available", tags: []
  },
  {
    id: "baul-del-amor", name: "Baúl del Amor", price: 195000, oldPrice: null,
    description: "Arreglo de 6 rosas rojas en base de baúl de madera.",
    includes: ["🌹 6 rosas rojas", "🪵 En base de baúl; material madera", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/baul-del-amor.jpg", category: "arreglos", stock: 50, status: "available", tags: []
  },
  {
    id: "box-romantico", name: "Box Romántico", price: 215000, oldPrice: null,
    description: "Arreglo de 6 rosas rojas en una base en forma de corazón.",
    includes: ["🌹 6 rosas rojas", "💗 Base en forma de corazón", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/box-romantico.jpg", category: "arreglos", stock: 50, status: "available", tags: []
  },
  {
    id: "arreglo-base-corazon", name: "Arreglo en base de Corazón", price: 350000, oldPrice: null,
    description: "Arreglo de 10 rosas rojas en base de madera con forma de corazón.",
    includes: ["🌹 10 rosas rojas", "🪵 Base de madera en forma de corazón, color sujeto a disponibilidad", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/arreglo-base-corazon.jpg", category: "arreglos", stock: 50, status: "available", tags: []
  },
  {
    id: "arreglo-lirios-rosas", name: "Arreglo de Lirios y Rosas", price: 350000, oldPrice: null,
    description: "Arreglo de 4 rosas rojas y 2 lirios en base circular.",
    includes: ["🌹 4 rosas rojas + 🌸 2 lirios", "⭕ Base circular, color sujeto a disponibilidad", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/arreglo-lirios-rosas.jpg", category: "arreglos", stock: 50, status: "available", tags: []
  },
  {
    id: "arreglo-tricolor", name: "Arreglo Tricolor", price: 550000, oldPrice: null,
    description: "Arreglo de 18 rosas. Los colores se eligen sin variación de costo.",
    includes: ["🌹 18 rosas, colores a elección sin variación de costo", "💌 Dedicatoria incluida", "🚚 Delivery disponible"],
    image: "img/products/arreglo-tricolor.jpg", category: "arreglos", stock: 50, status: "available", tags: ["Colores a elección"]
  },

  /* --------------------------- RAMOS DE NOVIA --------------------------- */
  {
    id: "ramo-novia-rosas-blancas", name: "Ramo de Novia (4 rosas blancas)", price: 100000, oldPrice: null,
    description: "Ramo de novia de 4 rosas blancas. Se realiza con anticipación.",
    includes: ["🤍 4 rosas blancas", "⏳ Se realiza con anticipación"],
    image: "img/products/ramo-novia-rosas-blancas.jpg", category: "novias", stock: 50, status: "available", tags: ["Con anticipación"]
  },
  {
    id: "ramo-novia-rosas-rojas", name: "Ramo de Novia (4 rosas rojas)", price: 100000, oldPrice: null,
    description: "Ramo de novia de 4 rosas rojas. Se realiza con anticipación.",
    includes: ["❤️ 4 rosas rojas", "⏳ Se realiza con anticipación"],
    image: "img/products/ramo-novia-rosas-rojas.jpg", category: "novias", stock: 50, status: "available", tags: ["Con anticipación"]
  }
];
