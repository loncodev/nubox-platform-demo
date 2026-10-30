# Prototipo Plataforma Nubox — Business Case

Prototipo estático e independiente presentado como ejercicio de entrevista. **No está asociado ni respaldado por Nubox.** Datos y empresas ficticios.

## Ejecución

Abrir `index.html` en cualquier navegador moderno. No necesita backend ni credenciales.

## Recorridos disponibles

**Pantalla inicial:** Passkey, Google o RUT. No hay ingreso con correo; el correo de contacto no se transforma en identificador de autenticación.

1. **RUT sin obligación de MFA:** RUT + contraseña existente → plataforma. El usuario puede configurar TOTP o passkey desde **Seguridad**, de forma voluntaria.
2. **RUT con MFA obligatorio y sin método:** RUT + contraseña → elegir passkey o TOTP → comprobar titularidad antes de registrar el método → plataforma.
3. **RUT con TOTP registrado:** RUT + contraseña → código TOTP → plataforma. No se envía un código al correo.
4. **Passkey registrada:** botón passkey → confirmar uso de la credencial → plataforma, sin RUT, contraseña ni TOTP adicional.
5. **Registrar passkey:** desde RUT, Google o Seguridad. Si ya existe TOTP, se exige ese código antes de registrar la passkey; si no hay factores registrados, se representa una comprobación adicional de identidad. Registrar passkey **no elimina TOTP**.
6. **Google:** el ingreso existente continúa sin cambios cuando MFA no es obligatorio. Si lo es, el prototipo no presume garantías de MFA del proveedor y exige un factor local; en producción hay que verificar la información que entrega la integración.
7. **Recuperación:** usar otro factor ya registrado, si está disponible, o recurrir a Soporte con comprobación de identidad. No se permite recuperar una cuenta únicamente con el RUT o el correo.

Cuando están configurados TOTP y passkey, ambos permanecen disponibles, sin exigirlos juntos en el ingreso normal. La exención del segundo factor por un dispositivo de confianza **no está habilitada**.

## Simulador: cuatro estados de transición aprobados

En la franja superior, separada de las pantallas reales del cliente, se puede seleccionar:

| Estado de cuenta | Recorrido de prueba | Tenant/productos mostrados |
| --- | --- | --- |
| **Sin migrar** | RUT + contraseña existente → selector de tenants | Ejemplo multiproducto: Tenant 1 (CO, RE), Tenant 2 (FA), Tenant 3 (CO) |
| **Primera activación** | RUT + contraseña → escoger TOTP o passkey → comprobación adicional simulada → activación → selector de tenants | Piloto con acceso exclusivamente a Contabilidad en dos tenants |
| **MFA activo** | Passkey o RUT + contraseña + TOTP → selector de tenants | Piloto solo CO, factores ya registrados |
| **Recuperación** | Método alternativo ya registrado (passkey o TOTP), o ayuda asistida | Piloto solo CO, sin permitir acceso solamente con contraseña |

