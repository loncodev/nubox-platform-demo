# Prototipo Plataforma Nubox — Business Case

Prototipo estático e independiente presentado como ejercicio de entrevista. **No está asociado ni respaldado por Nubox.** Datos y empresas ficticios.

## Ejecución

Abrir `index.html` en cualquier navegador moderno. No necesita backend ni credenciales.

## Recorridos para la demo

- **Motivos y fecha de migración:** desde la pantalla inicial, abrir «¿Por qué cambiamos y cómo prepararme?». No hay fecha definida: cada cohorte tendrá su plazo tras validar la preparación y recuperación.
- **Primera entrada:** «Simular ingreso» → «Configura tu segundo factor» (aplicación autenticadora **solo representada**, sin emparejamiento real) → código ficticio **482915** → consentimientos → plataforma.
- **Acceso habitual:** «Cerrar sesión» y volver a ingresar: si el segundo factor ya está configurado se pide únicamente la verificación; si se marcó «Confiar en este dispositivo», se muestra el comportamiento ilustrativo de confianza. Los consentimientos no se vuelven a solicitar.
- **Migración RUT:** «Antes ingresaba con RUT» → asociar correo → código ficticio de verificación de correo **482915** → **simulación de titularidad de la cuenta antigua** → configuración MFA → acceso. La verificación del nuevo correo por sí sola no habilita vincular la identidad anterior.
- **Correo compartido (caso de excepción):** «Antes ingresaba con RUT» → «Ver ejemplo de correo compartido» → Continuar → advertencia de duplicado → «Usar correo individual de ejemplo» → verificar correo y titularidad → activar MFA. No se fusionan cuentas.
- **Cambiar contraseña Nubox:** «Seguridad» → «Cambiar contraseña» → revalidación ficticia MFA → confirmación y revocación simulada de sesiones.
- **Cambiar correo:** «Seguridad» → «Cambiar correo de ingreso» → código ficticio MFA **482915** → verificación del nuevo correo con código **742618** → confirmación. Conserva identidad, empresas y autorizaciones.
- **Excepciones:** «Recuperar acceso» permite mostrar los escenarios de correo inaccesible, dispositivo MFA perdido y contraseña Nubox olvidada. Su tratamiento propone verificación asistida; no simula accesos sin validar la identidad.
- **Visión futura:** catálogo y contratación simulada, suscripciones, documentos de cobro y usuarios por empresa. Dentro de **Usuarios y accesos**, cada perfil muestra nombre, correo, rol, estado y empresa. Las opciones de restablecer contraseña y solicitar cambio de correo requieren confirmación del titular: el administrador no recibe credenciales ni modifica el correo unilateralmente. No se envían correos ni se cambia ninguna identidad real. No forman parte del primer proyecto.


## Seguridad y alcance

No captura contraseñas, no emite solicitudes a sistemas externos ni guarda datos de usuarios. Todos los flujos de autenticación, consentimiento y acceso son ficticios; los mecanismos de seguridad definitivos tendrían que ser aprobados por el área responsable.

## Navegación y alcance (octubre 2026)

**Primer proyecto del business case: migración de RUT a correo único verificado + MFA, reutilizando autenticación y Perfilamento.**
- Login por correo y transición desde RUT
- Verificación MFA, dispositivo confiable y acceso a empresa/producto
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

El brief no define plazos oficiales, mecanismo final de MFA ni procedimientos de recuperación. La fecha de corte, uso de aplicación autenticadora, confianza durante 30 días, revocación de sesiones y canales alternativos se presentan como **propuestas sujetas a validación de Seguridad, Legal, Ingeniería, Soporte y los equipos de producto**. El video proporcionado inspira la experiencia visual y plantea un código por correo, pero eso se separa aquí de la autenticación multifactor independiente. Una contraseña cambiada en el proveedor de correo no cambia la contraseña de Nubox.

Indicadores propuestos para el piloto: porcentaje de cuentas con correo comprobado, tasa de activación de MFA, inicio de sesión exitoso, abandono durante onboarding, usuarios bloqueados, contactos recuperados y tickets de acceso por cohorte. Definir metas solo después de medir la línea base y el piloto.
