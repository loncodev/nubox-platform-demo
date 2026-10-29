# Prototipo Plataforma Nubox — Business Case

Prototipo estático e independiente presentado como ejercicio de entrevista. **No está asociado ni respaldado por Nubox.** Datos y empresas ficticios.

## Ejecución

Abrir `index.html` en cualquier navegador moderno. No necesita backend ni credenciales.

## Recorridos disponibles

- **Inicio:** «Ingresar con passkey», «Ingresar con correo» o «Ingresar con RUT».
- **Ingreso con RUT (cuenta pendiente de actualización):** RUT y campo de contraseña precompletado, sin capturar contraseñas reales → si tiene TOTP, verificar el código; de lo contrario, entrar directamente a la plataforma. No se pregunta si desea migrar durante el ingreso.
- **Actualización opcional:** después de ingresar por RUT, ir a **Seguridad → Actualizar mi acceso** → verificar correo individual → confirmar titularidad → configurar passkey o TOTP si todavía no tiene un método. Una vez actualizada la cuenta, el ingreso por RUT queda inhabilitado para ese usuario.
- **Correo compartido:** desde la actualización en Seguridad, elegir un correo individual y completar las verificaciones; nunca se fusionan cuentas basándose solo en el correo.
- **Primera entrada con correo:** elegir passkey o aplicación autenticadora (TOTP) si todavía no tiene un método → entrar a Plataforma Nubox **sin pantalla obligatoria de términos y condiciones**.
- **Ingreso habitual:** con passkey, entrar sin escribir RUT o correo; con correo y TOTP, verificar el código. Se pueden gestionar ambos métodos desde **Seguridad**.
- **Cambio de correo y contraseña:** se muestran verificaciones de seguridad con los métodos configurados, preservando empresas y permisos.
- **Ayuda y recuperación:** opciones para correo inaccesible, pérdida del autenticador y recuperación asistida.
- **Otras vistas:** catálogo, suscripciones, facturas y usuarios por empresa como contenido de navegación ilustrativo.

## Seguridad y alcance

La interfaz permite recorrer alta e ingreso con passkey y TOTP, pero **NO implementa WebAuthn ni genera/valida códigos TOTP reales**. No hay servidor, emisión de desafíos, almacenamiento seguro de credenciales, verificación criptográfica ni autenticación verdadera. «Confirmar passkey» únicamente avanza una secuencia de navegación; **no registra una llave real ni invoca un autenticador del sistema**. El código TOTP `482915` es fijo. Para llevarlos a producción hacen falta un servicio de identidad con verificación del lado del servidor, un flujo de inscripción y recuperación seguro, y revisión de Seguridad.

No captures contraseñas, datos bancarios ni información personal real en el prototipo. Los estados de inicio, facturación y permisos solo se modifican en memoria; ninguna acción altera cuentas Nubox.

## Navegación y alcance (octubre 2026)

**Primer proyecto del business case: migración de RUT a correo único verificado + MFA, reutilizando autenticación y Perfilamento.**
- Login por passkey, correo o RUT durante la transición
- Alta de passkey o TOTP como métodos alternativos y acceso a empresa/producto
- Seguridad de cuenta, cambio de contraseña con revalidación de código y sesiones simuladas

**Visión futura de Plataforma Nubox: fuera del compromiso P0.**
- Catálogo de planes con selección de producto no contratado y alta simulada
- Consulta de suscripción y productos por empresa
- Historial ficticio de facturación y pagos, detalle de documento y cambio de método de prueba
- Usuarios y accesos por empresa: invitación, rol básico y desactivación ficticias

Todas las vistas son **simulaciones en memoria sin backend**; reiniciar/recargar puede restablecer su estado. No se emiten facturas, no se envían invitaciones, no se cobra ni se contratan servicios. **No ingresar contraseñas, tarjetas ni información personal real**. Las capacidades de catálogo, cobro, precios y roles requieren definición de Revenue, Finanzas, Seguridad e Ingeniería.

## Hipótesis y validación

**Escenario arquitectónico aportado para la iteración:** Nubox dispone de una base de autenticación compartida con `id de usuario`, RUT único y correo sin restricción de unicidad. Perfilamento ya gobierna los permisos de acceso a los cinco sistemas; no se plantea reconstruir esa integración. **Diferencia importante:** el brief original declara cinco bases de usuarios separadas. Esta hipótesis debe comprobarse con Ingeniería en semana 2, incluyendo las referencias de los productos al RUT, sesiones y tokens.

**Estrategia:** análisis masivo de calidad y duplicados, sin mutación automática de identidades; vinculación paulatina usuario por usuario tras confirmar titularidad anterior, correo único de ingreso y MFA. El correo de contacto puede continuar compartido; no se impone `UNIQUE` sobre una columna legada sin análisis. El calendario de retirada de RUT se establece por cohortes y solo cuando exista recuperación segura.

El brief no define plazos oficiales, mecanismo final de MFA ni procedimientos de recuperación. La fecha de corte, uso de aplicación autenticadora, confianza durante 30 días, revocación de sesiones y canales alternativos se presentan como **propuestas sujetas a validación de Seguridad, Legal, Ingeniería, Soporte y los equipos de producto**. El código de verificación de correo se mantiene separado del segundo factor de autenticación independiente. Una contraseña cambiada en el proveedor de correo no cambia la contraseña de Nubox.

Indicadores propuestos para el piloto: porcentaje de cuentas con correo comprobado, tasa de activación de MFA, inicio de sesión exitoso, abandono durante onboarding, usuarios bloqueados, contactos recuperados y tickets de acceso por cohorte. Definir metas solo después de medir la línea base y el piloto.
