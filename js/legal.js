/* ==========================================================================
   TEXTOS LEGALES (PLANTILLA EDITABLE)
   - {{tienda}}, {{whatsapp}}, {{email}}, {{telefono}} se reemplazan solos
     con los datos de js/config.js.
   - Cada apartado tiene un título (h) y una lista de párrafos (p).
   ========================================================================== */

const LEGAL_NOTICE =
  "Este texto es una PLANTILLA. Debe ser adaptado y revisado según las leyes aplicables " +
  "(por ejemplo, la normativa de defensa del consumidor y de protección de datos vigente en Paraguay) " +
  "antes de utilizar la tienda comercialmente. Idealmente, consúltalo con un profesional del derecho.";

const LEGAL = {
  terms: {
    title: "Términos y condiciones",
    updated: "Última actualización: 19 de septiembre de 2026",
    sections: [
      {
        h: "1. Información general",
        p: [
          "Este sitio es operado por {{tienda}} (en adelante, «la tienda»). Al realizar un pedido, el comprador declara haber leído y aceptado estos términos.",
          "Contacto de la tienda: WhatsApp {{whatsapp}} · Instagram {{instagram}} · Ubicación {{direccion}}."
        ]
      },
      {
        h: "2. Productos y precios",
        p: [
          "Los precios se expresan en guaraníes (₲) e incluyen los impuestos aplicables, salvo indicación contraria.",
          "Las fotografías e ilustraciones son referenciales. Al tratarse de productos naturales, pueden existir variaciones en tono, tamaño y forma de las flores. La tienda podrá sustituir flores por otras de igual o mayor valor y estilo similar si alguna variedad no estuviera disponible.",
          "La tienda puede modificar precios y disponibilidad sin previo aviso. El precio aplicable es el vigente al momento de confirmar el pedido."
        ]
      },
      {
        h: "3. Proceso de compra",
        p: [
          "El comprador agrega productos al carrito, completa sus datos de entrega y contacto, revisa el resumen y confirma el pedido.",
          "Es responsabilidad del comprador ingresar datos correctos y completos (nombre, WhatsApp, dirección y ciudad)."
        ]
      },
      {
        h: "4. Métodos de pago",
        p: [
          "El pago se realiza mediante transferencia bancaria al ALIAS indicado durante el proceso de compra. La tienda no procesa pagos con tarjeta ni almacena datos de tarjetas.",
          "El comprador debe transferir el monto exacto indicado y enviar el comprobante cuando la tienda lo solicite."
        ]
      },
      {
        h: "5. Confirmación de pedidos",
        p: [
          "Al presionar «Confirmar pedido», el comprador informa que realizó (o realizará) la transferencia y se genera un mensaje de WhatsApp para la tienda.",
          "El pedido queda confirmado únicamente cuando la tienda verifica el pago y lo comunica por WhatsApp. Hasta entonces, el pedido figura como «pago informado»."
        ]
      },
      {
        h: "6. Entregas",
        p: [
          "La entrega se coordina por WhatsApp según la zona, el horario y la disponibilidad. El costo de delivery, si corresponde, se informa antes de la entrega.",
          "Si no hubiera nadie para recibir el pedido en el horario acordado, la tienda podrá reprogramar la entrega, pudiendo generarse un costo adicional."
        ]
      },
      {
        h: "7. Cambios y devoluciones",
        p: [
          "Por tratarse de productos perecederos, no se aceptan devoluciones por causas ajenas a la tienda. Si el producto llegara dañado o no corresponde a lo pedido, el comprador debe avisar por WhatsApp dentro de las 24 horas de la entrega, con fotografías, para evaluar una solución.",
          "[Ajustar esta sección a las condiciones reales de la tienda.]"
        ]
      },
      {
        h: "8. Cancelaciones",
        p: [
          "El comprador puede solicitar la cancelación por WhatsApp antes de que el pedido entre en preparación. Una vez en preparación o enviado, la cancelación podría no ser posible.",
          "La tienda puede cancelar un pedido por falta de stock, imposibilidad de entrega o imposibilidad de verificar el pago, y en ese caso reintegrará el monto abonado."
        ]
      },
      {
        h: "9. Responsabilidad del comprador",
        p: [
          "El comprador es responsable de la veracidad de los datos que ingresa, de realizar el pago por el monto correcto y de estar disponible para recibir el pedido.",
          "Debe utilizar la tienda de forma lícita y no realizar pedidos con datos falsos."
        ]
      },
      {
        h: "10. Responsabilidad de la tienda",
        p: [
          "La tienda se compromete a preparar los pedidos con productos de calidad y a mantener una comunicación clara con el comprador.",
          "La tienda no se responsabiliza por demoras o inconvenientes causados por datos incorrectos del comprador, fuerza mayor o hechos ajenos a su control."
        ]
      },
      {
        h: "11. Protección de datos",
        p: [
          "El tratamiento de los datos personales se describe en la Política de privacidad, que forma parte de estos términos."
        ]
      },
      {
        h: "12. Contacto",
        p: [
          "Para consultas, reclamos o solicitudes: WhatsApp {{whatsapp}} · Teléfono {{telefono}} · Instagram {{instagram}} · Ubicación {{direccion}}."
        ]
      }
    ]
  },

  privacy: {
    title: "Política de privacidad",
    updated: "Última actualización: 19 de septiembre de 2026",
    sections: [
      {
        h: "1. Quiénes somos",
        p: ["{{tienda}} es responsable del tratamiento de los datos que el comprador ingresa en esta tienda."]
      },
      {
        h: "2. Qué datos recopilamos",
        p: [
          "Únicamente los necesarios para gestionar tu pedido: nombre y apellido, número de WhatsApp, dirección o ubicación de entrega, ciudad, comentarios adicionales y el detalle de los productos comprados.",
          "No solicitamos ni almacenamos datos de tarjetas ni claves bancarias. El pago se realiza por transferencia desde tu propia aplicación bancaria."
        ]
      },
      {
        h: "3. Para qué los usamos",
        p: [
          "Para preparar y entregar tu pedido, comunicarnos contigo por WhatsApp, verificar tu pago y responder consultas o reclamos.",
          "No vendemos ni cedemos tus datos a terceros con fines comerciales."
        ]
      },
      {
        h: "4. Cómo se envían los datos",
        p: [
          "Al confirmar el pedido, se genera un mensaje de WhatsApp con los datos del pedido dirigido a la tienda. El envío ocurre a través de tu propia cuenta de WhatsApp y se rige también por las políticas de WhatsApp.",
          "Esta tienda no guarda tus datos personales en un servidor. En tu dispositivo se guarda, de forma temporal, el contenido del carrito y un historial mínimo de pedidos (número, fecha, total y estado)."
        ]
      },
      {
        h: "5. Cuánto tiempo los conservamos",
        p: [
          "Los mensajes de pedido se conservan en el WhatsApp de la tienda durante el tiempo necesario para la gestión del pedido y las obligaciones legales aplicables. [Ajustar según la práctica real.]"
        ]
      },
      {
        h: "6. Tus derechos",
        p: [
          "Puedes solicitar acceso, corrección o eliminación de tus datos escribiéndonos por los canales de contacto indicados abajo.",
          "Puedes borrar los datos guardados en tu dispositivo eliminando los datos del sitio desde la configuración de tu navegador."
        ]
      },
      {
        h: "7. Contacto",
        p: ["WhatsApp {{whatsapp}} · Teléfono {{telefono}} · Instagram {{instagram}} · Ubicación {{direccion}}."]
      }
    ]
  }
};

