/* Nubox · prototipo no oficial. Flujos de identidad sin backend ni credenciales reales. */
window.NuboxIdentity=function(api){
  const {state,escape,aside,wrap,shell,setScreen,toast}=api;
  const demoMfa='482915',demoEmail='742618';
  const deadline='15 de febrero de 2027';
  function smallNote(){return '<div class="devbox">Prototipo ilustrativo. Sin envíos reales, claves, registros de identidad ni integraciones. Seguridad deberá aprobar las políticas definitivas.</div>'}
  function header(eyebrow,title,subtitle,content){return shell('<div class="page"><div class="eyebrow">'+eyebrow+'</div><h1>'+title+'</h1><p class="sub">'+subtitle+'</p>'+content+smallNote()+'</div>')}
  function migrationInfo(){return wrap(
    aside('Transición','Una cuenta, todas tus soluciones.','Te acompañamos en el cambio: un correo verificado, un acceso común y una experiencia de plataforma más consistente.'),
    '<h2>Estamos renovando tu ingreso</h2><p class="lead">Hoy tus soluciones pueden tener ingresos separados. Nubox evoluciona hacia una cuenta de acceso común y un segundo factor de seguridad.</p>'+
    '<div class="cutoff"><strong>Fecha de corte de ejemplo: '+deadline+'</strong><span>No es un plazo oficial. Se definirá por cohortes con Seguridad, Soporte y los equipos de producto.</span></div>'+
    '<div class="panel"><h3>¿Qué cambia?</h3><p>En lugar de iniciar sesión con tu RUT, usarás tu correo verificado. Configurarás un factor adicional para proteger el acceso a tu cuenta.</p><h3>¿Qué se mantiene?</h3><p>Tus empresas, productos y permisos existentes, una vez validada la correspondencia de tu identidad. El cambio no modifica tu información comercial.</p><h3>¿Qué debes hacer?</h3><p>Antes de la fecha comunicada a tu segmento, verifica un correo individual y realiza la configuración inicial. Si perdiste acceso a tu correo, contamos con un proceso de recuperación asistida.</p></div>'+
    '<button class="action" data-action="rut">Actualizar mi ingreso desde RUT</button><button class="action secondary" data-action="login">Ya ingreso con correo</button>'+
    '<div class="tiny" style="margin-top:10px">Se propone avisar 60, 30 y 7 días antes, sujeto a validación.</div>'
  )}
  function enrollMfa(){return wrap(
    aside('Primer ingreso','Activa tu protección adicional.','La primera vez configuramos un factor independiente del correo. En los accesos posteriores solo lo verificamos.'),
    '<h2>Configura tu segundo factor</h2><p class="lead">Este paso se realiza una vez por cuenta. No se repite en cada ingreso.</p>'+
    '<div class="info"><strong>Importante:</strong> un código enviado al correo puede verificar su propiedad, pero no equivale por sí solo a un segundo factor independiente. En esta propuesta usamos una aplicación autenticadora.</div>'+
    '<div class="panel"><h3>1. Abre una aplicación autenticadora</h3><p>En producción, aquí se mostraría un QR o un procedimiento de vinculación aprobado por Seguridad. Esta demo <strong>no genera una clave real</strong> ni pide que vincules una aplicación verdadera.</p><h3>2. Vinculación de demostración</h3><p>Simularemos que terminaste de vincular el dispositivo y pasaremos a verificar el código.</p></div>'+
    '<button class="action" data-action="startEnrollment">Simular vinculación y continuar</button>'+
    '<div class="aux"><button class="linkbtn" data-action="lostMfa">No tengo un dispositivo disponible</button></div>'
  )}
  function verifyEnrollment(){return wrap(
    aside('Primer ingreso','Verifiquemos el nuevo factor.','Un paso inicial para comprobar que el usuario tiene acceso al factor que acaba de registrar.'),
    '<h2>Comprueba tu segundo factor</h2><p class="lead">Introduce el código ilustrativo de tu aplicación autenticadora.</p>'+
    '<label class="field" for="setupOtp">Código de demostración</label><input class="text-input code" id="setupOtp" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="info">Código ficticio: <strong>'+demoMfa+'</strong>. No se vincula ningún dispositivo real.</div>'+
    '<label class="toggle-row"><input type="checkbox" id="setupTrust"><span><strong style="display:block;font-size:13px">Confiar en este dispositivo</strong><small class="tiny">Ejemplo: omitir desafíos de ingreso por 30 días, si Seguridad lo permite. Los cambios sensibles siguen requiriendo revalidación.</small></span></label>'+
    '<button class="action" data-action="finishEnrollment">Activar MFA (simulado)</button><button class="linkbtn" data-action="lostMfa">¿No puedo usar el segundo factor?</button>'
  )}
  function mfa(){return wrap(
    aside('Ingreso habitual','Un acceso protegido.','Tu factor ya está configurado. Ahora solo comprobamos tu identidad antes de abrir la plataforma.'),
    '<h2>Verifica que eres tú</h2><p class="lead">Abre tu aplicación autenticadora para continuar como <strong>'+escape(state.email)+'</strong>.</p>'+
    '<label class="field" for="otp">Código de tu segundo factor</label><input class="text-input code" id="otp" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="info">Código de demostración: <strong>'+demoMfa+'</strong>. No se consulta ningún autenticador real.</div>'+
    '<label class="toggle-row"><input type="checkbox" id="trust" '+(state.trust?'checked':'')+'><span><strong style="display:block;font-size:13px">Confiar en este dispositivo</strong><small class="tiny">Hasta 30 días, sujeto a aprobación de Seguridad.</small></span></label>'+
    '<button class="action" data-action="verifymfa">Verificar y continuar</button>'+
    '<div class="aux"><button class="linkbtn" data-action="lostMfa">Perdí mi segundo factor</button><button class="linkbtn" data-action="lostEmail">No tengo acceso a mi correo</button></div>'
  )}
  function recovery(){return wrap(
    aside('Recuperación','Nadie debe quedar sin una vía segura.','Contemplamos distintos escenarios sin permitir que conocer un RUT sea suficiente para tomar una cuenta.'),
    '<h2>Recuperar acceso</h2><p class="lead">Selecciona la situación que necesitas resolver.</p>'+
    '<div class="panel"><h3>Correo desactualizado o bloqueado</h3><p>No puedo recibir mensajes en mi correo registrado.</p><button class="btn-inline" data-action="lostEmail">Ver recuperación de correo →</button></div>'+
    '<div class="panel"><h3>Perdí mi segundo factor</h3><p>Ya no tengo mi aplicación autenticadora o dispositivo.</p><button class="btn-inline" data-action="lostMfa">Ver recuperación MFA →</button></div>'+
    '<div class="panel"><h3>Olvidé la contraseña de Nubox</h3><p>Restablecerla requeriría comprobaciones de identidad aprobadas por Seguridad.</p><button class="btn-inline" data-action="lostPassword">Ver recuperación de contraseña →</button></div>'+
    '<button class="action secondary" data-action="login">Volver al ingreso</button>'
  )}
  function recoverDetails(kind){
    const isEmail=kind==='email',isMfa=kind==='mfa';
    const title=isEmail?'No tengo acceso al correo':isMfa?'Perdí mi segundo factor':'No recuerdo mi contraseña';
    const detail=isEmail?'El correo anterior puede haber sido desactivado o comprometido. No enviaremos allí el único medio de recuperación.':
      isMfa?'La pérdida del dispositivo no debe permitir omitir MFA sin comprobar titularidad.':
      'El cambio de contraseña de Gmail u Outlook no cambia la contraseña de Nubox. Si olvidaste la de Nubox, el restablecimiento exige controles adicionales.';
    return wrap(aside('Ayuda con tu cuenta','Recuperación con controles.','La prioridad es proteger la identidad y evitar bloquear a los clientes legítimos.'),
      '<h2>'+title+'</h2><p class="lead">'+detail+'</p>'+
      '<div class="panel"><h3>Proceso propuesto</h3><p>1. Identificar la cuenta y solicitar asistencia segura.<br>2. Verificar titularidad por un mecanismo alternativo aprobado.<br>3. Actualizar el dato o factor perdido y registrar el cambio.<br>4. Notificar, revisar sesiones e investigar cualquier acceso sospechoso.</p><div class="alert-compact">Esta demo no recupera cuentas ni permite saltar las verificaciones.</div><button class="btn-inline primary-inline" data-action="support">Simular solicitud a Soporte</button></div>'+
      '<div class="aux"><button class="linkbtn" data-action="recover">Otras opciones</button><button class="linkbtn" data-action="login">Volver al ingreso</button></div>'
    )
  }
  function lostEmail(){return recoverDetails('email')}
  function lostMfa(){return recoverDetails('mfa')}
  function lostPassword(){return recoverDetails('password')}
  function ownership(){return wrap(
    aside('Migración','Validamos antes de vincular.','RUT y correo nuevo son datos declarativos; verificar el buzón no prueba que seas titular de la cuenta antigua.'),
    '<h2>Confirma tu identidad anterior</h2><p class="lead">Has verificado el nuevo correo <strong>'+escape(state.email)+'</strong>.</p>'+
    '<div class="alert-compact"><strong>Paso obligatorio en producción:</strong> comprobar que la persona controla la cuenta original mediante la autenticación existente o una revisión asistida.</div>'+
    '<div class="panel"><h3>Continuar esta simulación</h3><p>Para fines de entrevista, pulsa el botón solo para representar que esa comprobación se completó. No hay verificación real de identidad.</p><button class="btn-inline primary-inline" data-action="ownerDemo">Simular titularidad comprobada</button></div>'+
    '<button class="action secondary" data-action="lostEmail">No puedo comprobar mi identidad</button>'
  )}
  function changeEmail(){return header('Mi cuenta · Seguridad','Cambiar correo de acceso',
    'Tu identidad interna y tus permisos se mantienen. Cambiar el correo no significa crear otra cuenta.',
    '<div class="panel"><h3>1. Solicitud de cambio</h3>'+
    '<div class="settings-row"><span>Correo actual</span><strong>'+escape(state.email)+'</strong></div>'+
    '<div class="settings-row"><span>Correo nuevo de ejemplo</span><strong>'+escape(state.pendingEmail||'andres.nuevo@ejemplo.cl')+'</strong></div>'+
    '<p>Antes de continuar, revalidaremos la identidad con el factor existente. Después verificaremos el nuevo buzón.</p>'+
    '<div class="info">La demo utiliza un correo ficticio predefinido: no ingreses información personal real.</div>'+
    '<button class="btn-inline primary-inline" data-action="startEmailChange">Continuar a verificación MFA</button> <button class="btn-inline" data-action="page" data-page="security">Cancelar</button></div>'+
    '<div class="panel"><h3>¿El correo anterior fue bloqueado?</h3><p>Si además perdiste acceso al segundo factor, necesitas recuperación asistida.</p><button class="btn-inline" data-action="lostEmail">Ver ayuda de recuperación</button></div>')
  }
  function changeEmailAuth(){return header('Mi cuenta · Cambio de correo','Comprueba que eres tú',
    'Revalidación de una operación sensible, independiente del buzón anterior.',
    '<div class="panel"><h3>2. Revalidación MFA</h3><p>En la demo, usa el código de aplicación autenticadora <strong>'+demoMfa+'</strong>.</p>'+
    '<label class="field" for="emailMfaOtp">Código simulado</label><input id="emailMfaOtp" class="text-input code" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="extra-actions"><button class="btn-inline primary-inline" data-action="confirmEmailMfa">Confirmar identidad</button><button class="btn-inline" data-action="page" data-page="security">Cancelar</button></div></div>')
  }
  function changeEmailVerify(){return header('Mi cuenta · Cambio de correo','Verifica tu nuevo correo',
    'El nuevo buzón debe ser accesible antes de convertirlo en tu identificador de ingreso.',
    '<div class="panel"><h3>3. Código de correo</h3><p>Dirección ficticia: <strong>'+escape(state.pendingEmail||'andres.nuevo@ejemplo.cl')+'</strong>.</p>'+
    '<label class="field" for="newEmailOtp">Código enviado al correo nuevo (simulado)</label><input id="newEmailOtp" class="text-input code" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="info">Código ficticio de verificación de correo: <strong>'+demoEmail+'</strong>. No equivale a MFA y no se envía un correo real.</div>'+
    '<div class="extra-actions"><button class="btn-inline primary-inline" data-action="confirmNewEmail">Verificar y cambiar correo</button><button class="btn-inline" data-action="page" data-page="security">Cancelar</button></div></div>')
  }
  function changeEmailSuccess(){return header('Mi cuenta · Cambio de correo','Correo actualizado',
    'Los productos y empresas vinculados a la identidad siguen siendo los mismos.',
    '<div class="panel"><h3>✓ Cambio completado (demo)</h3>'+
    '<div class="settings-row"><span>Identificador actual</span><strong>'+escape(state.email)+'</strong></div>'+
    '<div class="settings-row"><span>Empresas y permisos</span><strong>Conservados</strong></div>'+
    '<div class="settings-row"><span>Otras sesiones y dispositivos confiables</span><strong>Revocados en esta propuesta</strong></div>'+
    '<p>Se generaría una alerta de seguridad al correo anterior y, si aplica, a canales alternativos. La demo no envía mensajes.</p>'+
    '<button class="btn-inline primary-inline" data-action="page" data-page="security">Ver Seguridad de cuenta</button></div>')
  }
  function startLogin(){if(!state.mfaConfigured)return 'enrollMfa';if(state.trust)return state.consented?'home':'consent';return 'mfa'}
  function afterMfa(){return state.consented?'home':'consent'}
  function handle(a){
    if(a==='migrationInfo')setScreen('migrationInfo');
    else if(a==='startEnrollment')setScreen('verifyEnrollment');
    else if(a==='finishEnrollment'){
      if((document.getElementById('setupOtp')?.value||'')!==demoMfa)toast('Utiliza el código ficticio 482915.');
      else{state.mfaConfigured=true;state.trust=!!document.getElementById('setupTrust')?.checked;setScreen(afterMfa());toast('MFA configurado en esta simulación.')}
    }
    else if(a==='verifymfa'){
      if((document.getElementById('otp')?.value||'')!==demoMfa)toast('Utiliza el código ficticio 482915.');
      else{state.trust=!!document.getElementById('trust')?.checked;setScreen(afterMfa())}
    }
    else if(a==='lostEmail'||a==='noaccess')setScreen('lostEmail');
    else if(a==='lostMfa')setScreen('lostMfa');
    else if(a==='lostPassword')setScreen('lostPassword');
    else if(a==='ownerDemo'){state.verifiedEmail=state.email;state.migrating=false;setScreen('login');toast('Identidad previa validada solo a efectos de la demo.')}
    else if(a==='changeEmail'){state.pendingEmail='andres.nuevo@ejemplo.cl';setScreen('changeEmail')}
    else if(a==='startEmailChange')setScreen('changeEmailAuth');
    else if(a==='confirmEmailMfa'){
      if((document.getElementById('emailMfaOtp')?.value||'')!==demoMfa)toast('Utiliza el código ficticio 482915.');
      else setScreen('changeEmailVerify')
    }
    else if(a==='confirmNewEmail'){
      if((document.getElementById('newEmailOtp')?.value||'')!==demoEmail)toast('Utiliza el código ficticio de correo 742618.');
      else{state.previousEmail=state.email;state.email=state.pendingEmail;state.verifiedEmail=state.email;state.pendingEmail='';state.trust=false;state.sessionsClosed=true;setScreen('changeEmailSuccess')}
    }
    else return false;
    return true;
  }
  function reset(){state.mfaConfigured=false;state.consented=false;state.pendingEmail='';state.previousEmail=''}
  return {screens:{migrationInfo,enrollMfa,verifyEnrollment,mfa,recovery,lostEmail,lostMfa,lostPassword,ownership,changeEmail,changeEmailAuth,changeEmailVerify,changeEmailSuccess},startLogin,handle,reset};
};