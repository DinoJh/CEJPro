/* Directorio interno; no crea usuarios ni concede permisos de acceso. */
window.CejProTeamData=(()=>{
 const key='cejpro.team.v1',roles=['Socio/a','Abogado/a','Asistente legal','Administración','Otro'];
 function valid(items){const ids=new Set();return Array.isArray(items)&&items.every(m=>{if(!m||typeof m.id!=='string'||!m.id||ids.has(m.id)||!['name','email','phone','specialty','note'].every(k=>typeof m[k]==='string')||!m.name.trim()||m.name.length>180||m.email.length>180||m.phone.length>50||m.specialty.length>100||m.note.length>2000||(typeof m.role!=='string'||!m.role.trim()||m.role.length>80)||!['active','inactive'].includes(m.status)||!Array.isArray(m.caseIds)||!m.caseIds.every(id=>typeof id==='string'))return false;ids.add(m.id);return true;});}
 function load(){try{const data=JSON.parse(localStorage.getItem(key));if(valid(data))return data;}catch(_){}return [];}
 function save(items){try{localStorage.setItem(key,JSON.stringify(items));return true;}catch(_){return false;}}
 function loadGroups(){try{const data=JSON.parse(localStorage.getItem('cejpro.team.groups.v1')),ids=new Set(),names=new Set();if(Array.isArray(data)&&data.every(g=>{if(!g||typeof g.id!=='string'||!g.id||ids.has(g.id)||typeof g.name!=='string'||!g.name.trim()||g.name.length>60||names.has(g.name.trim().toLocaleLowerCase())||!Array.isArray(g.memberIds)||!g.memberIds.every(id=>typeof id==='string')||(g.folderIds!==undefined&&(!Array.isArray(g.folderIds)||!g.folderIds.every(id=>typeof id==='string'))))return false;ids.add(g.id);names.add(g.name.trim().toLocaleLowerCase());return true;}))return data.map(g=>({...g,folderIds:g.folderIds||[]}));}catch(_){}return [];}
 function saveGroups(groups){try{localStorage.setItem('cejpro.team.groups.v1',JSON.stringify(groups));return true;}catch(_){return false;}}
 return {load,save,roles,loadGroups,saveGroups};
})();
