/* Vistas ilustrativas de autogestión, sin backend ni transacciones. */
window.NuboxExtras=function(api){
 const {state,companies,productInfo,shell,escape,setScreen,toast,help}=api;
 let purchased={},invited={},roles={},enabled={},methods={},retried={},offerCode='CA',invoiceIndex=0;
 const codes=Object.keys(productInfo);
 const tag=help('future','Sobre la disponibilidad de esta función');
 const intro=''
 function active(code){return (state.scenario==='no-migrado'||code==='CO')&&(companies[state.company].products.includes(code)||(purchased[state.company]||[]).includes(code))}
 function frame(kicker,title,body){return shell('<div class="page"><div class="eyebrow">'+kicker+'</div><h1>'+title+'</h1><p class="sub">'+escape(companies[state.company].name)+' · '+tag+'</p>'+body+'</div>')}
 function catalog(){return frame('Plataforma · Oferta multiproducto','Explorar planes',
 '<p class="tiny">Los valores y las condiciones se confirmarán antes de contratar.</p><div class="grid-products" style="margin-top:22px">'+codes.map(code=>'<div class="panel" style="margin:0"><h3>'+escape(productInfo[code].name)+' <span class="pill neutral">'+code+'</span></h3><p>'+(active(code)?'Producto disponible en tu cuenta':'Producto aún no contratado')+'</p><p><strong>'+(active(code)?'Activo':'Precio y condiciones por definir')+'</strong></p><button class="btn-inline '+(active(code)?'':'primary-inline')+'" data-action="'+(active(code)?'page':'extra-offer')+'" data-page="subscriptions" data-code="'+code+'">'+(active(code)?'Ver mi suscripción':'Ver oferta →')+'</button></div>').join('')+'</div>')}
 function subscriptions(){const codesActive=codes.filter(active);return frame('Autogestión · Suscripciones','Mi suscripción',
 '<div class="panel"><h3>Resumen <span class="pill">Activa</span></h3><div class="settings-row"><span>Productos en esta empresa</span><strong>'+codesActive.length+'</strong></div><div class="settings-row"><span>Próxima renovación</span><strong>15 de noviembre de 2026</strong></div><div class="settings-row"><span>Medio de pago</span><strong>'+escape(methods[state.company]||'Tarjeta •• 4242')+'</strong></div></div><div class="panel"><h3>Planes de la cuenta</h3>'+codesActive.map(code=>'<div class="settings-row"><span>'+escape(productInfo[code].name)+'</span><span class="pill">'+((purchased[state.company]||[]).includes(code)?'Nuevo':'Activo')+'</span></div>').join('')+'<div class="extra-actions"><button class="btn-inline primary-inline" data-action="page" data-page="catalog">Explorar otros planes</button><button class="btn-inline" data-action="page" data-page="billing">Ver facturas</button></div></div>')}
 function offer(){const name=escape(productInfo[offerCode].name);return frame('Planes · Oferta','Contratar '+name,
 '<div class="panel"><h3>Resumen de contratación</h3><div class="settings-row"><span>Producto</span><strong>'+name+'</strong></div><div class="settings-row"><span>Valor y condiciones</span><strong>Pendientes de definición</strong></div><div class="settings-row"><span>Estado</span><strong>Pendiente de confirmación</strong></div><p>Puedes revisar el plan antes de continuar.</p><label class="consent"><input type="checkbox" id="extraAgree"><div><strong>Confirmo que revisé el resumen</strong><small>El precio y las condiciones deben confirmarse antes de contratar.</small></div></label><div class="extra-actions"><button class="btn-inline primary-inline" data-action="extra-buy">Continuar</button><button class="btn-inline" data-action="page" data-page="catalog">Cancelar</button></div></div>')}
 function billing(){return frame('Autogestión · Cobros','Facturas y pagos',
 '<p class="tiny">Consulta el estado de tus documentos. Esta pantalla no procesa pagos. '+help('billing','Sobre los datos de facturación')+'</p><div class="panel"><h3>Medio de pago</h3><div class="settings-row"><span>Medio registrado</span><strong>'+escape(methods[state.company]||'Tarjeta •• 4242')+'</strong></div><button class="btn-inline" style="margin-top:16px" data-action="extra-payment">Cambiar medio de pago</button></div><div class="panel"><h3>Historial de documentos</h3>'+['Octubre','Septiembre','Agosto'].map((month,i)=>'<div class="settings-row"><span>'+month+' 2026 <small class="tiny">FAC-2026-'+(1403-i)+'</small></span><strong>$64.000 CLP</strong><span class="pill neutral">'+(i===0?(retried[state.company]?'Reintento solicitado':'Pendiente'):'Pagada')+'</span><button class="btn-inline" data-action="extra-invoice" data-index="'+i+'">Ver detalle</button></div>').join('')+(retried[state.company]?'<div class="info">Reintento de cobro solicitado.</div>':'<button class="btn-inline primary-inline" style="margin-top:18px" data-action="extra-retry">Solicitar reintento de cobro</button>')+'</div>')}
 function invoice(){return frame('Facturación · Detalle','Detalle de factura',
 '<div class="panel"><h3>FAC-2026-'+(1403-invoiceIndex)+' </h3><div class="settings-row"><span>Período</span><strong>'+['Octubre','Septiembre','Agosto'][invoiceIndex]+' de 2026</strong></div><div class="settings-row"><span>Importe</span><strong>$64.000 CLP</strong></div><div class="settings-row"><span>Documento tributario</span><strong>No disponible</strong></div><p>Consulta el período, el importe y el estado de este documento.</p><button class="btn-inline" data-action="page" data-page="billing">← Volver al historial</button></div>')}
 function payment(){return frame('Facturación · Medio de pago','Actualizar medio de pago',
 '<div class="panel"><h3>Actualizar forma de pago</h3><div class="info">Selecciona un medio de pago.</div><div class="extra-actions"><button class="btn-inline primary-inline" data-action="extra-method" data-value="Tarjeta •• 1111">Tarjeta ••1111</button><button class="btn-inline" data-action="extra-method" data-value="Transferencia bancaria">Transferencia bancaria</button><button class="btn-inline" data-action="page" data-page="billing">Cancelar</button></div></div>')}

 let selectedUser='camila',passwordRequests={},emailRequests={};
 function memberKey(id){return String(state.company)+':'+id}
 function memberData(id){
  const isCamila=id==='camila',isMe=id==='me',i=state.company;
  const email=isMe?state.email:isCamila?'camila.soto@ejemplo.cl':'paula.fernandez@ejemplo.cl';
  return {id,name:isMe?'Andrés Rojas':isCamila?'Camila Soto':'Paula Fernández',email,
   role:isMe?'Administrador':isCamila?(roles[i]||'Contabilidad'):'Colaborador',
   status:isMe?'Activo':isCamila?(enabled[i]!==false?'Activo':'Inactivo'):'Invitada'};
 }
 function memberRow(id){
   const u=memberData(id);
   return '<div class="member-directory-row"><div class="member-directory-person"><div class="member-initial">'+escape(u.name[0])+'</div><div><strong>'+escape(u.name)+'</strong><span>'+escape(u.email)+'</span></div></div><div class="member-directory-meta"><span class="pill neutral">'+escape(u.role)+'</span><span class="pill '+(u.status==='Activo'?'':'neutral')+'">'+escape(u.status)+'</span></div><button class="btn-inline" data-action="extra-profile" data-user="'+u.id+'">Ver perfil →</button></div>';
 }
 function members(){
  return frame('Mi empresa · Equipo','Usuarios y accesos',
   '<div class="panel"><div class="member-directory-heading"><div><h3>Equipo de la empresa</h3><p>Consulta los perfiles y administra accesos.</p></div><button class="btn-inline primary-inline" data-action="extra-invite" '+(invited[state.company]?'disabled':'')+'>'+(invited[state.company]?'Invitación registrada':'Invitar usuario')+'</button></div>'+
   memberRow('me')+memberRow('camila')+(invited[state.company]?memberRow('paula'):'')+
   '<p class="tiny" style="margin-top:16px">Los cambios de credenciales los confirma cada usuario. '+help('permissions','Sobre los accesos y permisos')+'</p></div>');
 }
 function memberProfile(){
  const u=memberData(selectedUser),me=u.id==='me';
  const requestReset=passwordRequests[memberKey(u.id)], requestEmail=emailRequests[memberKey(u.id)];
  const accountPanel='<div class="panel"><h3>Información del usuario</h3>'+
   '<div class="settings-row"><span>Nombre</span><strong>'+escape(u.name)+'</strong></div>'+
   '<div class="settings-row"><span>Correo electrónico</span><strong>'+escape(u.email)+'</strong></div>'+
   '<div class="settings-row"><span>Perfil / rol</span><strong>'+escape(u.role)+'</strong></div>'+
   '<div class="settings-row"><span>Estado</span><span class="pill '+(u.status==='Activo'?'':'neutral')+'">'+escape(u.status)+'</span></div>'+
   '<div class="settings-row"><span>Empresa</span><strong>'+escape(companies[state.company].name)+'</strong></div></div>';
  const controls=me
   ? '<button class="btn-inline primary-inline" data-action="changePassword">Cambiar mi contraseña</button><button class="btn-inline" data-action="changeEmail">Cambiar mi correo</button>'
   : '<button class="btn-inline primary-inline" data-action="extra-start-reset">Restablecer contraseña</button><button class="btn-inline" data-action="extra-start-email">Cambiar correo</button>'+
     (selectedUser==='camila'?'<button class="btn-inline" data-action="extra-role">Cambiar rol</button><button class="btn-inline" data-action="extra-toggle">'+(u.status==='Activo'?'Desactivar':'Reactivar')+' acceso</button>':'');
  return frame('Usuarios · Perfil','Perfil de '+escape(u.name),
   '<button class="linkbtn" data-action="page" data-page="members">← Volver a usuarios</button>'+
   accountPanel+'<div class="panel"><h3>Seguridad y acceso '+help('recovery','Sobre las verificaciones de seguridad')+'</h3>'+
   '<p>'+(me?'Administra las credenciales de tu cuenta.':'Como administrador puedes solicitar cambios, pero no definir credenciales de otra persona.')+'</p>'+
   '<div class="extra-actions">'+controls+'</div>'+
   (requestReset?'<p class="member-request-state">Restablecimiento solicitado · Pendiente de acción del usuario.</p>':'')+
   (requestEmail?'<p class="member-request-state">Cambio de correo solicitado · Verificación pendiente de la persona titular.</p>':'')+
   '</div>');
 }
 function memberReset(){
  const u=memberData(selectedUser);if(u.id==='me')return memberProfile();
  return frame('Usuarios · Credenciales','Restablecer contraseña',
   '<button class="linkbtn" data-action="extra-profile" data-user="'+u.id+'">← Volver al perfil</button>'+
   '<div class="panel"><h3>'+escape(u.name)+'</h3>'+
   '<div class="settings-row"><span>Correo registrado</span><strong>'+escape(u.email)+'</strong></div>'+
   '<p>Se enviaría al usuario un enlace de restablecimiento. Solo él puede crear una contraseña nueva tras comprobar su identidad.</p>'+
   '<div class="info"></div>'+
   '<div class="extra-actions"><button class="btn-inline primary-inline" data-action="extra-confirm-reset">Solicitar restablecimiento</button><button class="btn-inline" data-action="extra-profile" data-user="'+u.id+'">Cancelar</button></div></div>');
 }
 function memberEmail(){
  const u=memberData(selectedUser);if(u.id==='me')return memberProfile();
  const proposed=u.id==='camila'?'camila.nueva@ejemplo.cl':'paula.nueva@ejemplo.cl';
  return frame('Usuarios · Identidad','Solicitar cambio de correo',
   '<button class="linkbtn" data-action="extra-profile" data-user="'+u.id+'">← Volver al perfil</button>'+
   '<div class="panel"><h3>'+escape(u.name)+'</h3>'+
   '<div class="settings-row"><span>Correo actual</span><strong>'+escape(u.email)+'</strong></div>'+
   '<div class="settings-row"><span>Correo propuesto</span><strong>'+escape(proposed)+'</strong></div>'+
   '<p>Se solicitará al titular comprobar su identidad y verificar el nuevo correo. Sus empresas y permisos se mantienen. '+help('emailchange','Por qué debe verificarlo el usuario')+'</p>'+
   '<div class="info"></div>'+
   '<div class="extra-actions"><button class="btn-inline primary-inline" data-action="extra-confirm-email">Solicitar verificación</button><button class="btn-inline" data-action="extra-profile" data-user="'+u.id+'">Cancelar</button></div></div>');
 }

 function handle(a,el){
 if(a==='extra-offer'){offerCode=el.dataset.code||'CA';setScreen(active(offerCode)?'subscriptions':'offer')}
 else if(a==='extra-buy'){if(!document.getElementById('extraAgree')?.checked){toast('Confirma primero que revisaste el resumen.')}else{(purchased[state.company]||(purchased[state.company]=[])).push(offerCode);setScreen('subscriptions');toast('Producto seleccionado.')}}
 else if(a==='extra-invoice'){invoiceIndex=Number(el.dataset.index)||0;setScreen('invoice')}
 else if(a==='extra-payment')setScreen('payment')
 else if(a==='extra-method'){methods[state.company]=el.dataset.value;setScreen('billing');toast('Medio de pago seleccionado.')}
 else if(a==='extra-retry'){retried[state.company]=true;setScreen('billing');toast('Solicitud de reintento registrada.')}
 else if(a==='extra-profile'){selectedUser=['me','camila','paula'].includes(el.dataset.user)?el.dataset.user:'me';setScreen('memberProfile')}
 else if(a==='extra-start-reset'){if(selectedUser==='me')setScreen('security');else setScreen('memberReset')}
 else if(a==='extra-start-email'){if(selectedUser==='me')setScreen('security');else setScreen('memberEmail')}
 else if(a==='extra-confirm-reset'){passwordRequests[memberKey(selectedUser)]=true;setScreen('memberProfile');toast('Solicitud de restablecimiento pendiente.')}
 else if(a==='extra-confirm-email'){emailRequests[memberKey(selectedUser)]=true;setScreen('memberProfile');toast('Solicitud de cambio registrada. Falta verificación del titular.')}
 else if(a==='extra-invite'){invited[state.company]=true;setScreen('members');toast('Invitación registrada en esta sesión.')}
 else if(a==='extra-role'){roles[state.company]=roles[state.company]==='Contabilidad'?'Colaborador':'Contabilidad';setScreen('memberProfile')}
 else if(a==='extra-toggle'){enabled[state.company]=enabled[state.company]===false;setScreen('memberProfile')}
 else return false;
 return true;
 }
 function reset(){purchased={};invited={};roles={};enabled={};methods={};retried={};offerCode='CA';invoiceIndex=0;selectedUser='camila';passwordRequests={};emailRequests={}}
 return {active,handle,reset,screens:{catalog,subscriptions,offer,billing,invoice,payment,members,memberProfile,memberReset,memberEmail}};
};