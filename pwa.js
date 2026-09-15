(() => {
  let offlineReady = false;
  let updateReady = false;
  let installPrompt = null;
  function renderInstall() {
    const settings = document.querySelector('#content .settings');
    if (!settings) return;
    let card = document.getElementById('pwa-install');
    if (!card) {
      card = document.createElement('section');
      card.id = 'pwa-install'; card.className = 'card'; card.style.marginBottom = '18px';
      settings.prepend(card);
    }
    card.innerHTML = '<h2>Impulso, siempre a mano</h2><p class="sub">En iPhone: abrí este enlace en Safari, tocá Compartir y elegí Agregar a pantalla de inicio. Si aparece Abrir como app web, activalo. Después abrí Impulso desde su ícono.</p><p class="sub">En Android o computadora, buscá Instalar aplicación en el menú del navegador.</p>';
    const status = document.createElement('p'); status.className = 'notice';
    status.textContent = offlineReady ? 'Lista para usar sin conexión en este navegador. Abrí también el ícono instalado una vez con Internet antes de usarlo sin conexión.' : 'Conectate a Internet para completar la preparación sin conexión.';
    card.append(status);
    if (installPrompt) {
      const button = document.createElement('button'); button.className = 'button dark'; button.textContent = 'Instalar Impulso';
      button.onclick = async () => { const prompt = installPrompt; if (!prompt) return; await prompt.prompt(); await prompt.userChoice; installPrompt = null; renderInstall(); };
      card.append(button);
    }
    if (updateReady) {
      const note = document.createElement('p'); note.className = 'sub';
      note.textContent = 'Hay una actualización preparada. Cuando termines de registrar, cerrá todas las ventanas de Impulso y volvé a abrirla para aplicarla.';
      card.append(note);
    }
    const privacy = document.createElement('p'); privacy.className = 'sub';
    privacy.textContent = 'Tus registros quedan en este dispositivo. No se sincronizan con Android ni con otros navegadores. Exportá una copia antes de borrar datos del navegador o cambiar de dispositivo. Esta versión web no envía recordatorios con la app cerrada.';
    card.append(privacy);
  }
  new MutationObserver(renderInstall).observe(document.getElementById('content'), {childList:true});
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; renderInstall(); });
  window.addEventListener('appinstalled', () => { installPrompt = null; renderInstall(); });
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('./sw.js', {scope:'./',updateViaCache:'none'}).then(reg => {
      updateReady = Boolean(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) { updateReady = true; renderInstall(); }
        });
      });
      return navigator.serviceWorker.ready;
    }).then(() => { offlineReady = true; renderInstall(); }).catch(() => { offlineReady = false; renderInstall(); });
  }
  renderInstall();
})();
