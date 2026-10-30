'use strict';
/* Pruebas de regresión de la máquina de estados del prototipo. No prueban WebAuthn, OAuth ni TOTP reales. */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const win={};
let otp='482915';
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','identity.js'),'utf8'),{
  window:win,document:{getElementById:()=>({value:otp,checked:false})}
});
function setup(overrides={}){
  const state={email:'andres@empresa.cl',trust:false,mfaRequired:false,mfaConfigured:false,
    passkeyConfigured:false,pendingPasskeySetup:false,secondFactorVerified:false,
    pendingEnrollmentMethod:'',enrollmentReturnTo:'',loginMethod:'',...overrides};
  let screen='';
  const api={state,escape:s=>s,aside:()=>'',wrap:(a,b)=>b,shell:s=>s,
    setScreen:name=>{screen=name},toast:()=>{},help:()=>''};
  return {state,identity:win.NuboxIdentity(api),screen:()=>screen};
}
let failures=0;
function test(name,fn){
  try{otp='482915';fn();console.log('OK '+name)}
  catch(e){failures++;console.error('FAIL '+name+': '+e.message)}
}
test('1. RUT sin obligatoriedad entra al home',()=>{
  const x=setup();assert.equal(x.identity.startLegacyLogin(),'home');
});
test('2. MFA obligatorio exige enrolamiento y prueba de titularidad',()=>{
  const x=setup({mfaRequired:true});
  assert.equal(x.identity.startLegacyLogin(),'securityMethod');
  x.identity.handle('startTotpSetup');assert.equal(x.screen(),'enrollmentIdentity');
  x.identity.handle('confirmEnrollmentIdentity');assert.equal(x.screen(),'enrollMfa');
  x.identity.handle('startEnrollment');assert.equal(x.screen(),'verifyEnrollment');
  x.identity.handle('finishEnrollment');
  assert.equal(x.screen(),'home');assert.equal(x.state.mfaConfigured,true);
});
test('3. RUT con TOTP exige código antes del home',()=>{
  const x=setup({mfaConfigured:true});
  assert.equal(x.identity.startLegacyLogin(),'mfa');
  x.identity.handle('verifymfa');assert.equal(x.screen(),'home');
});
test('4. Passkey registrada permite ingreso sin RUT',()=>{
  const x=setup({passkeyConfigured:true,mfaRequired:true});
  x.identity.handle('beginPasskeyLogin');assert.equal(x.screen(),'passkeySignIn');
  x.identity.handle('confirmPasskeySignIn');assert.equal(x.screen(),'home');
});
test('5. Agregar passkey con TOTP conserva ambos métodos',()=>{
  const x=setup({mfaConfigured:true});
  x.identity.handle('beginPasskeyLogin');assert.equal(x.screen(),'passkeyUnavailable');
  assert.equal(x.identity.startLegacyLogin(),'mfa');
  x.identity.handle('verifymfa');assert.equal(x.screen(),'passkeySetup');
  x.identity.handle('confirmPasskeySetup');
  assert.equal(x.state.passkeyConfigured,true);
  assert.equal(x.state.mfaConfigured,true);
  assert.equal(x.identity.startLegacyLogin(),'chooseLoginFactor');
});
test('5b. Agregar passkey desde Seguridad revalida TOTP',()=>{
  const x=setup({mfaConfigured:true});
  x.identity.handle('startPasskeySetup');assert.equal(x.screen(),'enrollmentTotpChallenge');
  x.identity.handle('confirmEnrollmentTotp');assert.equal(x.screen(),'passkeySetup');
});
test('5c. Agregar TOTP si ya hay passkey revalida la passkey',()=>{
  const x=setup({passkeyConfigured:true});
  x.identity.handle('startTotpSetup');assert.equal(x.screen(),'enrollmentPasskeyChallenge');
  x.identity.handle('confirmEnrollmentPasskey');assert.equal(x.screen(),'enrollMfa');
});
test('6. Google respeta política MFA de cuenta',()=>{
  assert.equal(setup().identity.startGoogleLogin(),'home');
  assert.equal(setup({mfaRequired:true}).identity.startGoogleLogin(),'securityMethod');
  assert.equal(setup({mfaRequired:true,mfaConfigured:true}).identity.startGoogleLogin(),'mfa');
  assert.equal(setup({mfaRequired:true,passkeyConfigured:true}).identity.startGoogleLogin(),'passkeySignIn');
});
test('7. Recuperación ofrece método alternativo o Soporte',()=>{
  const x=setup({passkeyConfigured:true});
  const html=x.identity.screens.lostMfa();
  assert.ok(html.includes('Ingresar con passkey'));
  assert.ok(html.includes('Contactar a Soporte'));
});
test('No permitir acceso por RUT solo cuando MFA es obligatorio',()=>{
  const x=setup({mfaRequired:true,passkeyConfigured:true});
  assert.equal(x.identity.startLegacyLogin(),'passkeySignIn');
});
if(failures){process.exitCode=1;console.error(failures+' prueba(s) fallida(s)')}
else console.log('Todas las pruebas de estados pasaron');
