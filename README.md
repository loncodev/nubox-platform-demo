# Prototipo Plataforma Nubox — Business Case (no oficial)

Prototipo estático e independiente presentado como ejercicio de entrevista. **No está asociado ni respaldado por Nubox.** Datos y empresas ficticios.

## Ejecución

Abrir `index.html` en cualquier navegador moderno. No necesita backend ni credenciales.

## Demo

- Seleccionar **Simular ingreso** con el correo ficticio precargado.
- Código de segundo factor simulado: **482915**.
- Aceptar las casillas de documentos simulados.
- Explorar el selector de empresas y el acceso unificado a productos.
- Reiniciar y seleccionar **Antes ingresaba con RUT** para el flujo alternativo.

## Seguridad y alcance

No captura contraseñas, no emite solicitudes a sistemas externos ni guarda datos de usuarios. Todos los flujos de autenticación, consentimiento y acceso son ficticios; los mecanismos de seguridad definitivos tendrían que ser aprobados por el área responsable.

## Navegación y alcance (octubre 2026)

**Primer proyecto del business case: acceso unificado + MFA.**
- Login por correo y transición desde RUT
- Verificación MFA, dispositivo confiable y acceso a empresa/producto
- Seguridad de cuenta, cambio de contraseña con revalidación de código y sesiones simuladas

**Visión futura de Plataforma Nubox: fuera del compromiso P0.**
- Catálogo de planes con selección de producto no contratado y alta simulada
- Consulta de suscripción y productos por empresa
- Historial ficticio de facturación y pagos, detalle de documento y cambio de método de prueba
- Usuarios y accesos por empresa: invitación, rol básico y desactivación ficticias

Todas las vistas son **simulaciones en memoria sin backend**; reiniciar/recargar puede restablecer su estado. No se emiten facturas, no se envían invitaciones, no se cobra ni se contratan servicios. **No ingresar contraseñas, tarjetas ni información personal real**. Las capacidades de catálogo, cobro, precios y roles requieren definición de Revenue, Finanzas, Seguridad e Ingeniería.
