/* ==========================================================================
   CATÁLOGO DE PRODUCTOS
   Para agregar un producto: copia un bloque { ... } y cambia sus datos.
   Para quitarlo: bórralo, o pon status: "unavailable".

   Campos:
     id           Único, sin espacios (ej: "rosa-roja")
     name         Nombre visible
     price        Precio en guaraníes, número sin puntos (25000)
     oldPrice     Precio anterior (opcional). Si lo pones, se muestra tachado.
     description  Descripción corta
     includes     Lista de lo que incluye (opcional)
     image        Ruta de la foto, ej: "img/mi-primera-rosa.jpg". Vacío = ilustración automática.
     category     Debe coincidir con un "id" de CATEGORIES
     stock        Unidades disponibles (0 = agotado)
     status       "available" o "unavailable"
     tags         Etiquetas opcionales, ej: ["Regalo", "Nuevo"]
     art          Ilustración automática si no hay foto (ver README)
   ========================================================================== */

const CATEGORIES = [
  { id: "ramos", name: "Ramos y arreglos" }
  // Agrega más categorías así: { id: "plantas", name: "Plantas" }
];

const PRODUCTS = [
  {
    id: "mi-primera-rosa",
    name: "Mi Primera Rosa",
    price: 25000,
    oldPrice: null,
    description:
      "Una hermosa rosa roja para regalar un detalle especial y expresar cariño, amor o admiración.",
    includes: [
      "🌹 1 rosa roja",
      "🎁 Envoltura en papel tipo madera y moño decorativo",
      "💌 Tarjeta dedicatoria incluida",
      "🚚 Delivery disponible"
    ],
    image: "",
    category: "ramos",
    stock: 20,
    status: "available",
    tags: ["Regalo"],
    art: { type: "rose", layout: "single", palette: [["#C8102E", "#8E0B21"]], bg: ["#FBE7EC", "#F4C6D2"] }
  },
  {
    id: "sol-de-saron",
    name: "Sol de Sarón",
    price: 95000,
    oldPrice: null,
    description:
      "Un delicado detalle compuesto por rosas amarillas, ideal para regalar cariño, alegría y buenos deseos.",
    includes: [
      "💛 3 rosas amarillas",
      "🎁 Envoltura decorativa",
      "💌 Tarjeta dedicatoria incluida",
      "🚚 Delivery disponible"
    ],
    image: "",
    category: "ramos",
    stock: 10,
    status: "available",
    tags: ["Más pedido"],
    art: { type: "rose", layout: "trio", palette: [["#F5C518", "#D49A00"]], bg: ["#FFF5D6", "#FBE39A"] }
  },
  {
    id: "ramo-arcoiris",
    name: "Ramo Arcoíris",
    price: 240000,
    oldPrice: null,
    description:
      "Ramo de 9 rosas coloridas, ideal para sorprender con un regalo alegre, original y lleno de color.",
    includes: [
      "🌈 9 rosas de colores",
      "🎁 Envoltura decorativa",
      "💌 Tarjeta dedicatoria",
      "🚚 Delivery disponible"
    ],
    image: "",
    category: "ramos",
    stock: 5,
    status: "available",
    tags: ["Sorpresa"],
    art: {
      type: "rose", layout: "nine",
      palette: [
        ["#E8384F", "#B0182F"], ["#F58A1F", "#C4600A"], ["#F5C518", "#D49A00"],
        ["#5BB450", "#3A8A34"], ["#4C7BE0", "#2F58B5"], ["#8E4DC4", "#6A2F9E"],
        ["#E85D9C", "#B93A76"], ["#F4EEF0", "#D3C2CA"], ["#C8102E", "#8E0B21"]
      ],
      bg: ["#EEF3FB", "#D5E2F7"]
    }
  },
  {
    id: "sol-radiante",
    name: "Sol Radiante",
    price: 125000,
    oldPrice: null,
    // COMPLETAR: la descripción original llegó cortada. Reemplaza este texto y la lista "includes".
    description:
      "Un hermoso arreglo floral en tonos cálidos y luminosos, pensado para alegrar cualquier ocasión.",
    includes: [],
    image: "",
    category: "ramos",
    stock: 8,
    status: "available",
    tags: [],
    art: { type: "sun", layout: "cluster", palette: [["#F5B700", "#7A4A12"]], bg: ["#FFF1D0", "#F9D98A"] }
  }
];
