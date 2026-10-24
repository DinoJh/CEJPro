# CEJ PRO — Ficha de caso y organización del trabajo

Prototipo local en HTML, CSS y JavaScript, sin compilación ni base de datos. Los registros iniciales son ficticios. Se conservan los temas Elegante, Claro y Oscuro.

## Abrir

Abre `index.html` en Chrome o ejecuta dentro de esta carpeta `python -m http.server 8077` y visita http://localhost:8077. El calendario es la pantalla inicial.

Para revisar la ficha, entra a Casos y expedientes y haz clic en la fila, el título o el enlace Abrir de un caso. Las direcciones usan `#expedientes/ID/resumen`, `documentos`, `partes`, `notas` o `agenda`; admiten enlaces directos y Atrás/Adelante.

## Calendario y plazos

Vista mensual y agenda, filtros por tipo y formulario de eventos. Título, tipo, fecha, hora y enlace son visibles; expediente, cliente y notas están dentro de Adicionales. Los eventos se registran manualmente y se guardan localmente. No hay cálculo de plazos judiciales, correos ni sincronización con Google Calendar.

## Casos y carpetas del listado

Búsqueda por caso, expediente o cliente; filtro por estado, paginación y carpetas. Nueva carpeta permite crear más carpetas con nombres únicos. Puedes registrar y editar casos y moverlos eligiendo otra carpeta.

Nuevo caso y Editar caso muestran los datos principales a la izquierda y una nota y archivos opcionales a la derecha. En móvil se apilan. Los adjuntos se agregan al guardar; cancelar no agrega referencias. Puedes incorporarlos después al editar o dentro de la ficha.

## Ficha de cada caso

- **Resumen:** información general, cliente, estado, carpeta del listado y accesos a documentos, partes y nota.
- **Documentos:** carpetas internas de ese caso, selección múltiple o arrastre de archivos y cambio de carpeta de cada documento. Las carpetas internas son independientes de las carpetas del listado. Los archivos anteriores aparecen en Sin carpeta.
- **Partes:** alta y edición de personas u organizaciones, su rol dentro del caso y documento/contacto opcionales. Cada caso conserva sus propios involucrados; no se crean clientes automáticamente.
- **Notas:** edición de la nota de trabajo, sincronizada con el listado y el formulario del caso.

Los documentos son referencias visuales: solo se guardan nombres, tamaños y ubicación, no el contenido. No hay subida al servidor ni descarga/recuperación del original desde este prototipo. No hay IA, vigilancia, acceso al CEJ o SINOE. Los eventos creados dentro de un caso se vinculan por su identificador a Calendario y plazos.

## Organización del código

`assets/` contiene el estilo común, navegación, temas e imágenes. `modules/navigation.js` declara los módulos.

`modules/calendar/` contiene datos, vistas y estilos del calendario.

`modules/cases/` contiene `data.js` y `cases.js` para el listado, `files.js` para referencias de adjuntos, y `detail-data.js`, `detail.js` y `detail.css` para partes, carpetas internas y ficha. `cases.css` define listado y formularios.

## Datos y compatibilidad

Se guardan en este navegador: `cejpro.theme` (tema), `cejpro.v02.calendar` (eventos), `cejpro.cases.v1` (casos y carpetas externas), `cejpro.files.preview.v1` (referencias de archivos) y `cejpro.caseDetails.v1` (partes y carpetas internas). Abrir por archivo y por servidor utiliza almacenes diferentes.

Las notas y archivos previos asociados a casos siguen siendo compatibles. Las referencias antiguas sin caso permanecen en almacenamiento, sin asignarse a uno de forma automática. Si el almacenamiento está bloqueado, los cambios funcionan durante la visita y se muestra un aviso.

## Carpeta fija y respaldos

Esta es la carpeta fija de trabajo y conserva el repositorio Git. Antes de una etapa nueva se guarda una copia fuera del repositorio en `../respaldos-cejpro/`, excluyendo `.git`, dependencias y cachés. El usuario administra los commits y la subida a GitHub.

## Verificación

Se han probado las interacciones en un DOM simulado: búsqueda, filtros, carpetas, casos, notas, adjuntos opcionales, rutas, carpetas internas, partes, aislamiento por caso, persistencia y regresión del calendario y temas. La revisión visual y de dimensiones en un navegador real está pendiente cuando el control de Chrome vuelva a estar disponible.

## Menú interno y agenda del caso

Resumen, Documentos, Partes, Notas y Agenda se navegan desde una barra lateral a la izquierda dentro de la ficha. En móvil se dispone como un menú compacto encima del contenido.

Agenda permite crear, editar, completar y eliminar eventos vinculados a este caso. Se muestran también en el calendario general, con la misma clave de almacenamiento `cejpro.v02.calendar`, sin duplicarlos. Editar o eliminar desde el calendario se refleja al volver a la agenda del caso. Los eventos antiguos sin `caseId` se mantienen como eventos generales; no se vinculan por coincidencias de texto.

El formulario mantiene título, tipo, fecha, hora y enlace; notas y completado están en Adicionales. El vínculo al caso se asigna automáticamente. Los plazos y recordatorios siguen siendo manuales; no hay notificaciones externas.
