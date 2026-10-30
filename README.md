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


## Etapa 07 · Clientes

- Directorio con búsqueda por nombre, documento y contacto, filtro por tipo y paginación.
- Alta y edición de personas naturales o empresas con contacto y nota opcionales.
- Ficha con casos asociados mediante sus IDs, vínculo a la ficha del caso y ruta de navegación con el nombre del cliente.
- En el primer uso se crea el directorio a partir de los nombres de cliente de los casos existentes. Después, las asociaciones se administran explícitamente desde la ficha del cliente; editar el cliente no reescribe el texto de cliente de los casos.
- Datos locales en `cejpro.clients.v1`; sin base de datos ni cobros en esta etapa.
- Verificación funcional en DOM: crear, editar, buscar, vincular y desvincular, persistencia y navegación. Revisión visual en navegador pendiente.


## Etapa 08 · Cobros por cliente

- Columna de cobros en el directorio: saldo y estado de pago; abre la pestaña Cobros del cliente.
- Registro de honorarios con concepto, importe en soles, fecha, vencimiento y caso opcionales.
- Resumen de honorarios, cobrado y por cobrar dentro de una sola superficie.
- Pagos parciales o completos con fecha, medio y referencia. Estados derivados: pendiente, pago parcial, vencido o cancelado.
- Historial de pagos; cada pago se puede eliminar desde Corregir para restituir su importe al saldo. Se impiden sobrepagos e importes totales inferiores a lo ya abonado.
- Importes en céntimos enteros; almacenamiento local independiente en `cejpro.billing.v1`, sin cambiar el directorio o los casos. No emite comprobantes tributarios ni procesa pagos.
- Comprobaciones funcionales en DOM: crear y editar cobros, pagos parciales/completos, vencimientos, correcciones, sobrepagos, precisión decimal, fechas inválidas, aislamiento entre clientes y persistencia.
- Revisión visual en navegador pendiente: la política del navegador bloqueó el acceso al prototipo mediante `file://`.


### Ajuste de monedas y nota del cliente

- Cada cobro permite elegir soles (PEN) o dólares (USD). Los pagos usan la moneda del cobro y los resúmenes/directorio muestran saldos separados, sin conversiones ni sumas entre monedas.
- Los registros anteriores sin moneda se interpretan como soles, conservando sus importes y pagos. No se permite cambiar la moneda mientras existan pagos registrados.
- La nota se muestra siempre en la columna derecha del formulario de alta/edición de clientes. En pantallas pequeñas pasa debajo de los datos principales; Vincular casos conserva su desplegable.
- Verificado: migración de registros anteriores, pago parcial en USD, separación PEN/USD, edición con moneda bloqueada, persistencia y edición de nota.


## Etapa 09 · Organización y equipo

- Directorio de integrantes con búsqueda por nombre, correo, rol o área, filtros de activos/inactivos y paginación.
- Alta y edición con rol interno, contacto y nota visible a la derecha; la nota pasa debajo en móvil.
- Asignación de uno o varios casos existentes mediante sus IDs. La ficha muestra los casos asignados y permite abrirlos; varios integrantes pueden colaborar en un mismo caso.
- El estado inactivo conserva el historial y las asignaciones. Este registro no crea cuentas, envía invitaciones ni aplica permisos reales.
- Almacenamiento local independiente en `cejpro.team.v1`; sin cambios a los datos de clientes, cobros o expedientes.
- Verificado en DOM: alta/edición, asignación/desasignación, filtros, duplicados de correo, búsqueda, nota, breadcrumb, ruta inexistente, persistencia y navegación entre módulos. Revisión visual pendiente por bloqueo de `file://` en la herramienta de navegador.


## Etapa 10 · Casilla SINOE

- Una entrada con usuario/contraseña y Conectar SINOE. No muestra opciones separadas de vista previa. El envío abre la bandeja de la maqueta; no autentica contra SINOE, no realiza solicitudes externas y descarta la contraseña.
- Desvincular casilla vuelve a la entrada sin eliminar notificaciones, carpetas, notas, lectura ni configuración de la cuenta.
- Organización separada por usuario normalizado (espacios exteriores eliminados y minúsculas). Se conserva el identificador de cuenta localmente, nunca la contraseña. El vínculo se recuerda al recargar.
- Metadatos, carpetas, inicialización de ejemplos y filtros se guardan en claves locales por cuenta. Al reconectar se recuperan la carpeta seleccionada, búsqueda, filtro de lectura y página.
- Migración de la versión anterior a la primera cuenta vinculada, conservando los originales; las siguientes cuentas no heredan esa información.
- Dos notificaciones ficticias por nueva cuenta y tres PDF de ejemplo en `assets/documents/sinoe-demo/`. La maqueta conserva las carpetas personalizadas, movimientos, búsqueda, notas y enlaces a expedientes.
- Abrir una notificación no cambia su lectura; el usuario elige Marcar leída / Marcar sin leer.
- Verificado en DOM: conectar/desvincular, aislamiento entre dos cuentas, organización/lectura/notas, recuperación de filtros y carpeta, reconexión y recarga, migración y ausencia de contraseñas en almacenamiento.
- Los PDF de ejemplo fueron renderizados e inspeccionados. La revisión visual de la página sigue pendiente por bloqueo de `file://` en la herramienta de navegador. La autenticación y sincronización reales todavía requieren implementación.


