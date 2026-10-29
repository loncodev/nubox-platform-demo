# Prototipo Plataforma Nubox — Business Case

Prototipo estático e independiente presentado como ejercicio de entrevista. **No está asociado ni respaldado por Nubox.** Datos y empresas ficticios.

## Ejecución

Abrir `index.html` en cualquier navegador moderno. No necesita backend ni credenciales.

## Recorridos disponibles

- **Ingreso a Nubox:** Passkey, Google o RUT. **No existe autenticación nativa por correo** en esta propuesta.
- **Ingreso con Google:** «Continuar con Google» → confirmar la elección de Google → plataforma. La interfaz no ejecuta OAuth real.
- **Ingreso con RUT:** RUT y contraseña del acceso existente → TOTP si está configurado → plataforma.
- **Passkey ya registrada:** «Ingresar con passkey» → confirmar con el dispositivo → plataforma.
- **Passkey sin registrar:** elegir «Ingresar con passkey» → «Aún no tienes una passkey» → autenticarse con **Google o RUT** → configurar passkey → plataforma.
- **TOTP:** se puede configurar desde Seguridad. Es un segundo factor para el ingreso RUT; no se envía ningún correo para obtener el código TOTP.
- **Correo de contacto:** se puede actualizar en Seguridad y verificar como dato de contacto; **no es un identificador de ingreso**.
- **Recuperación:** ayuda ante pérdida de autenticador, correo inaccesible o contraseña olvidada, con comprobación de identidad.
- **Otros apartados:** productos, empresas, suscripciones, pagos y usuarios por empresa permanecen como navegación ilustrativa.

## Seguridad y alcance

La interfaz permite recorrer alta e ingreso con passkey y TOTP, pero **NO implementa WebAuthn ni genera/valida códigos TOTP reales**. No hay servidor, emisión de desafíos, almacenamiento seguro de credenciales, verificación criptográfica ni autenticación verdadera. «Confirmar passkey» únicamente avanza una secuencia de navegación; **no registra una llave real ni invoca un autenticador del sistema**. El código TOTP `482915` es fijo. Para llevarlos a producción hacen falta un servicio de identidad con verificación del lado del servidor, un flujo de inscripción y recuperación seguro, y revisión de Seguridad.

No captures contraseñas, datos bancarios ni información personal real en el prototipo. Los estados de inicio, facturación y permisos solo se modifican en memoria; ninguna acción altera cuentas Nubox.

## Navegación y alcance (octubre 2026)

**Prioridad:** reforzar la autenticación de la cuenta Nubox mediante MFA y passkeys, **reutilizando la autenticación existente con RUT y Google y la autorización administrada por Perfilamento**.

- Passkey como alternativa preferida para ingresos posteriores, siempre vinculada al ID interno de usuario.
- TOTP como segundo factor cuando se utilice el ingreso por RUT y la política lo requiera.
- Acceso con Google como método ya disponible; comprobar con Seguridad los controles MFA del proveedor de identidad.
- Conservar los permisos, empresas y productos existentes, sin intentar enlazar identidades automáticamente por coincidencia de correo.
- La calidad del correo de contacto es un asunto de datos de contacto, no un cambio obligatorio del identificador de autenticación.

## Hipótesis y validación

Según la información aportada para esta iteración, Nubox ya tiene ingreso por **RUT y Google**, una identidad interna compartida y **Perfilamento** para controlar empresas, productos y permisos. Debe validarse con Ingeniería qué cuentas tienen Google vinculado, cómo se asigna cada credencial a un ID interno, cómo funcionan las sesiones y qué exigencias de MFA aplican.

**No asumimos que el caso de negocio requiera migrar de RUT a correo**. Los datos de contacto desactualizados no justifican convertir el correo en credencial ni fusionar cuentas a partir de una coincidencia de dirección.

El recorrido de Google es solo interfaz: no implementa OAuth ni autentica una cuenta real. Passkeys y TOTP también son representaciones de interacción; las implementaciones productivas requieren verificación criptográfica en el backend, inscripción segura y recuperación de cuentas.

La validación de la propuesta debe medir cobertura de MFA, satisfacción y éxito de ingreso, bloqueos, tasa de recuperación y tickets de soporte.