- [Sin migrar](https://loncodev.github.io/nubox-platform-demo/?escenario=no-migrado)
- [Primera activación](https://loncodev.github.io/nubox-platform-demo/?escenario=pendiente-mfa)
- [MFA activo](https://loncodev.github.io/nubox-platform-demo/?escenario=mfa-activo)
- [Recuperación](https://loncodev.github.io/nubox-platform-demo/?escenario=recuperacion)

**Una única pantalla de ingreso real**: los cuatro botones de la franja superior son exclusivamente herramientas de demostración. No existen URLs distintas para usuarios migrados y no migrados.

Tras cada autenticación exitosa, la primera pantalla es **«Selecciona tu empresa y sistema»**, donde se ven simultáneamente los tenants y productos autorizados. Al elegir uno se accede al producto con ese tenant activo. La vista representa la responsabilidad del sistema de Perfilamiento en FA/CO/RE; no se reconstruyen permisos reales.

El código TOTP ilustrativo es `482915`. Para probar el segundo ingreso después de enrolar TOTP, cerrar sesión desde **Seguridad** sin recargar la pestaña. Los estados viven solamente en memoria y una recarga vuelve a cargar los datos ficticios del escenario elegido. El parámetro anterior `escenario=mfa-obligatorio` se interpreta como `pendiente-mfa` para mantener compatibilidad.

## Arquitectura del caso de negocio

- **Objetivo obligatorio:** login único con MFA para FA, CO, RE, Portal de Colaboradores y Control de Asistencia.
- **Situación declarada en el BC:** cinco logins y cinco bases de usuarios. Esto no equivale necesariamente a cinco URLs ni cinco autenticadores físicamente independientes.
- **Accesos actuales informados:** tres URLs: una compartida por FA/CO/RE, otra para Portal (administradores y colaboradores) y otra para Asistencia (administradores y colaboradores).
- **FA/CO/RE:** formulario y servicio de Autenticación compartidos para RUT + contraseña. **Perfilamiento es un sistema diferente** encargado de las relaciones entre usuarios y sistemas. La selección de tenants y productos existe hoy y debe conservarse.
- **Hipótesis de diseño para Portal y Asistencia:** ambos cuentan con autenticación y autorización independientes.
- **Arquitectura aprobada:** un servicio central de autenticación con MFA, tres integraciones principales y conservación de las autorizaciones existentes. No se requiere fusionar físicamente todas las bases antes de integrar el acceso.
- **Piloto:** usuarios que solo tengan acceso a Contabilidad, seguidos por otras cohortes; a medida que se incorporan, el ingreso requiere MFA y no puede retroceder a una vía legada que omita el segundo factor.
- **Pendiente de Seguridad:** definir el mecanismo real de comprobación de titularidad para el primer enrolamiento; el prototipo solo simula una aprobación.

## Pruebas de regresión

Ejecutar `node tests/auth-flows.test.cjs` desde la raíz del repositorio. Las diez pruebas automatizadas cubren los siete flujos, el registro de un método adicional sin retirar el anterior, la política MFA por cuenta y las alternativas de recuperación. No sustituyen las pruebas WebAuthn, OAuth, backend o TOTP real.

## Seguridad y alcance

La interfaz permite recorrer alta e ingreso con passkey y TOTP, pero **NO implementa WebAuthn ni genera/valida códigos TOTP reales**. No hay servidor, emisión de desafíos, almacenamiento seguro de credenciales, verificación criptográfica ni autenticación verdadera. «Confirmar passkey» únicamente avanza una secuencia de navegación; la pantalla de comprobación adicional de titularidad también es ilustrativa; **no registra una llave real ni invoca un autenticador del sistema**. El código TOTP `482915` es fijo. Para llevarlos a producción hacen falta un servicio de identidad con verificación del lado del servidor, un flujo de inscripción y recuperación seguro, y revisión de Seguridad.

No captures contraseñas, datos bancarios ni información personal real en el prototipo. Los estados de inicio, facturación y permisos solo se modifican en memoria; ninguna acción altera cuentas Nubox.

## Navegación y alcance (octubre 2026)

**Prioridad:** reforzar la autenticación de la cuenta Nubox mediante MFA y passkeys, **reutilizando la autenticación existente con RUT y Google y la autorización administrada por Perfilamento**.

- Passkey como alternativa preferida para ingresos posteriores, siempre vinculada al ID interno de usuario.
- TOTP como segundo factor cuando se utilice el ingreso por RUT y la política lo requiera.
- Acceso con Google como método ya disponible; comprobar con Seguridad los controles MFA del proveedor de identidad.
- Conservar los permisos, empresas y productos existentes, sin intentar enlazar identidades automáticamente por coincidencia de correo.
- La calidad del correo de contacto es un asunto de datos de contacto, no un cambio obligatorio del identificador de autenticación.

## Hipótesis y validación técnica

Antes de desarrollo productivo debemos validar en Ingeniería la distribución real de las cinco bases de usuarios, la viabilidad de evolución del autenticador de FA/CO/RE, el protocolo de sesiones e integración con Portal/Asistencia, y cómo vincular de forma segura los identificadores sin perder permisos. La coincidencia de RUT o correo no autoriza a fusionar identidades automáticamente.

No migramos RUT a correo. El correo sigue siendo un dato de contacto y recuperación, no un factor MFA ni un identificador nuevo obligatorio.

El recorrido de Google es solo interfaz: no implementa OAuth ni autentica una cuenta real. Las garantías de MFA que entrega Google deben validarse antes de confiar en ellas. La validación del proyecto debe medir cobertura de MFA, éxito de ingreso, bloqueos, tiempos de recuperación, permisos y tickets de soporte.
