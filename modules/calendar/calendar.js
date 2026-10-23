(() => {
 const D=window.CejProCalendarData;
 const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const today=new Date(); today.setHours(12,0,0,0);
 let month=new Date(today.getFullYear(),today.getMonth(),1,12),selected=D.dateKey(today),events=D.load(today),view='month',host;
 const filters=new Set(Object.keys(D.types));
 const fullDate = key => D.fromKey(key).toLocaleDateString('es-PE',{weekday:'long',day:'numeric',month:'long'});
 const monthText=()=>month.toLocaleDateString('es-PE',{month:'long',year:'numeric'});
 const sort=(a,b)=>(a.date+(a.time||'00:00')).localeCompare(b.date+(b.time||'00:00'));
 const visible=()=>events.filter(e=>filters.has(e.type)).sort(sort);
 const inMonth=e=>e.date.slice(0,7)===D.dateKey(month).slice(0,7);
 const $=id=>host.querySelector('#'+id);
 function mount(element){if(host)return;host=element;
 host.innerHTML=`<div class="cal-top"><div class="cal-demo"><span class="cal-small-dot"></span>Datos de ejemplo<span class="cal-separator">·</span><span>Agenda manual</span></div><button class="cal-primary" id="addEvent"><span aria-hidden="true">＋</span> Nuevo evento</button></div>
 <div class="cal-layout"><section class="cal-board" aria-label="Vista de calendario"><div class="cal-toolbar"><div class="cal-period"><h2 id="monthLabel" aria-live="polite"></h2><div class="cal-arrows"><button class="cal-icon-btn" id="prevMonth" aria-label="Mes anterior">‹</button><button class="cal-icon-btn" id="nextMonth" aria-label="Mes siguiente">›</button></div><button class="cal-today" id="goToday">Hoy</button></div><div class="cal-view" role="group" aria-label="Vista de agenda"><button id="monthView" aria-pressed="true">Mes</button><button id="agendaView" aria-pressed="false">Agenda</button></div></div>
 <div class="cal-filters" role="group" aria-label="Filtrar por tipo de evento">${Object.entries(D.types).map(([key,label])=>`<button class="cal-filter type-${key}" data-filter="${key}" aria-pressed="true"><span class="cal-dot"></span>${label}</button>`).join('')}</div>
 <div id="calendarContents"></div><div class="cal-board-footer"><span id="eventCount"></span><span>Selecciona un día para ver su agenda</span></div></section>
 <aside class="cal-side"><section class="cal-day-panel"><div class="cal-day-heading"><p class="cal-overline" id="dayOverline">AGENDA DEL DÍA</p><h2 id="selectedDate"></h2><p id="dayCount"></p></div><div id="dayEvents"></div><button class="cal-day-add" id="addSelected">＋ Agregar a este día</button></section><section class="cal-next"><p class="cal-overline">LO QUE SIGUE</p><h2>Próximos compromisos</h2><div id="upcomingEvents"></div></section><p class="cal-local-note">Tus cambios se guardan en este navegador. Las fechas y los horarios se registran manualmente.</p></aside></div>
 <p id="calendarNotice" class="cal-notice" role="status" aria-live="polite"></p>
 <dialog id="eventDialog" class="cal-dialog" aria-labelledby="eventDialogTitle"><form id="eventForm"><div class="cal-dialog-header"><div><p class="cal-overline">MI AGENDA</p><h2 id="eventDialogTitle">Nuevo evento</h2></div><button type="button" class="cal-icon-btn" id="closeEvent" aria-label="Cerrar evento">×</button></div><div class="cal-form-body"><label>Título del evento<input name="title" required maxlength="120" placeholder="Ej. Audiencia de conciliación"></label><div class="cal-form-row"><label>Tipo<select name="type">${Object.entries(D.singular).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label><label>Fecha<input type="date" name="date" required></label></div><div class="cal-form-row"><label>Hora (opcional)<input type="time" name="time"></label><label>Enlace (opcional)<input name="location" inputmode="url" maxlength="300" placeholder="https://..."></label></div><details class="cal-additional" id="eventAdditional"><summary>Adicionales<span class="cal-additional-chevron" aria-hidden="true">⌄</span></summary><div class="cal-additional-fields"><label>Expediente o caso <span class="cal-optional">(opcional)</span><input name="caseRef" maxlength="180" placeholder="Nombre o número de expediente"></label><label>Cliente <span class="cal-optional">(opcional)</span><input name="client" maxlength="180" placeholder="Nombre del cliente"></label><label>Notas<textarea name="notes" maxlength="2000" rows="3" placeholder="Detalles que necesitas recordar"></textarea></label><label class="cal-done-check" id="eventCompletion"><input type="checkbox" name="done">Marcar como completado</label></div></details></div><div class="cal-dialog-footer"><button type="button" id="deleteEvent" class="cal-delete" hidden>Eliminar</button><span class="cal-form-spacer"></span><button type="button" id="cancelEvent" class="cal-secondary">Cancelar</button><button type="submit" class="cal-primary">Guardar evento</button></div></form></dialog>`;
 $('prevMonth').onclick=()=>move(-1);$('nextMonth').onclick=()=>move(1);
 $('goToday').onclick=()=>{month=new Date(today.getFullYear(),today.getMonth(),1,12);selected=D.dateKey(today);render();};
 $('monthView').onclick=()=>{view='month';render();};$('agendaView').onclick=()=>{view='agenda';render();};
 $('addEvent').onclick=()=>openEditor();$('addSelected').onclick=()=>openEditor();
 host.addEventListener('click',e=>{const f=e.target.closest('[data-filter]');if(f){filters.has(f.dataset.filter)?filters.delete(f.dataset.filter):filters.add(f.dataset.filter);render();}const day=e.target.closest('[data-day]');if(day){selected=day.dataset.day;render();}const event=e.target.closest('[data-event]');if(event)openEditor(event.dataset.event);});
 $('closeEvent').onclick=()=> $('eventDialog').close();$('cancelEvent').onclick=()=> $('eventDialog').close();
 $('eventDialog').addEventListener('click',e=>{if(e.target===$('eventDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
 $('eventForm').addEventListener('submit',saveEvent);
 $('deleteEvent').onclick=()=>{events=events.filter(e=>e.id!==$('eventForm').dataset.editing);persist('Evento eliminado.');$('eventDialog').close();render();};
 render();
 }
 function move(amount){month=new Date(month.getFullYear(),month.getMonth()+amount,1,12);selected=D.dateKey(month);render();}
 function eventButton(e,compact=false){return `<button type="button" class="${compact?'cal-event-chip':'cal-event-card'} type-${e.type}${e.done?' is-done':''}" data-event="${escape(e.id)}" title="${escape(e.title)}"><span class="cal-event-meta"><span class="cal-dot"></span>${escape(e.time||'Sin hora')}${!compact?`<span>· ${D.singular[e.type]}</span>`:''}</span><strong>${escape(e.title)}</strong>${!compact?`<small>${escape(e.caseRef||e.client||'Sin expediente asociado')}</small>${e.done?'<small>Completado</small>':''}`:''}</button>`;}
 function render(){
  $('monthLabel').textContent=monthText();$('monthView').setAttribute('aria-pressed',String(view==='month'));$('agendaView').setAttribute('aria-pressed',String(view==='agenda'));
  host.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(filters.has(b.dataset.filter))));
  const list=visible(),monthly=list.filter(inMonth);
  $('eventCount').textContent=`${monthly.length} ${monthly.length===1?'evento':'eventos'} en este mes`;
  if(view==='month'){
   const start=new Date(month),offset=(start.getDay()+6)%7;start.setDate(start.getDate()-offset);
   const days=new Date(month.getFullYear(),month.getMonth()+1,0).getDate(),total=Math.ceil((days+offset)/7)*7;
   let cells='';for(let i=0;i<total;i++){const d=new Date(start);d.setDate(start.getDate()+i);const key=D.dateKey(d),items=list.filter(e=>e.date===key),outside=d.getMonth()!==month.getMonth();
    cells+=`<div class="cal-cell${outside?' is-outside':''}${key===selected?' is-selected':''}"><button class="cal-date${key===D.dateKey(today)?' is-today':''}" data-day="${key}" aria-label="${escape(fullDate(key))}${key===D.dateKey(today)?', hoy':''}" aria-pressed="${key===selected}">${d.getDate()}</button><div class="cal-cell-events">${items.slice(0,2).map(e=>eventButton(e,true)).join('')}${items.length>2?`<button class="cal-more" data-day="${key}">+${items.length-2} más</button>`:''}</div>${items.length?`<span class="cal-mobile-dot type-${items[0].type}" aria-hidden="true"></span>`:''}</div>`;
   }
   $('calendarContents').innerHTML=`<div class="cal-weekdays">${['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=>`<span>${d}</span>`).join('')}</div><div class="cal-grid" aria-label="${escape(monthText())}">${cells}</div>`;
  }else{
   const dates=[...new Set(monthly.map(e=>e.date))];
   $('calendarContents').innerHTML=`<div class="cal-agenda-list">${dates.length?dates.map(date=>`<section class="cal-agenda-group"><h3>${escape(fullDate(date))}</h3>${monthly.filter(e=>e.date===date).map(e=>eventButton(e)).join('')}</section>`).join(''):'<div class="cal-no-events"><strong>Tu agenda está despejada</strong><p>No hay eventos para este mes con los filtros seleccionados.</p></div>'}</div>`;
  }
  $('dayOverline').textContent=selected===D.dateKey(today)?'HOY EN TU AGENDA':'AGENDA DEL DÍA';
  $('selectedDate').textContent=fullDate(selected);
  const daily=list.filter(e=>e.date===selected);$('dayCount').textContent=`${daily.length} ${daily.length===1?'compromiso programado':'compromisos programados'}`;
  $('dayEvents').innerHTML=daily.length?daily.map(e=>eventButton(e)).join(''):'<p class="cal-day-empty">Sin eventos para este día con los filtros seleccionados.</p>';
  const upcoming=list.filter(e=>e.date>D.dateKey(today)&&!e.done).slice(0,3);
  $('upcomingEvents').innerHTML=upcoming.length?upcoming.map(e=>`<button class="cal-upcoming type-${e.type}" data-event="${escape(e.id)}"><span class="cal-upcoming-date"><strong>${D.fromKey(e.date).getDate()}</strong><small>${D.fromKey(e.date).toLocaleDateString('es-PE',{month:'short'}).replace('.','')}</small></span><span><strong>${escape(e.title)}</strong><small>${D.singular[e.type]} · ${escape(e.time||'Sin hora')}</small></span></button>`).join(''):'<p class="cal-day-empty">No hay próximos compromisos.</p>';
 }
 function openEditor(id){
  const e=events.find(item=>item.id===id),form=$('eventForm');form.reset();form.dataset.editing=e?.id||'';
  $('eventDialogTitle').textContent=e?'Detalle del evento':'Nuevo evento';$('deleteEvent').hidden=!e;
  $('eventAdditional').open=false; $('eventCompletion').hidden=!e;
  const values=e||{date:selected,type:'audiencia',title:'',time:'',caseRef:'',client:'',location:'',notes:'',done:false};
  for(const key of ['title','type','date','time','caseRef','client','location','notes'])form.elements.namedItem(key).value=values[key]||'';
  form.elements.namedItem('done').checked=!!values.done;
  $('eventDialog').showModal();
 }
 function persist(message){const stored=D.save(events);$('calendarNotice').textContent=message+(stored?' Guardado en este navegador.':' No se pudo guardar en este navegador; los cambios durarán durante esta visita.');}
 function saveEvent(e){e.preventDefault();const form=$('eventForm'),data=new FormData(form),title=String(data.get('title')).trim();if(!title){form.elements.namedItem('title').setCustomValidity('Escribe un título para el evento.');form.elements.namedItem('title').reportValidity();form.elements.namedItem('title').addEventListener('input',()=>form.elements.namedItem('title').setCustomValidity(''),{once:true});return;}
 const item={id:form.dataset.editing||'event-'+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)),title,type:data.get('type'),date:data.get('date'),time:data.get('time'),caseRef:String(data.get('caseRef')).trim(),client:String(data.get('client')).trim(),location:String(data.get('location')).trim(),notes:String(data.get('notes')).trim(),done:data.has('done')};
 const i=events.findIndex(e=>e.id===item.id);if(i>=0)events[i]=item;else events.push(item);
 selected=item.date;const d=D.fromKey(item.date);month=new Date(d.getFullYear(),d.getMonth(),1,12);filters.add(item.type);persist('Evento guardado.');$('eventDialog').close();render();
 }
 window.CejProCalendar={mount};
})();
