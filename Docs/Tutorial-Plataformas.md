# Guía Maestra de Plataformas: NanaiCare

Este documento contiene los tutoriales e instrucciones paso a paso para configurar las plataformas clave del ecosistema digital de NanaiCare: Stripe (Pagos), Cal.com (Reservas), Sanity (Contenido) y Correo Electrónico.

---

## 1. Configuración de Stripe (Pagos y Depósitos)

Stripe es el motor que procesará el 50% de depósito de las reservas y el cobro de las suscripciones.

### ¿Qué poner si la empresa aún no está creada formalmente?
Stripe es estricto con la verificación legal (KYC). Si la empresa **aún no está registrada legalmente** en la Cámara de Comercio (KVK en Países Bajos), **NO debes registrarte como una empresa (BV o similar)**.
- **Lo correcto ahora:** Elige el tipo de empresa **"Persona Física" (Individual/Sole Proprietorship)** o **"Eenmanszaak"**. Stripe te pedirá tu nombre completo, dirección, cuenta bancaria personal (o la cuenta de ABN AMRO) y un documento de identidad. 
- **¿Se puede cambiar después?** **SÍ.** Una vez que la empresa esté constituida legalmente (por ejemplo, si creas una *BV* o registras tu *eenmanszaak* con número KVK definitivo), puedes contactar al soporte de Stripe o ir a la configuración de la cuenta y actualizar la entidad legal. Ellos te pedirán los nuevos documentos de la empresa y harán el cambio.
- **Si eliges empresa ahora sin tener los papeles:** Stripe te bloqueará la cuenta en un par de días porque no podrás subir los documentos de constitución comercial que te van a exigir.

### Pasos para Activar Stripe:
1. Ve a "Activar Cuenta" en tu panel de Stripe.
2. País: Países Bajos.
3. Estructura: *Eenmanszaak* (si eres autónoma) o *Individual*.
4. Rellena tus datos personales y añade el IBAN de ABN AMRO para recibir los pagos.
5. Sube tu ID (Pasaporte o DNI) si te lo pide.

---

## 2. Configuración de Cal.com (Sistema de Reservas)

Cal.com será la plataforma donde los clientes elegirán el horario y pagarán el depósito.

### Paso 1: Configurar el Evento
1. Crea una cuenta en Cal.com usando el correo de la clínica.
2. Ve a **"Event Types"** (Tipos de evento) y crea los eventos (ej. "Sensitive Nanai Care - 60 min").
3. Configura la duración, el precio total y la disponibilidad de horarios.

### Paso 2: Conectar Stripe a Cal.com
1. En tu panel de Cal.com, ve a **Apps**.
2. Busca la aplicación **"Stripe"** y haz clic en "Install".
3. Cal.com te redirigirá a Stripe. Te pedirá que inicies sesión en la cuenta que activamos en el punto 1.
4. Autoriza la conexión.
5. Vuelve a tus **Event Types** en Cal.com, entra al evento que creaste, ve a la pestaña **"Advanced" o "Apps"**, activa la opción de cobrar ("Collect Payment") y configúralo para que cobre **solo el 50%** del costo total de la sesión a modo de depósito.

---

## 3. Configuración de Correo Electrónico (contact@nanaicare.com)

Para enviar y recibir correos profesionales usando el dominio de la página, necesitas un proveedor de correo profesional.

### Opción Recomendada: Google Workspace
1. Ve a [workspace.google.com](https://workspace.google.com/).
2. Haz clic en "Empezar" y selecciona que ya tienes un dominio (`nanaicare.com`).
3. Sigue los pasos para crear el usuario `contact@nanaicare.com`.
4. Google te pedirá que verifiques que eres dueño del dominio. Para esto, tendrás que entrar a donde compraste el dominio (Hostinger, GoDaddy, Namecheap, etc.) y añadir unos registros TXT y MX en la configuración de DNS (Google te da los códigos exactos).
5. Una vez verificados los DNS, podrás usar Gmail para entrar a `contact@nanaicare.com`.

---

## 4. Gestión de Contenidos (Sanity)

Sanity es la base de datos donde manejas los textos dinámicos, como las reseñas (Testimonials) de los clientes.

### Publicar una nueva Reseña (Testimonio)
1. Entra a tu panel de Sanity (normalmente en `localhost:3333` en desarrollo, o en el link de producción que te daremos).
2. En el menú, busca el apartado **"Testimonial"**.
3. Ahí verás los comentarios que han dejado los clientes desde la página web. Aparecerán como "Borradores" o sin el tick de publicado.
4. Haz clic en el comentario, revísalo (puedes corregir la ortografía si lo deseas).
5. Marca la casilla **"Approved for Web"** (Aprobado para la web).
6. Haz clic en el botón verde **"Publish"** (Publicar). Inmediatamente, la reseña será visible en la página web principal.
