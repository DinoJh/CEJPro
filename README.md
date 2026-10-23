# CEJ PRO — Etapa 01

Esqueleto navegable del sistema de gestión. HTML, CSS y JavaScript sin dependencias ni compilación.

## Abrir

Abrir `index.html` en Chrome. Opcionalmente, servir esta carpeta con `python -m http.server 8076` y visitar http://localhost:8076.

## Estructura

- `index.html`: estructura común de la aplicación.
- `assets/images/`: logo proporcionado.
- `assets/css/base.css`: colores, tipografía y reglas compartidas.
- `assets/css/layout.css`: distribución y adaptación a móvil.
- `assets/css/components.css`: navegación, cuenta y estados vacíos.
- `assets/js/icons.js`: iconos SVG locales.
- `assets/js/app.js`: navegación, menú lateral y cuenta.
- `modules/navigation.js`: catálogo de módulos y textos de sus pantallas.

## Alcance de esta versión

Inicio, seis módulos seleccionados, soporte, perfil y configuración con estados vacíos. Menú lateral contraíble en escritorio y desplegable en móvil. Navegación por hash compatible con Atrás/Adelante y enlaces directos.

Los módulos no están implementados: no hay datos reales, cuentas, consultas CEJ, acceso SINOE ni integraciones. La identidad TU y el espacio personal son marcadores de diseño. Transcripciones y portales futuros no se incluyen en esta etapa.

## Revisar

- Recorrer todos los módulos, soporte y el menú de cuenta.
- Contraer y expandir la barra; probar Atrás y Adelante.
- Probar 390 px, 768 px y escritorio; usar Tab y Escape.
- Verificar que el contenido conserve su ancho máximo en pantallas grandes.

## Próximas versiones

Conservar esta carpeta como versión 01. El usuario administra las versiones en GitHub. Construir y revisar un módulo por vez sobre la estructura compartida.

## Personalizar

En Tu cuenta → Personalizar puedes elegir Elegante (predeterminado), Claro u Oscuro. La preferencia se guarda localmente con la clave `cejpro.theme`. Si el navegador bloquea el almacenamiento, el cambio funciona durante la visita y se muestra un aviso. No se envían preferencias a ningún servidor.

Los archivos `assets/css/themes.css`, `assets/js/theme-init.js` y `assets/js/personalization.js` concentran la apariencia y su selector.
