/* Flujos de identidad ilustrativos, sin backend ni credenciales reales. */
window.NuboxIdentity=function(api){
  const {state,escape,aside,wrap,shell,setScreen,toast,help}=api;
  const demoMfa='482915',demoEmail='742618';
  const deadline='por confirmar para tu cohorte';
  function smallNote(){return ''}
  function header(eyebrow,title,subtitle,content){const k=title==='Cambiar correo de acceso'?'emailchange':title==='Verifica tu nuevo correo'?'emailcode':title==='Comprueba que eres tú'?'mfa':null;return shell('<div class="page"><div class="eyebrow">'+eyebrow+'</div><h1>'+title+(k?' '+help(k,'Más información sobre este paso'):'')+'</h1><p class="sub">'+subtitle+'</p>'+content+smallNote()+'</div>')}
  function migrationInfo(){return wrap(
    aside('Transición','Actualizamos tu forma de ingresar.','Nubox ya gestiona tus accesos. Verificaremos el correo y activaremos MFA sin modificar esos permisos.'),
    '<h2>Estamos renovando tu ingreso '+help('why','¿Por qué cambia el ingreso?')+'</h2><p class="lead">Prepararemos los datos de todos, pero cada usuario confirma su migración de forma segura.</p>'+
    '<div class="cutoff"><strong>Fecha de corte: '+deadline+' '+help('deadline','Sobre la fecha de corte')+'</strong><span>Cada grupo tendrá un plazo comunicado con anticipación.</span></div>'+
    '<div class="panel"><h3>¿Qué cambia?</h3><p>El RUT deja de utilizarse para ingresar. Necesitarás un correo individual verificado y MFA.</p><h3>¿Qué se mantiene?</h3><p>Tu ID de usuario, el RUT registrado y los permisos que gestiona Perfilamento.</p><h3>¿Qué debes hacer?</h3><p>Validar que controlas la cuenta actual, verificar el correo y configurar MFA. Si compartes correo con otra cuenta, deberás elegir uno individual.</p></div>'+
    '<button class="action" data-action="rut">Actualizar mi ingreso desde RUT</button><button class="action secondary" data-action="login">Ya ingreso con correo</button>'+
    ''
  )}
  function migrationConflict(){return wrap(
    aside('Correo compartido','Una cuenta por persona.','No fusionamos identidades ni cambiamos permisos automáticamente cuando un correo aparece en varios usuarios.'),
    '<h2>Correo compartido</h2><p class="lead" style="margin-bottom:13px">La dirección <strong>'+escape(state.migrationEmail||'contacto@empresa.cl')+'</strong> está vinculada a otra identidad.</p>'+
    '<div class="panel" style="padding:16px;margin-top:8px"><h3>Usa un correo individual</h3><p>Tu ID y los permisos de Perfilamento no cambiarán.</p>'+
    '<button class="action" style="margin-top:12px" data-action="demoIndividualEmail">Usar correo individual de ejemplo</button>'+
    '<button class="action secondary" style="margin-top:8px" data-action="lostEmail">No tengo otro correo disponible</button></div>'+
    '<p class="tiny">Caso ilustrativo: no se fusionan usuarios ni se habilitan accesos sin comprobar titularidad.</p>'
  )}
  function enrollMfa(){return wrap(
    aside('Primer ingreso','Activa tu protección adicional.','La primera vez configuramos un factor independiente del correo. En los accesos posteriores solo lo verificamos.'),
    '<h2>Configura tu segundo factor '+help('mfa','¿Qué es un segundo factor?')+'</h2><p class="lead">Este paso se realiza una vez por cuenta. No se repite en cada ingreso.</p>'+
    ''+
    '<div class="panel"><h3>1. Prepara tu aplicación autenticadora</h3><p>Conéctala mediante el código QR (representado en esta versión).</p><h3>2. Confirma su configuración</h3><p>Continúa para verificar que está lista.</p></div>'+
    '<button class="action" data-action="startEnrollment">Continuar</button>'+
    '<div class="aux"><button class="linkbtn" data-action="lostMfa">No tengo un dispositivo disponible</button></div>'
  )}
  function verifyEnrollment(){return wrap(
    aside('Primer ingreso','Verifiquemos el nuevo factor.','Un paso inicial para comprobar que el usuario tiene acceso al factor que acaba de registrar.'),
    '<h2>Comprueba tu segundo factor '+help('mfa','Configuración inicial del factor')+'</h2><p class="lead">Introduce el código ilustrativo de tu aplicación autenticadora.</p>'+
    '<label class="field" for="setupOtp">Código de demostración</label><input class="text-input code" id="setupOtp" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="info">Código de prueba: <strong>'+demoMfa+'</strong>.</div>'+
    '<label class="toggle-row"><input type="checkbox" id="setupTrust"><span><strong style="display:block;font-size:13px">Confiar en este dispositivo</strong><small class="tiny">Durante 30 días (ilustrativo) '+help('trust','¿Qué significa confiar en el equipo?')+'</small></span></label>'+
    '<button class="action" data-action="finishEnrollment">Activar segundo factor</button><button class="linkbtn" data-action="lostMfa">¿No puedo usar el segundo factor?</button>'
  )}
  function mfa(){return wrap(
    aside('Ingreso habitual','Un acceso protegido.','Tu factor ya está configurado. Ahora solo comprobamos tu identidad antes de abrir la plataforma.'),
    '<h2>Verifica que eres tú '+help('mfalogin','Sobre el ingreso habitual')+'</h2><p class="lead">Abre tu aplicación autenticadora para continuar como <strong>'+escape(state.email)+'</strong>.</p>'+
    '<label class="field" for="otp">Código de tu segundo factor</label><input class="text-input code" id="otp" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="info">Código de prueba: <strong>'+demoMfa+'</strong>.</div>'+
    '<label class="toggle-row"><input type="checkbox" id="trust" '+(state.trust?'checked':'')+'><span><strong style="display:block;font-size:13px">Confiar en este dispositivo</strong><small class="tiny">Hasta 30 días (ilustrativo) '+help('trust','Sobre los dispositivos confiables')+'</small></span></label>'+
    '<button class="action" data-action="verifymfa">Verificar y continuar</button>'+
    '<div class="aux"><button class="linkbtn" data-action="lostMfa">Perdí mi segundo factor</button><button class="linkbtn" data-action="lostEmail">No tengo acceso a mi correo</button></div>'
  )}
  function recovery(){return wrap(
    aside('Recuperación','Nadie debe quedar sin una vía segura.','Contemplamos distintos escenarios sin permitir que conocer un RUT sea suficiente para tomar una cuenta.'),
    '<h2>Recuperar acceso '+help('recovery','¿Cómo se protege tu identidad?')+'</h2><p class="lead">Selecciona la situación que necesitas resolver.</p>'+
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
      '<h2>'+title+' '+help('recovery','Sobre la recuperación segura')+'</h2><p class="lead">'+detail+'</p>'+
      '<div class="panel"><h3>Recuperación asistida</h3><p>Solicita una verificación de identidad para recuperar tu acceso de forma segura.</p><button class="btn-inline primary-inline" data-action="support">Contactar a Soporte</button></div>'+
      '<div class="aux"><button class="linkbtn" data-action="recover">Otras opciones</button><button class="linkbtn" data-action="login">Volver al ingreso</button></div>'
    )
  }
  function lostEmail(){return recoverDetails('email')}
  function lostMfa(){return recoverDetails('mfa')}
  function lostPassword(){return recoverDetails('password')}
  function ownership(){return wrap(
    aside('Migración','Validamos antes de vincular.','RUT y correo nuevo son datos declarativos; verificar el buzón no prueba que seas titular de la cuenta antigua.'),
    '<h2>Confirma tu identidad anterior '+help('migration','Por qué verificamos la cuenta original')+'</h2><p class="lead">Has verificado el nuevo correo <strong>'+escape(state.migrationEmail||state.email)+'</strong>.</p>'+
    '<div class="alert-compact"><strong>Paso obligatorio en producción:</strong> comprobar que la persona controla la cuenta original mediante la autenticación existente o una revisión asistida.</div>'+
    '<div class="panel"><h3>Verificación de identidad</h3><p>Confirma el control de tu cuenta anterior para mantener tus empresas y permisos.</p><button class="btn-inline primary-inline" data-action="ownerDemo">Continuar (verificación de prueba)</button></div>'+
    '<button class="action secondary" data-action="lostEmail">No puedo comprobar mi identidad</button>'
  )}
  function changeEmail(){return header('Mi cuenta · Seguridad','Cambiar correo de acceso',
    'Tu identidad interna y tus permisos se mantienen. Cambiar el correo no significa crear otra cuenta.',
    '<div class="panel"><h3>1. Solicitud de cambio</h3>'+
    '<div class="settings-row"><span>Correo actual</span><strong>'+escape(state.email)+'</strong></div>'+
    '<div class="settings-row"><span>Correo nuevo de ejemplo</span><strong>'+escape(state.pendingEmail||'andres.nuevo@ejemplo.cl')+'</strong></div>'+
    '<p>Primero confirma tu identidad y luego verifica el correo nuevo. '+help('emailchange','¿Por qué pedimos ambos pasos?')+'</p>'+
    ''+
    '<button class="btn-inline primary-inline" data-action="startEmailChange">Continuar a verificación MFA</button> <button class="btn-inline" data-action="page" data-page="security">Cancelar</button></div>'+
    '<div class="panel"><h3>¿El correo anterior fue bloqueado?</h3><p>Si además perdiste acceso al segundo factor, necesitas recuperación asistida.</p><button class="btn-inline" data-action="lostEmail">Ver ayuda de recuperación</button></div>')
  }
  function changeEmailAuth(){return header('Mi cuenta · Cambio de correo','Comprueba que eres tú',
    'Revalidación de una operación sensible, independiente del buzón anterior.',
    '<div class="panel"><h3>2. Revalidación MFA</h3><p>Código de verificación: <strong>'+demoMfa+'</strong>.</p>'+
    '<label class="field" for="emailMfaOtp">Código de verificación</label><input id="emailMfaOtp" class="text-input code" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="extra-actions"><button class="btn-inline primary-inline" data-action="confirmEmailMfa">Confirmar identidad</button><button class="btn-inline" data-action="page" data-page="security">Cancelar</button></div></div>')
  }
  function changeEmailVerify(){return header('Mi cuenta · Cambio de correo','Verifica tu nuevo correo',
    'El nuevo buzón debe ser accesible antes de convertirlo en tu identificador de ingreso.',
    '<div class="panel"><h3>3. Código de correo</h3><p>Dirección ficticia: <strong>'+escape(state.pendingEmail||'andres.nuevo@ejemplo.cl')+'</strong>.</p>'+
    '<label class="field" for="newEmailOtp">Código enviado al correo nuevo (simulado)</label><input id="newEmailOtp" class="text-input code" maxlength="6" inputmode="numeric" autocomplete="off" placeholder="••••••">'+
    '<div class="info">Código de verificación de correo: <strong>'+demoEmail+'</strong>.</div>'+
    '<div class="extra-actions"><button class="btn-inline primary-inline" data-action="confirmNewEmail">Verificar y cambiar correo</button><button class="btn-inline" data-action="page" data-page="security">Cancelar</button></div></div>')
  }
  function changeEmailSuccess(){return header('Mi cuenta · Cambio de correo','Correo actualizado',
    'Los productos y empresas vinculados a la identidad siguen siendo los mismos.',
    '<div class="panel"><h3>✓ Cambio completado</h3>'+
    '<div class="settings-row"><span>Identificador actual</span><strong>'+escape(state.email)+'</strong></div>'+
    '<div class="settings-row"><span>Empresas y permisos</span><strong>Conservados</strong></div>'+
    '<div class="settings-row"><span>Otras sesiones y dispositivos confiables</span><strong>Revocados en esta propuesta</strong></div>'+
    '<p>Se generaría una alerta de seguridad al correo anterior y, si aplica, a canales alternativos. </p>'+
    '<button class="btn-inline primary-inline" data-action="page" data-page="security">Ver Seguridad de cuenta</button></div>')
  }
  function startLogin(){if(!state.mfaConfigured)return 'enrollMfa';if(state.trust)return state.consented?'home':'consent';return 'mfa'}
  function afterMfa(){return state.consented?'home':'consent'}
  function handle(a){
    if(a==='migrationInfo')setScreen('migrationInfo');
    else if(a==='demoIndividualEmail'){state.migrationEmail='andres.individual@ejemplo.cl';setScreen('contactVerification')}
    else if(a==='startEnrollment')setScreen('verifyEnrollment');
    else if(a==='finishEnrollment'){
      if((document.getElementById('setupOtp')?.value||'')!==demoMfa)toast('Utiliza el código ficticio 482915.');
      else{state.mfaConfigured=true;state.trust=!!document.getElementById('setupTrust')?.checked;setScreen(afterMfa());toast('Segundo factor configurado correctamente.')}
    }
    else if(a==='verifymfa'){
      if((document.getElementById('otp')?.value||'')!==demoMfa)toast('Utiliza el código ficticio 482915.');
      else{state.trust=!!document.getElementById('trust')?.checked;setScreen(afterMfa())}
    }
    else if(a==='lostEmail'||a==='noaccess')setScreen('lostEmail');
    else if(a==='lostMfa')setScreen('lostMfa');
    else if(a==='lostPassword')setScreen('lostPassword');
    else if(a==='ownerDemo'){state.email=state.migrationEmail||state.email;state.verifiedEmail=state.email;state.migrationEmail='';state.migrating=false;state.migrationCompleted=true;setScreen(state.mfaConfigured?'mfa':'enrollMfa');toast('Cuenta anterior vinculada. Configura tu segundo factor para continuar.')}
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
  return {screens:{migrationInfo,migrationConflict,enrollMfa,verifyEnrollment,mfa,recovery,lostEmail,lostMfa,lostPassword,ownership,changeEmail,changeEmailAuth,changeEmailVerify,changeEmailSuccess},startLogin,handle,reset};
};