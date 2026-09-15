(() => {
  const bridge = window.ImpulsoReminders;
  function renderReminder() {
    const settings = document.querySelector('#content .settings');
    if (!settings) return;
    let card = document.getElementById('reminder-settings');
    if (!card) {
      card = document.createElement('section');
      card.id = 'reminder-settings';
      card.className = 'card';
      card.style.marginBottom = '18px';
      settings.prepend(card);
    }
    const status = bridge ? bridge.status() : 'web';
    card.innerHTML = '<h2>Tu impulso de las 20:00</h2><p class="sub">Una frase cada día y una invitación: «¿Ya registraste tu impulso diario?». Son 100 frases originales, sin atribución a autores, que rotan sin repetirse hasta completar la lista.</p><p class="sub">También recibirás avisos al registrar un día de margen y al confirmar que retomaste. Horario de Argentina, estés donde estés. Android puede demorar la entrega por ahorro de batería.</p>';
    const note = document.createElement('p');
    note.className = 'notice';
    note.textContent = {on:'Activado · todos los días a las 20:00 de Argentina.',off:'Desactivado. Activá el recordatorio cuando quieras.',blocked:'Recordatorio activado, pero Android está bloqueando sus notificaciones. Revisá los permisos.',web:'Los recordatorios funcionan en la aplicación Android instalada. Activarlos en el teléfono no depende de tener abierta esta página.'}[status];
    card.append(note);
    if (!bridge) return;
    const actions = document.createElement('div');
    actions.className = 'form-footer';
    actions.style.flexWrap = 'wrap';
    actions.style.justifyContent = 'flex-start';
    function button(label, action) { const b = document.createElement('button'); b.className = 'button'; b.textContent = label; b.onclick = action; actions.append(b); }
    button(status === 'off' ? 'Activar recordatorio' : 'Desactivar', () => bridge.toggle());
    if (status === 'on') button('Probar notificación', () => bridge.preview());
    button('Permisos de Android', () => bridge.settings());
    card.append(actions);
  }
  // app.js replaces content when navigating; avoid observing our own card edits.
  new MutationObserver(renderReminder).observe(document.getElementById('content'), {childList:true});
  window.addEventListener('reminderchange', renderReminder);
  renderReminder();
})();
