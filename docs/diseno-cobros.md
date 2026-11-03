# Cobros: cliente → expediente → movimientos

## Flujo vigente
1. Seleccionar un cliente desde Cobros.
2. Elegir un expediente en la barra lateral o Sin expediente para servicios generales.
3. Consultar un único historial de cobros y pagos de esa selección.

Los filtros plegables permiten mostrar todos los movimientos, solo cobros o solo pagos, y elegir moneda. El buscador encuentra conceptos, medios y referencias. Los dos botones de registro están encima del listado; cobrar usa rojo vino y registrar pagos usa verde. Las filas solo permiten editar o eliminar. El saldo por cobrar aparece en rojo y los pagos recibidos en verde, acompañados siempre por etiquetas para no depender solo del color.

## Reglas
- No se exige un expediente para gestionar cobros de un cliente.
- Registrar cobro crea la deuda por un servicio. Registrar pago aplica un abono a un cobro pendiente de la selección actual.
- Soles y dólares se consultan por separado; no se convierten ni se suman monedas diferentes.
- Los pagos pueden ser parciales. Un pago no puede exceder el saldo; al editarlo se considera su importe anterior.
- No se permite reducir un cobro por debajo del importe ya pagado ni cambiar su moneda si tiene pagos.
- Eliminar un pago restaura el saldo correspondiente. Eliminar un cobro requiere confirmación e indica si también se eliminarán pagos asociados.
- Los registros existentes se conservan y permanecen aislados por espacio. El lector solo puede consultar.

## Referencias de la exploración inicial
- FreshBooks: https://support.freshbooks.com/hc/en-us/articles/115015407988-How-do-I-use-my-dashboard
- FreshBooks: https://support.freshbooks.com/hc/en-us/articles/216631328-How-do-I-create-an-invoice
- Xero: https://central.xero.com/s/article/Sales-dashboard

La revisión actual simplifica la propuesta inicial según la referencia y el flujo solicitado por el usuario. Es un registro local de honorarios y pagos, no una emisión de comprobantes tributarios.
