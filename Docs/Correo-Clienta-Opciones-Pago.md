# Borrador de Correo para Nicol (Opciones de Pago y Precios)

**Asunto:** Avances de la web y decisiones importantes sobre los cobros (NanaiCare)

Hola Nicol,

¡Espero que estés muy bien! 

Te escribo para contarte que estamos avanzando súper rápido con el desarrollo de la página web de NanaiCare. Ya tenemos integrado el diseño, el sistema de reseñas y tenemos lista la conexión con el calendario de reservas (Cal.com).

Sin embargo, hemos llegado a un punto donde necesitamos tomar una decisión sobre **cómo vamos a procesar el cobro del 50% de depósito** para las citas. Esto depende enteramente de si ya tienes tu actividad registrada legalmente en los Países Bajos (es decir, si ya tienes un número KVK de la Cámara de Comercio).

Te presento las dos opciones que tenemos para que nos digas cómo prefieres que lo implementemos:

### Opción 1: Flujo Manual por Transferencia o Tikkie (Ideal si AÚN NO tienes KVK)
Si todavía estás operando sin un registro formal de empresa, las pasarelas de pago nos van a bloquear la cuenta. Para solucionar esto y salir a producción ya mismo, podemos hacer lo siguiente:
1. El cliente reserva su cita en la web y la cita queda en estado "Pendiente".
2. El sistema (o tú directamente por WhatsApp) le envía al cliente un enlace de **Tikkie** o los datos de tu cuenta bancaria (IBAN) solicitando el pago del 50% para confirmar la reserva.
3. Una vez que tú ves reflejado el dinero en tu cuenta de ABN AMRO, entras a tu calendario y le das a "Aprobar cita".
*Ventaja:* El dinero te llega íntegro sin comisiones de pasarelas, y no requiere ningún papeleo legal por ahora.

### Opción 2: Cobro Automático con Stripe (Requiere número KVK)
Si ya tienes (o vas a sacar pronto) tu registro como empresa unipersonal (*Eenmanszaak*), podemos automatizar todo el proceso:
1. El cliente selecciona su tratamiento, elige la fecha y, en ese mismo momento, paga el 50% mediante tarjeta o iDEAL directamente en la web.
2. La cita se confirma automáticamente y Stripe envía el dinero a tu cuenta bancaria.
*El requisito:* Al momento de activar la cuenta, Stripe nos va a exigir ingresar tu número de KVK y subir documentos de identidad. Si ponemos que eres empresa y no tenemos el KVK, nos bloquearán los fondos.

**¿Qué necesitamos de tu parte para continuar?**
1. Confírmanos si prefieres empezar con la **Opción 1** (Manual/Tikkie) o si ya tienes tu KVK para avanzar con la **Opción 2** (Stripe). *(Nota: Siempre podemos empezar con la Opción 1 y pasarnos a Stripe en un par de meses cuando legalices la empresa).*
2. **Los precios:** Necesitamos la lista con los **precios exactos (en €)** de cada tratamiento y de los paquetes/membresías para poder configurarlos en el sistema de reservas.

Quedamos a la espera de tus comentarios para dejar todo esto configurado y listo para lanzar.

¡Un abrazo!
