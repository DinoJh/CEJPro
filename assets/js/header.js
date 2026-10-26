/* Controles de cabecera del prototipo: sin conexión a servicios externos. */
(() => {
 const $=id=>document.getElementById(id),form=$('cejIdentityForm');
 $('cejIdentityButton').onclick=()=>{$('identityFeedback').textContent='';$('cejIdentityDialog').showModal();};
 document.querySelectorAll('[data-header-close]').forEach(b=>b.onclick=()=>$(b.dataset.headerClose).close());
 $('identityType').onchange=()=>{const dni=$('identityType').value==='dni';for(const id of ['identityDigitField','identityIssueField']){$(id).hidden=!dni;$(id).querySelector('input').required=dni;}const input=form.elements.namedItem('documentNumber');input.maxLength=dni?8:12;input.pattern=dni?'[0-9]{8}':'[A-Za-z0-9]{9,12}';};
 form.onsubmit=e=>{e.preventDefault();$('identityFeedback').textContent='Identidad guardada para esta visita. Conexión con CEJ pendiente.';};
 $('extensionButton').onclick=()=>$('extensionDialog').showModal();
 $('extensionDemoInstalled').onchange=e=>{$('extensionLabel').textContent=e.target.checked?'Extensión descargada':'Descargar extensión';$('extensionButton').title=e.target.checked?'Demostración: acceso a CEJ pendiente de vinculación':'Descarga pendiente de vinculación';};
})();
