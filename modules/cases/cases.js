(() => {
 const D=window.CejProCasesData;
 const F=window.CejProCaseFiles;
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const uid=prefix=>prefix+'-'+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36));
 let state=D.load(),host,folder='all',status='all',search='',page=1;
 const pageSize=6;
 const $=id=>host.querySelector('#'+id);
 const folderName=id=>state.folders.find(f=>f.id===id)?.name||'Sin carpeta';
 function folderOptions(value){return `<option value="">Sin carpeta</option>`+state.folders.map(f=>`<option value="${esc(f.id)}"${value===f.id?' selected':''}>${esc(f.name)}</option>`).join('');}
 function folderButton(id,name,count,icon){return `<button type="button" data-folder="${esc(id)}" class="cases-folder${folder===id?' is-active':''}" aria-pressed="${folder===id}"><span class="icon">${window.CejProIcon(icon)}</span><span class="cases-folder-name">${esc(name)}</span><span class="cases-folder-count">${count}</span></button>`;}
 function mount(element){if(host)return;host=element;
 host.innerHTML=`<div id="caseListScreen" class="cases-list-shell"><div class="cases-top"><button type="button" id="newCase" class="cases-primary"><span aria-hidden="true">＋</span> Nuevo caso</button></div>
 <div class="cases-layout"><aside class="cases-folders" aria-label="Carpetas de casos"><div class="cases-folder-heading"><h2>Carpetas</h2></div><button type="button" id="newFolder" class="cases-new-folder"><span aria-hidden="true">＋</span> Nueva carpeta</button><nav id="caseFolderNav" aria-label="Filtrar casos por carpeta"></nav></aside>
 <section class="cases-panel" aria-labelledby="caseListTitle"><div class="cases-panel-heading"><div><h2 id="caseListTitle">Todos los casos</h2><p id="caseListDescription">Tu archivo de trabajo, en un solo lugar.</p></div><span id="caseListCount" class="cases-result-count" role="status" aria-live="polite"></span></div>
 <div class="cases-toolbar"><label class="cases-search"><span class="cases-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></span><input type="search" id="caseSearch" aria-label="Buscar casos" placeholder="Buscar caso, expediente o cliente…" maxlength="180"></label><label class="cases-status-filter"><span class="sr-only">Filtrar por estado</span><select id="caseStatus"><option value="all">Todos los estados</option>${Object.entries(D.statuses).map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label></div>
 <div class="cases-table-wrap" id="caseTableWrap"><table class="cases-table"><caption class="sr-only">Listado de casos registrados manualmente</caption><thead><tr><th scope="col">Caso y expediente</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col">Carpeta</th><th scope="col"><span class="sr-only">Acciones</span></th></tr></thead><tbody id="caseRows"></tbody></table></div>
 <div id="casesEmpty" class="cases-empty" hidden><span class="cases-empty-icon icon">${window.CejProIcon('folder')}</span><h3 id="casesEmptyTitle">No hay resultados</h3><p id="casesEmptyText"></p><button type="button" class="cases-secondary" id="clearCasesFilters">Limpiar filtros</button><button type="button" class="cases-secondary" id="addFirstCase" hidden>Nuevo caso</button></div>
 <div class="cases-pagination" id="casePagination"><span id="casePageSummary"></span><div><button type="button" id="casesPrev" aria-label="Página anterior">‹</button><span id="casePageLabel"></span><button type="button" id="casesNext" aria-label="Página siguiente">›</button></div></div></section></div>
 <p class="cases-notice" id="casesNotice" role="status" aria-live="polite"></p>
 </div><section id="caseDetailScreen" hidden aria-label="Ficha del caso"></section>
 <dialog id="caseDialog" class="cases-dialog" aria-labelledby="caseDialogTitle"><form id="caseForm"><div class="cases-dialog-heading"><div><p class="cases-overline">MI ARCHIVO</p><h2 id="caseDialogTitle">Nuevo caso</h2></div><button type="button" class="cases-icon-button" id="closeCaseDialog" aria-label="Cerrar caso">×</button></div><div class="cases-form-body"><div class="cases-main-fields"><label>Título del caso<input name="title" required maxlength="120" placeholder="Ej. Beneficios sociales"></label><label>Número de expediente (opcional)<input name="number" maxlength="180" placeholder="Número o referencia del expediente"></label><label>Cliente (opcional)<input name="client" maxlength="180" placeholder="Nombre del cliente"></label><div class="cases-form-row"><label>Estado<select name="status">${Object.entries(D.statuses).map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label><label>Carpeta<select name="folderId"></select></label></div></div><div class="cases-optional-fields" aria-label="Nota y archivos opcionales"><label class="cases-note-field">Agregar nota (opcional)<textarea name="note" rows="5" maxlength="2000" placeholder="Anota lo que necesitas recordar sobre este caso…"></textarea></label><div id="caseAttachments"></div></div></div><div class="cases-dialog-footer"><button type="button" class="cases-secondary" id="cancelCase">Cancelar</button><button type="submit" class="cases-primary">Guardar caso</button></div></form></dialog>
 <dialog id="folderDialog" class="cases-dialog cases-folder-dialog" aria-labelledby="folderDialogTitle"><form id="folderForm"><div class="cases-dialog-heading"><div><p class="cases-overline">ORGANIZAR</p><h2 id="folderDialogTitle">Nueva carpeta</h2></div><button type="button" class="cases-icon-button" id="closeFolderDialog" aria-label="Cerrar carpeta">×</button></div><div class="cases-form-body"><label>Nombre de la carpeta<input name="name" required maxlength="40" placeholder="Ej. Casos de mi estudio"></label><p id="folderError" class="cases-form-error" role="alert" hidden></p></div><div class="cases-dialog-footer"><button type="button" id="cancelFolder" class="cases-secondary">Cancelar</button><button type="submit" class="cases-primary">Crear carpeta</button></div></form></dialog>`;
 F.mount($('caseAttachments'));
 window.CejProCaseDetail.mount($('caseDetailScreen'),{getCase:id=>state.cases.find(c=>c.id===id),folderName,editCase:openCase,refreshList:render,updateNote:(id,note)=>{const c=state.cases.find(c=>c.id===id);if(!c)return false;c.note=note;const saved=D.save(state);render();return saved;}});
 $('newCase').onclick=()=>openCase();$('addFirstCase').onclick=()=>openCase();$('newFolder').onclick=openFolder;
 $('caseSearch').addEventListener('input',e=>{search=e.target.value;page=1;render();});
 $('caseStatus').addEventListener('change',e=>{status=e.target.value;page=1;render();});
 $('caseFolderNav').addEventListener('click',e=>{const b=e.target.closest('[data-folder]');if(b){folder=b.dataset.folder;page=1;render();}});
 $('caseRows').addEventListener('click',e=>{
  const edit=e.target.closest('[data-edit-case]');if(edit){openCase(edit.dataset.editCase);return;}
  if(e.target.closest('a,button,input,select,textarea,label')||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  if(window.getSelection()?.toString())return;
  const row=e.target.closest('[data-open-case]');if(row)location.hash='expedientes/'+encodeURIComponent(row.dataset.openCase)+'/resumen';
 });
 $('casesPrev').onclick=()=>{page--;render();};$('casesNext').onclick=()=>{page++;render();};
 $('clearCasesFilters').onclick=()=>{search='';status='all';$('caseSearch').value='';$('caseStatus').value='all';page=1;render();};
 for(const [button,dialog] of [['closeCaseDialog','caseDialog'],['cancelCase','caseDialog'],['closeFolderDialog','folderDialog'],['cancelFolder','folderDialog']])$(button).onclick=()=>$(dialog).close();
 $('caseForm').addEventListener('submit',saveCase);$('folderForm').addEventListener('submit',saveFolder);
 $('folderForm').elements.namedItem('name').addEventListener('input',()=>{$('folderError').hidden=true;});
 render();
 }
 function render(){
  const list=D.query(state,{folder,status,search}),pages=Math.max(1,Math.ceil(list.length/pageSize));page=Math.max(1,Math.min(page,pages));
  const current=list.slice((page-1)*pageSize,page*pageSize);
  const countFor=id=>state.cases.filter(c=>id==='all'||c.folderId===(id==='unfiled'?'':id)).length;
  $('caseFolderNav').innerHTML=folderButton('all','Todos los casos',countFor('all'),'layers')+folderButton('unfiled','Sin carpeta',countFor('unfiled'),'file')+'<div class="cases-folder-divider"></div>'+state.folders.map(f=>folderButton(f.id,f.name,countFor(f.id),'folder')).join('');
  $('caseListTitle').textContent=folder==='all'?'Todos los casos':folder==='unfiled'?'Sin carpeta':folderName(folder);
  $('caseListDescription').textContent=folder==='all'?'Tu archivo de trabajo, en un solo lugar.':'Los asuntos que has reunido en esta carpeta.';
  $('caseListCount').textContent=`${list.length} ${list.length===1?'caso':'casos'}`;
  $('caseRows').innerHTML=current.map(c=>`<tr data-open-case="${esc(c.id)}"><td data-label="Caso y expediente" class="cases-title-cell"><strong><a class="cases-open-link" href="#expedientes/${encodeURIComponent(c.id)}/resumen">${esc(c.title)}</a></strong><span>${esc(c.number||'Sin número de expediente')}</span>${c.note?`<div class="cases-note-preview"><p>${esc(c.note)}</p><a href="#expedientes/${encodeURIComponent(c.id)}/notas" class="cases-read-note" aria-label="Ver nota de ${esc(c.title)}">Ver nota</a></div>`:''}${F.count(c.id)?`<a href="#expedientes/${encodeURIComponent(c.id)}/documentos" class="cases-read-note cases-file-count">${F.count(c.id)} ${F.count(c.id)===1?'archivo':'archivos'}</a>`:''}</td><td data-label="Cliente">${esc(c.client||'Sin cliente asociado')}</td><td data-label="Estado"><span class="cases-status status-${c.status}"><i></i>${D.statuses[c.status]}</span></td><td data-label="Carpeta"><span class="cases-folder-tag">${esc(folderName(c.folderId))}</span></td><td class="cases-actions"><div class="cases-row-actions"><a class="cases-open-action" href="#expedientes/${encodeURIComponent(c.id)}/resumen" aria-label="Abrir ficha de ${esc(c.title)}">Abrir <span aria-hidden="true">↗</span></a><button type="button" class="cases-row-action" data-edit-case="${esc(c.id)}" aria-label="Editar o mover ${esc(c.title)}" title="Editar o mover caso">⋯</button></div></td></tr>`).join('');
  $('caseTableWrap').hidden=!list.length;$('casesEmpty').hidden=!!list.length;
  const filtered=!!search.trim()||status!=='all';
  $('casesEmptyTitle').textContent=filtered?'No encontramos coincidencias':'Esta carpeta está lista para tus casos';
  $('casesEmptyText').textContent=filtered?'Prueba con otro término o ajusta los filtros.':'Agrega un caso y comienza a organizar tu trabajo.';
  $('clearCasesFilters').hidden=!filtered;$('addFirstCase').hidden=filtered;
  $('casePageSummary').textContent=list.length?`Mostrando ${(page-1)*pageSize+1}–${Math.min(page*pageSize,list.length)} de ${list.length}`:'Sin casos para mostrar';
  $('casePageLabel').textContent=`${page} / ${pages}`;$('casesPrev').disabled=page<=1;$('casesNext').disabled=page>=pages;
 }
 function openCase(id){
  const form=$('caseForm'),c=state.cases.find(c=>c.id===id);form.reset();form.dataset.editing=c?.id||'';
  $('caseDialogTitle').textContent=c?'Editar caso':'Nuevo caso';
  const values=c||{title:'',number:'',client:'',status:'active',folderId:state.folders.some(f=>f.id===folder)?folder:'',note:''};
  form.elements.namedItem('folderId').innerHTML=folderOptions(values.folderId);
  for(const key of ['title','number','client','status','folderId'])form.elements.namedItem(key).value=values[key];
  form.elements.namedItem('note').value=values.note||'';
  F.begin(c?.id||'');
  form.elements.namedItem('title').setCustomValidity('');
  $('caseDialog').showModal();
 }
 function notify(message){$('casesNotice').textContent=message+(D.save(state)?' Guardado en este navegador.':' No se pudo guardar: los cambios durarán solo durante esta visita.');}
 function saveCase(e){e.preventDefault();const form=$('caseForm'),data=new FormData(form),title=String(data.get('title')).trim();
  if(!title){const input=form.elements.namedItem('title');input.setCustomValidity('Escribe un título para el caso.');input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}
  const c={id:form.dataset.editing||uid('case'),title,number:String(data.get('number')).trim(),client:String(data.get('client')).trim(),status:data.get('status'),folderId:data.get('folderId'),note:String(data.get('note')||'').trim()};
  const index=state.cases.findIndex(item=>item.id===c.id);if(index>=0)state.cases[index]=c;else state.cases.unshift(c);
  folder=c.folderId||'unfiled';status='all';search='';page=1;$('caseSearch').value='';$('caseStatus').value='all';
  const filesSaved=F.commit(c.id,c.folderId);
  notify(index>=0?'Caso actualizado.':'Caso creado.');
  if(!filesSaved)$('casesNotice').textContent+=' No se pudieron guardar las referencias de los archivos; estarán disponibles durante esta visita.';$('caseDialog').close();render();showRoute(location.hash.slice(1));
 }
 function openFolder(){ $('folderForm').reset();$('folderError').hidden=true;$('folderDialog').showModal(); }
 function saveFolder(e){e.preventDefault();const name=String(new FormData($('folderForm')).get('name')).trim();
  if(!name||state.folders.some(f=>D.normalize(f.name)===D.normalize(name))){$('folderError').textContent=!name?'Escribe un nombre para la carpeta.':'Ya existe una carpeta con ese nombre.';$('folderError').hidden=false;return;}
  const f={id:uid('folder'),name};state.folders.push(f);folder=f.id;search='';status='all';page=1;$('caseSearch').value='';$('caseStatus').value='all';
  notify('Carpeta creada.');$('folderDialog').close();render();
 }
 function showRoute(route='expedientes'){
  const parts=route.split('/');let id='';try{id=parts[1]?decodeURIComponent(parts[1]):'';}catch(_){id='invalid';}
  $('caseListScreen').hidden=!!id;$('caseDetailScreen').hidden=!id;
  if(id)window.CejProCaseDetail.render(id,parts[2]||'resumen');
 }
 window.CejProCases={mount,showRoute};
})();
