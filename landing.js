(() => {
  // Preserve old links shared before the presentation page was introduced.
  if (['#hoy','#ciclos','#habitos','#ajustes'].includes(location.hash)) {
    location.replace('./app.html'+location.hash);
    return;
  }
  const link=document.getElementById('apk');
  async function findApk() {
    for (const apk of ['./downloads/impulso.apk','./downloads/app-debug.apk']) {
      try {
        const response=await fetch(apk,{method:'HEAD',cache:'no-store'});
        if(!response.ok || (response.headers.get('content-type')||'').includes('text/html'))continue;
    link.href=apk;link.download='Impulso.apk';link.removeAttribute('aria-disabled');link.textContent='Descargar para Android ↓';
    document.getElementById('apk-note').textContent='Descargá el APK y abrilo en Android. Para actualizar, instalalo sobre Impulso sin desinstalarla.';
        return;
      } catch (_) { }
    }
  }
  findApk();
  // Install the updated worker from the home page as well, to replace older caches.
  if('serviceWorker' in navigator && window.isSecureContext)navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(()=>{});
})();
