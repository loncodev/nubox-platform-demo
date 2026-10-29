# Prototipo Plataforma Nubox — Business Case

Prototipo estático e independiente presentado como ejercicio de entrevista. **No está asociado ni respaldado por Nubox.** Datos y empresas ficticios.

## Ejecución

Abrir `index.html` en cualquier navegador moderno. No necesita backend ni credenciales.

## Recorridos disponibles

- **Pantalla inicial:** «Ingresar con passkey», «Ingresar con correo» o «Ingresar con RUT». La opción de RUT sigue disponible mientras el usuario actualiza su cuenta.
- **Primera entrada:** «Ingresar con correo» o «Ingresar con RUT» → «Protege tu cuenta» → elegir **passkey** o **aplicación autenticadora (TOTP)** → consentimientos → plataforma. Con TOTP se introduce el código guiado **482915**. Con passkey se sigue una confirmación de interfaz, sin activar credenciales de dispositivo.
- **Acceso habitual:** cerrar sesión y regresar con passkey directamente, sin escribir identificador, o con correo y TOTP. Si ambos métodos están configurados se muestra un selector. El registro y estado de los métodos se conservan durante la sesión del navegador, no en servidores.
- **Migración RUT:** «Ingresar con RUT» → escribir RUT → «Actualizar mi acceso» → verificar correo con código **482915** → confirmar titularidad de la cuenta anterior → elegir passkey o TOTP. Se conservan empresas y permisos.
- **Correo compartido:** «Ingresar con RUT» → «Actualizar mi acceso» → «¿Tu correo está compartido?» → continuar → elegir otro correo y completar las verificaciones. No se fusionan cuentas.
- **Cambiar contraseña Nubox:** «Seguridad» → «Cambiar contraseña» → revalidación ficticia MFA → confirmación y revocación simulada de sesiones.
- **Cambiar correo:** «Seguridad» → «Cambiar correo de ingreso» → código ficticio MFA **482915** → verificación del nuevo correo con código **742618** → confirmación. Conserva identidad, empresas y autorizaciones.
- **Excepciones:** «Recuperar acceso» permite mostrar los escenarios de correo inaccesible, dispositivo MFA perdido y contraseña Nubox olvidada. Su tratamiento propone verificación asistida; no simula accesos sin validar la identidad.
- **Visión futura:** catálogo y contratación simulada, suscripciones, documentos de cobro y usuarios por empresa. Dentro de **Usuarios y accesos**, cada perfil muestra nombre, correo, rol, estado y empresa. Las opciones de restablecer contraseña y solicitar cambio de correo requieren confirmación del titular: el administrador no recibe credenciales ni modifica el correo unilateralmente. No se envían correos ni se cambia ninguna identidad real. No forman parte del primer proyecto.


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
