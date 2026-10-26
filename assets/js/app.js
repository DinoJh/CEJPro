(() => {
 const $ = id => document.getElementById(id);
 const modules = window.CejProModules;
 const icon = window.CejProIcon;
 const navItem = m => `<a href="#${m.id}" class="nav-item" title="${m.label}"><span class="icon">${icon(m.icon)}</span><span class="nav-copy">${m.label}</span></a>`;
 $('primaryNav').innerHTML = modules.filter(m=>!m.utility&&!m.account).map(navItem).join('');
 $('utilityNav').innerHTML = modules.filter(m=>m.utility).map(navItem).join('');
 document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
 const mobile = window.matchMedia('(max-width: 760px)');
 let collapsed = false;
 function syncMenu() {
  const open = document.body.classList.contains('mobile-open');
  $('menuButton').setAttribute('aria-expanded',String(mobile.matches?open:!collapsed));
  $('menuButton').setAttribute('aria-label',mobile.matches?(open?'Cerrar navegación':'Abrir navegación'):(collapsed?'Expandir navegación':'Contraer navegación'));
  $('backdrop').hidden=!mobile.matches||!open;
  if(mobile.matches&&!open) $('sidebar').setAttribute('inert',''); else $('sidebar').removeAttribute('inert');
 }
 function closeMenu(){document.body.classList.remove('mobile-open');syncMenu();}
 function closeAccount(){ $('accountMenu').hidden=true; $('accountButton').setAttribute('aria-expanded','false'); }
 function updateBreadcrumb(m=modules.find(m=>m.id===location.hash.slice(1).split('/')[0])||modules[0]){
  const current=$('breadcrumbCurrent');current.replaceChildren();
  const caseTitle=m.id==='expedientes'&&location.hash.split('/')[1]?document.querySelector('#caseDetailScreen .detail-heading h1')?.textContent:m.id==='clientes'&&location.hash.split('/')[1]?document.querySelector('#clientsScreen .client-heading h1')?.textContent:m.id==='equipo'&&location.hash.split('/')[1]?document.querySelector('#teamScreen .team-heading h1')?.textContent:null;
  if(caseTitle){const link=document.createElement('a');link.href='#'+m.id;link.textContent=m.label;const divider=document.createElement('span');divider.className='breadcrumb-divider';divider.textContent='/';const title=document.createElement('span');title.textContent=caseTitle;title.setAttribute('aria-current','page');current.append(link,divider,title);}
  else current.textContent=m.label;
 }
 window.addEventListener('cejpro:case-render',()=>updateBreadcrumb());
 window.addEventListener('cejpro:client-render',()=>updateBreadcrumb());
 window.addEventListener('cejpro:team-render',()=>updateBreadcrumb());
 function render(){
  const route=location.hash.slice(1)||'calendario';
  const id=route.split('/')[0];
  const m=modules.find(m=>m.id===id)||modules[0];
  document.querySelectorAll('.nav-item').forEach(a=>{const active=a.hash==='#'+m.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('personalization').hidden=m.id!=='personalizar';
  document.querySelector('.workspace-canvas').hidden=['personalizar','calendario','expedientes','clientes','equipo'].includes(m.id);
  $('casesModule').hidden=m.id!=='expedientes';
  if(m.id==='expedientes'){window.CejProCases.mount($('casesModule'));window.CejProCases.showRoute(route);}
  $('clientsModule').hidden=m.id!=='clientes';
  if(m.id==='clientes'){window.CejProClients.mount($('clientsModule'));window.CejProClients.showRoute(route);}
  $('teamModule').hidden=m.id!=='equipo';
  if(m.id==='equipo'){window.CejProTeam.mount($('teamModule'));window.CejProTeam.showRoute(route);}
  document.querySelector('.page-heading').hidden=['expedientes','clientes','equipo'].includes(m.id)&&!!route.split('/')[1];
  $('calendarModule').hidden=m.id!=='calendario';
  if(m.id==='calendario') window.CejProCalendar.mount($('calendarModule'));
  $('pageTitle').textContent=m.title||m.label;
  $('pageDescription').textContent=m.description;
  $('eyebrow').textContent=m.account?'MI CUENTA':m.utility?'CENTRO DE AYUDA':'ESPACIO DE TRABAJO';
  updateBreadcrumb(m);
  $('canvasTitle').textContent=m.label;
  $('canvasIcon').innerHTML=icon(m.icon);
  $('emptyIcon').innerHTML=icon(m.icon);
  $('emptyTitle').textContent=m.emptyTitle||'Un espacio para '+m.label.toLowerCase();
  $('emptyDescription').textContent=m.emptyDescription||'Esta sección está lista para su siguiente etapa de diseño.';
  $('exploreLink').hidden=m.id!=='inicio';
  $('canvasFooter').textContent=m.id==='inicio'?'Una estructura común para todos tus módulos.':'El contenido de este módulo se incorporará en una próxima versión.';
  document.title='CEJ PRO · '+m.label;
  closeMenu();closeAccount();
 }
 $('menuButton').addEventListener('click',()=>{if(mobile.matches)document.body.classList.toggle('mobile-open');else{collapsed=!collapsed;document.body.classList.toggle('sidebar-collapsed',collapsed);}syncMenu();});
 $('backdrop').addEventListener('click',closeMenu);
 $('accountButton').addEventListener('click',()=>{const open=$('accountMenu').hidden;$('accountMenu').hidden=!open;$('accountButton').setAttribute('aria-expanded',String(open));});
 document.addEventListener('click',e=>{if(!e.target.closest('.sidebar-bottom'))closeAccount();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(document.querySelector('dialog[open]'))return;closeAccount();closeMenu();$('menuButton').focus();}});
 mobile.addEventListener('change',closeMenu);
 window.addEventListener('hashchange',()=>{if(location.hash==='#main')return;render();$('main').focus({preventScroll:true});});
 render();
})();
