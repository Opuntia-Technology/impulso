(() => {
  // Preserve old links shared before the presentation page was introduced.
  if (['#hoy','#ciclos','#habitos','#ajustes'].includes(location.hash)) {
    location.replace('./app.html'+location.hash);
    return;
  }
  const link=document.getElementById('apk');
  async function findApk() {
    for (const apk of ['./downloads/Impulso.apk','./downloads/impulso.apk','./downloads/app-debug.apk']) {
      try {
        const response=await fetch(apk,{method:'HEAD',cache:'no-store'});
        if(!response.ok || (response.headers.get('content-type')||'').includes('text/html'))continue;
        const updated=document.getElementById('apk-updated');
        const modified=new Date(response.headers.get('last-modified')||'');
        if(updated)updated.textContent=Number.isNaN(modified.getTime())?'Fecha de actualización Android no informada por el servidor.':'Última actualización del APK publicado: '+modified.toLocaleDateString('es-AR',{timeZone:'America/Argentina/Buenos_Aires',day:'numeric',month:'long',year:'numeric'});
    const version=response.headers.get('etag') || response.headers.get('last-modified') || String(Date.now());
    link.href=apk+'?v='+encodeURIComponent(version);link.download='Impulso.apk';link.removeAttribute('aria-disabled');link.textContent='Descargar para Android ↓';
    document.getElementById('apk-note').textContent='Descargá el APK y abrilo en Android. Para actualizar, instalalo sobre Impulso sin desinstalarla.';
        return;
      } catch (_) { }
    }
    const updated=document.getElementById('apk-updated');
    if(updated)updated.textContent='Fecha del APK no disponible. Conectate a Internet para consultarla.';
  }
  findApk();
  // Install the updated worker from the home page as well, to replace older caches.
  if('serviceWorker' in navigator && window.isSecureContext)navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(()=>{});
})();
