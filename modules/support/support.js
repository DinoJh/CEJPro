(() => {
 function mount(el){if(el.dataset.ready)return;el.dataset.ready='true';const contact=window.CejProSupportData.contact,url='https://wa.me/'+contact.phone+'?text='+encodeURIComponent('Hola, equipo de CEJ PRO. Necesito ayuda.');
 el.innerHTML=`<section class="support-whatsapp-card" aria-labelledby="supportWhatsAppTitle"><span class="support-whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z"/><path d="M9 7.5c-.7 0-1 1-1 1.5 0 2.5 3.5 6 6 6 .5 0 1.5-.3 1.5-1l-2-1-1 1c-1.2-.5-2.5-1.8-3-3l1-1Z"/></svg></span><h2 id="supportWhatsAppTitle">Contáctanos por WhatsApp</h2><p class="support-whatsapp-number">${contact.display}</p><a id="supportWhatsApp" class="cases-primary" href="${url}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp ↗</a></section>`;
 }
 window.CejProSupport={mount};
})();
