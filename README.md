# CEJ PRO — Versión 02 Calendario y plazos

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
