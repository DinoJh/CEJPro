/* Clientes locales. Las asociaciones se conservan mediante el ID del caso. */
window.CejProClientsData=(()=>{
 const key='cejpro.clients.v1',normalize=window.CejProCasesData.normalize;
 function initial(){const clients=[];for(const c of window.CejProCasesData.load().cases){if(!c.client.trim())continue;let client=clients.find(x=>normalize(x.name)===normalize(c.client));if(!client){client={id:'client-'+crypto.randomUUID(),name:c.client,type:'person',document:'',phone:'',email:'',notes:'',caseIds:[]};clients.push(client);}client.caseIds.push(c.id);}return clients;}
 function valid(items){const ids=new Set();return Array.isArray(items)&&items.every(c=>{if(!c||typeof c.id!=='string'||!c.id||ids.has(c.id)||!['person','company'].includes(c.type)||!['name','document','phone','email','notes'].every(k=>typeof c[k]==='string')||!c.name.trim()||c.name.length>180||c.document.length>40||c.phone.length>50||c.email.length>180||c.notes.length>2000||!Array.isArray(c.caseIds)||!c.caseIds.every(id=>typeof id==='string'))return false;ids.add(c.id);return true;});}
 function save(items){try{window.CejProStorage.setItem(key,JSON.stringify(items));return true;}catch(_){return false;}}
 function load(){try{const raw=window.CejProStorage.getItem(key);if(raw!==null){const data=JSON.parse(raw);if(valid(data))return data;}}catch(_){}const items=initial();save(items);return items;}
 return {load,save,normalize};
})();
