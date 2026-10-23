# CEJ PRO — Etapa 03 Listado de casos y carpetas

Prototipo local de diseño e interacción con datos ficticios. Conserva la versión 01 y sus tres temas.

## Abrir

Abre `index.html` en Chrome. Se abre Calendario y plazos por defecto. También puedes servir esta carpeta con `python -m http.server 8077` y visitar http://localhost:8077/#calendario.

## Qué puedes probar

- Cambiar de mes, volver a Hoy y seleccionar un día.
- Alternar Mes / Agenda y filtrar audiencias, plazos, reuniones y diligencias.
- Consultar la agenda del día y próximos compromisos.
- Crear un evento, abrirlo, editarlo, marcarlo completado o eliminarlo.
- Formulario compacto con título, tipo, fecha, hora y enlace.
- Desplegar Adicionales para expediente, cliente y notas; cerrado al abrir el formulario.
- Al editar, la opción de completado está también dentro de Adicionales.
- Recargar: los cambios se conservan en el navegador cuando permite almacenamiento local.
- Cambiar entre Elegante, Claro y Oscuro desde Tu cuenta → Personalizar.

Las fechas de los ejemplos son relativas al primer uso. Los eventos no provienen del CEJ ni SINOE. No hay acceso a Google Calendar, correos, recordatorios ni cálculo automático de plazos judiciales. Casos y clientes son texto libre hasta implementar esos módulos. La agenda no se sincroniza entre equipos. Los otros módulos siguen vacíos.

## Organización

`modules/calendar/` contiene los archivos `data.js` (ejemplos y almacenamiento), `calendar.js` (vistas y editor), y `calendar.css` (estilos).

`assets/css/`, `assets/js/`, `assets/images/` y `modules/navigation.js` conservan la estructura compartida de la versión 01.

## Almacenamiento

Eventos: `cejpro.v02.calendar`. Tema compartido: `cejpro.theme`. Si el almacenamiento está bloqueado, se informa y los eventos sobreviven solo durante la visita. Para volver a los ejemplos se puede borrar únicamente `cejpro.v02.calendar` desde las herramientas del navegador. Abrir por archivo y por servidor usa almacenes diferentes.

## Validación manual

Comprobar navegación de meses y cambio de año, filtros vacíos, agenda sin eventos, creación/edición/eliminación, persistencia al recargar, escape del cuadro, títulos largos, los tres temas y móvil a 390 px. La fecha de vencimiento siempre la indica el usuario.

## Carpeta fija y respaldos

Este directorio es la carpeta fija de trabajo para las siguientes etapas. El repositorio Git permanece aquí. Las próximas mejoras se aplicarán sobre estos archivos, sin crear otra carpeta de trabajo por versión.

Antes de una etapa nueva, guardar una copia del código en `../respaldos-cejpro/` con nombre de versión y fecha. Los respaldos se guardan fuera del repositorio de trabajo y no duplican `.git`.

El usuario administra los commits y la subida a GitHub.

## Etapa 03 Casos y expedientes

Entra a Casos y expedientes desde el sidebar o agrega `#expedientes` a la dirección. El calendario sigue siendo la pantalla predeterminada.

Incluye listado paginado, búsqueda por título/expediente/cliente sin distinguir mayúsculas o tildes, filtro por estado, carpetas con contadores y vista Sin carpeta. Los contadores de carpetas reflejan todos sus casos; el contador del listado sí aplica búsqueda y estado.

Puedes crear carpetas con nombre único, registrar un caso, editar sus datos y moverlo cambiando su carpeta desde el botón de tres puntos. El título del caso es obligatorio; expediente y cliente son opcionales. Los números DEMO son referencias ficticias.

Los archivos están en `modules/cases/`: `data.js`, `cases.js` y `cases.css`. Los datos se guardan en la clave local `cejpro.cases.v1`; la agenda y su almacenamiento no cambian. No se duplica el repositorio Git ni se publican cambios.

La ficha detallada y la selección de casos desde el calendario quedan para otra etapa. Las notas y la vista previa de archivos se describen más abajo. No hay consultas al CEJ ni SINOE, ni clientes reales. Si el navegador bloquea almacenamiento, los cambios duran durante la visita y se muestra un aviso.

## Carpetas y archivos opcionales por caso

Nueva carpeta permanece visible encima de las carpetas. No hay botón de subida ni pestaña de archivos en la pantalla principal.

Para agregar archivos: Nuevo caso → columna derecha → Seleccionar archivos. Es opcional y también está disponible al editar un caso ya creado. Los archivos seleccionados se asocian al caso solo al pulsar Guardar caso; cancelar no agrega referencias. Al editar se muestran las referencias ya guardadas y se pueden agregar más. Mover el caso actualiza también la carpeta de sus referencias.

Solo se guardan nombre, tamaño, tipo, caso y carpeta en `cejpro.files.preview.v1`. El contenido no se copia ni se envía a un servidor. Las antiguas referencias sin caso de la demostración anterior se conservan en almacenamiento sin asignarlas automáticamente a otro caso.

## Notas por caso

En Nuevo caso o Editar caso, usar Agregar nota (opcional) en la columna derecha para escribir una nota (hasta 2000 caracteres). Al guardar aparece un resumen de dos líneas en el listado. Ver nota abre la edición para consultar y modificar el texto completo en la columna derecha. Las notas usan el almacenamiento local de los casos; los registros guardados antes de esta mejora siguen siendo compatibles.

El formulario de caso distribuye los datos principales a la izquierda y la nota y los archivos opcionales a la derecha. En móvil se apilan en una columna.
