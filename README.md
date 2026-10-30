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

## Cómo comprobar los estados

- **Ingreso sin MFA obligatorio:** abrir [el prototipo normal](https://loncodev.github.io/nubox-platform-demo/) → RUT → ingresar → plataforma.
- **MFA obligatorio:** abrir [el escenario con MFA obligatorio](https://loncodev.github.io/nubox-platform-demo/?escenario=mfa-obligatorio) → RUT → ingresar → elegir TOTP o passkey.
- **Registrar TOTP voluntariamente:** ingresar con RUT en el escenario normal → Seguridad → Configurar TOTP.
- **Añadir passkey conservando TOTP:** registrar TOTP → cerrar sesión → ingresar con RUT + TOTP → Seguridad → Configurar passkey. Se exige revalidar el factor antes de registrar un método adicional.
- **Ingreso con Google:** opción Google → continuar. Se representa la navegación, no OAuth.
- **Código fijo TOTP del prototipo:** `482915`.

El estado solo existe en memoria: **recargar la página reinicia las credenciales ficticias**. El parámetro `escenario=mfa-obligatorio` modifica únicamente el comportamiento ilustrativo del prototipo, no una política ni un usuario real.

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

## Hipótesis y validación

Según la información aportada para esta iteración, Nubox ya tiene ingreso por **RUT y Google**, una identidad interna compartida y **Perfilamento** para controlar empresas, productos y permisos. Debe validarse con Ingeniería qué cuentas tienen Google vinculado, cómo se asigna cada credencial a un ID interno, cómo funcionan las sesiones y qué exigencias de MFA aplican.

**No asumimos que el caso de negocio requiera migrar de RUT a correo**. Los datos de contacto desactualizados no justifican convertir el correo en credencial ni fusionar cuentas a partir de una coincidencia de dirección.

El recorrido de Google es solo interfaz: no implementa OAuth ni autentica una cuenta real. Passkeys y TOTP también son representaciones de interacción; las implementaciones productivas requieren verificación criptográfica en el backend, inscripción segura y recuperación de cuentas.

La validación de la propuesta debe medir cobertura de MFA, satisfacción y éxito de ingreso, bloqueos, tasa de recuperación y tickets de soporte.
