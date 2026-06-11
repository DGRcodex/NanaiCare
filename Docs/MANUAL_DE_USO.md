# Manual de Administración - NanaiCare

Este documento explica cómo administrar las dos plataformas externas que dan vida al Blog y al Sistema de Citas de NanaiCare: **Sanity.io** y **Cal.com**.

---

## 1. El Blog (Nanai Rituals) - Administrado por Sanity.io

El blog es una herramienta poderosa para mejorar el SEO y mantener a los clientes informados. Todo el contenido del blog se administra sin necesidad de tocar el código de la web.

### ¿Cómo publicar o editar un artículo?
1. Ingresa a **[www.nanaicare.com/studio](https://www.nanaicare.com/studio)**.
2. Inicia sesión con la cuenta de administrador.
3. En el panel izquierdo verás la sección **"Post"** (Artículos).
4. Haz clic en el ícono de lápiz o en **"+ New"** para crear un nuevo artículo.
5. Rellena los campos:
   - **Title**: El título de tu publicación.
   - **Slug**: Haz clic en "Generate" para que se cree un enlace amigable (ej: `tu-titulo-aqui`).
   - **Main image**: Sube la imagen principal que se verá en la portada del blog.
   - **Published at**: Pon la fecha actual o programa una fecha pasada/futura.
   - **Body**: Escribe el contenido completo del artículo usando el editor visual.
6. Haz clic en el botón verde **"Publish"** abajo a la derecha.

¡Listo! El artículo aparecerá instantáneamente en `nanaicare.com/blog`.

---

## 2. El Sistema de Reservas - Administrado por Cal.com

El sistema de agendamiento de NanaiCare funciona incrustando tu cuenta de Cal.com (`nanai-care-tuxi4k`) directamente en la página web.

### ¿Cómo agregar nuevos tratamientos o cambiar los horarios?
1. Inicia sesión en tu cuenta de **[Cal.com](https://cal.com)**.
2. Ve a la pestaña **"Event types"** (Tipos de evento).
3. Todo evento que crees aquí (y que tenga el interruptor encendido) aparecerá automáticamente en la página web de `nanaicare.com/book`. No tienes que pedirle al programador que actualice nada.
4. Para ocultar un tratamiento que ya no ofreces, simplemente apaga el interruptor en Cal.com, y desaparecerá de la web al instante.

### ¿Cómo configurar los correos de confirmación?
Los correos que reciben los clientes (y los que recibe la clínica) se manejan exclusivamente desde Cal.com.

1. Dentro de Cal.com, ve a la sección **"Workflows"** (Flujos de trabajo) en el menú lateral.
2. Haz clic en **"+ New Workflow"**.
3. Selecciona qué quieres que pase. Ejemplo: *"When a new booking is created -> Send Email to Organizer"*.
4. Asegúrate de configurar los correos de los dueños (`nanaicareadmin@gmail.com` y `nicol.bernardi@nanaicare.com`) en la configuración de la cuenta (en la sección **Settings -> Profile** o asignándolos como "Team members" si tienes una cuenta de equipo).
5. También puedes configurar recordatorios SMS o de correo 24 horas antes de la cita desde este mismo panel de Workflows.

---

*Nota: La página web es solo la "cara" pública. Todo el cerebro de la base de datos (textos del blog y calendario de citas) vive de forma segura en las nubes de Sanity y Cal.com respectivamente.*