### Bandeja tabular de SINOE

- Tabla con selección, icono de lectura, correlativo, N.º notificación, N.º expediente, sumilla, O.J. (órgano jurisdiccional), fecha y acceso a documentos.
- Selección individual o de todas las filas de la página y Mover a para organizar varias notificaciones juntas. La selección se limpia al cambiar de vista.
- Conserva búsqueda, filtros, carpetas, persistencia por cuenta y enlaces a la ficha y documentos. Tabla con desplazamiento horizontal en pantallas pequeñas.
- Verificado: columnas/celdas, selección parcial/todas, traslado múltiple, filtrado por carpeta, lectura, búsqueda y acceso a documentos.


## Etapa 11 · Redactar escritos

- Listado con búsqueda, filtros y paginación; editor de hoja A4 con formato (negrita, cursiva, subrayado, tachado, títulos, listas, alineación, sangría y deshacer/rehacer).
- Título, tipo, estado y expediente asociado en el panel lateral. Autoguardado local y guardado explícito; se conservan los borradores anteriores de texto plano.
- Cinco estructuras editables: Demanda, Contestación de demanda, Escrito general, Solicitud simple y Presentación de documentos. Cada elección crea un borrador nuevo y puede completar el número del expediente seleccionado; no sobreescribe el documento actual ni incorpora hechos, normas o plazos inventados.
- Las plantillas se definen en `modules/writings/templates.js` para ampliarlas sin alterar el editor.
- PDF / Imprimir prepara solo el escrito con formato y página A4; el usuario elige Guardar como PDF en el cuadro nativo de impresión. También se puede descargar el texto como .txt.
- El editor utiliza Quill 2.0.3 y DOMPurify 3.4.17, incluidos localmente con sus licencias en `assets/vendor/`. Documentación: https://quilljs.com/docs/quickstart y https://quilljs.com/docs/modules/toolbar
- Datos locales en `cejpro.writings.v1`: texto y HTML de formato admitido, sin scripts, imágenes ni estilos externos. Límite de 50 000 caracteres.
- Verificado con Quill real en DOM: plantillas, compatibilidad de texto anterior, formato, vista previa, deshacer/rehacer, límite de contenido, saneamiento HTML, preparación/limpieza de impresión, guardado al navegar y persistencia tras recarga.
- La impresión nativa, la disposición visual y el PDF final requieren revisión en navegador; la herramienta bloquea el acceso a `file://`. El módulo prepara documentos editables y no modifica un PDF existente ni presenta escritos al Poder Judicial.


### Ajuste de plantillas y borradores

- Plantillas con encabezado judicial alineado en columna, expediente, especialista legal, cuaderno, escrito, sumilla y destinatario; secciones estructurales y firma/fecha.
- Campos pendientes resaltados en rosa tenue y botón Completar campos para sustituir varias referencias de una vez, conservando formato. La operación se puede deshacer/rehacer.
- Acciones explícitas Nuevo borrador, Guardar borrador, Editar borrador y Retomar borrador. Crear desde plantilla siempre genera un nuevo registro; se mantienen los textos anteriores.
- Área de trabajo centrada con ancho máximo de 1280 px. Resaltados visibles en pantalla; el PDF impreso conserva el texto sin imprimir el fondo de los campos.
- Verificado con Quill en DOM: las cinco estructuras, resaltados, completar campos con deshacer/rehacer, crear/guardar/editar/retomar y persistencia tras recarga.


### Plantillas diferenciadas y biblioteca personal

