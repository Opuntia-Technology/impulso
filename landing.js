(() => {
  // Preserve old links shared before the presentation page was introduced.
  if (['#hoy','#ciclos','#habitos','#ajustes'].includes(location.hash)) {
    location.replace('./app.html'+location.hash);
    return;
  }
  const link=document.getElementById('apk');
  const apk='./downloads/impulso.apk';
  fetch(apk,{method:'HEAD',cache:'no-store'}).then(response=>{
    if(!response.ok || (response.headers.get('content-type')||'').includes('text/html'))return;
    link.href=apk;link.download='Impulso.apk';link.removeAttribute('aria-disabled');link.textContent='Descargar para Android ↓';
    document.getElementById('apk-note').textContent='Descargá el APK y abrilo en Android. Para actualizar, instalalo sobre Impulso sin desinstalarla.';
  }).catch(()=>{});
  // Install the updated worker from the home page as well, to replace older caches.
  if('serviceWorker' in navigator && window.isSecureContext)navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(()=>{});
})();
