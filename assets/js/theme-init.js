/* Aplicar la preferencia antes de pintar la página. */
(() => {
 let theme = 'elegante';
 try { const saved = localStorage.getItem('cejpro.theme'); if (saved === 'rojo') { theme = 'elegante'; localStorage.setItem('cejpro.theme',theme); } else if (['elegante','claro','oscuro'].includes(saved)) theme = saved; } catch (_) { /* El tema sigue funcionando sin almacenamiento. */ }
 document.documentElement.dataset.theme = theme;
 document.documentElement.style.colorScheme = theme === 'oscuro' ? 'dark' : 'light';
})();