- Los formatos incorporados tienen contenido y disposición diferentes: demanda extensa; contestación breve con hechos y pruebas numerados como la referencia del usuario; escrito general abierto; solicitud en formato carta; presentación con carátula y relación de anexos.
- El selector incluye vista previa que cambia con la elección y el expediente, para comparar las estructuras antes de crear el borrador.
- Guardar como plantilla almacena nombre, descripción, tipo y formato del borrador en la biblioteca Mis plantillas. Cada uso crea un nuevo borrador y no modifica el original.
- La opción Convertir el expediente y el cliente en campos reutilizables sustituye los datos del caso por marcadores. Al usar la plantilla con otro caso, estos marcadores se completan con el nuevo expediente/cliente; el usuario puede desactivar la conversión para conservar el texto exacto.
- Desde Guardar como plantilla también se puede elegir Actualizar una plantilla existente. Se controlan nombres duplicados y se conserva el identificador original al actualizar.
- Biblioteca local independiente en `cejpro.writingTemplates.v1`, implementada en `modules/writings/user-templates.js`. No se modifican los borradores guardados anteriormente.
- Verificado con Quill real en DOM: cinco estructuras y vistas previas diferentes, alta/uso/actualización de formato personal, sustitución de datos con espacios no separables, copia independiente, nombres duplicados y persistencia tras recarga.


### Eliminar borradores

- Papelera en el listado y Eliminar borrador dentro del editor, con confirmación que identifica el documento.
- La eliminación se aplica solo si se puede guardar el nuevo listado. Se cancela el autoguardado pendiente para evitar restaurar accidentalmente el documento eliminado.
- Las plantillas personales se conservan. Verificado: cancelar/confirmar, eliminar desde listado/editor, fallo de persistencia, último borrador y ausencia de efectos sobre plantillas.


## Etapa 12 · Contacto

- Soporte se limita al contacto directo por WhatsApp al número indicado por el usuario: +51 938 544 411.
- El enlace abre WhatsApp con un saludo breve; el usuario revisa y envía el mensaje allí. No se envían mensajes automáticamente.
- Se retiraron las guías, preguntas frecuentes y formularios de consulta de esta pantalla.

## Etapa 13 · Inicio en tarjetas

- Inicio pasa a ser la pantalla predeterminada al abrir el archivo sin ruta.
- Cuatro tarjetas grandes: calendario/agenda del día, expedientes para continuar, notificaciones de la casilla vinculada y últimos borradores.
- Calendario mensual con navegación, selección de fecha y accesos a la agenda, detalle de evento y creación de un compromiso para el día elegido.
- Los casos visitados se recuerdan en `cejpro.recentCases.v1`; si no existe historial se muestran casos del archivo. Los escritos se ordenan por su última modificación.
- El resumen SINOE solo lee datos de la cuenta vinculada y no cambia el estado de lectura. Si no hay vínculo, se ofrece Conectar casilla.
- Los resúmenes se cargan desde los datos de los módulos al volver a Inicio, sin duplicar notificaciones o borradores ni alterar los datos originales.
- Rutas añadidas al calendario: `#calendario/dia/AAAA-MM-DD`, `#calendario/nuevo/AAAA-MM-DD` y `#calendario/evento/ID`.
- Estados vacíos con accesos a cada módulo y adaptación a los tres temas y pantallas pequeñas.
- Verificado en DOM: Inicio predeterminado, cuatro tarjetas, mes/fecha, agenda, eventos/alta, historial de casos, orden de borradores, actualización de lectura, ocultación de notificaciones al desvincular y estados vacíos. Revisión visual en navegador pendiente por bloqueo de `file://` en la herramienta.
- Soporte, Perfil y Configuración quedan pendientes de trabajo adicional por indicación del usuario.


## Identidades CEJ · Prototipo local

- Navegación: Expedientes → Mis expedientes / Identidades CEJ. El botón superior abre el mismo gestor (`#identidades`).
- Identidades de prueba con alias, DNI o carné de extranjería y campos de validación según tipo. DNI admite código de 1 a 3 dígitos. Búsqueda, filtro por documento, edición, expedientes vinculados y eliminación con comprobación de vínculos.
- Cada expediente guarda solo `identityId` opcional; una identidad puede reutilizarse en varios expedientes. Los registros anteriores no necesitan migración y conservan su cliente, carpeta, documentos y notas.
- Crear una identidad desde el formulario de un expediente conserva el borrador y selecciona la identidad nueva. La parte o cliente sigue siendo un dato independiente.
- Almacenamiento: `cejpro.identities.v1` en el navegador. Usar datos ficticios: no hay sincronización con CEJ o la extensión, ni validación oficial de documentos, ni registro de consultas o último uso.
- Verificado funcionalmente con DOM: alta DNI/CE, duplicados, campos condicionales, selección y reutilización, bloqueo de eliminación con vínculos, reasignación, eliminación libre, persistencia, búsqueda y submenú en escenarios móviles/compactos y los tres temas. La revisión visual real de `file://` sigue pendiente por la restricción de la herramienta de navegador.
