/* Follow the visible viewport, including software keyboard and orientation changes. */
(() => {
  const dialog = document.getElementById('modal');
  let frame;
  function update() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const viewport = window.visualViewport;
      document.documentElement.style.setProperty('--form-height', `${viewport?.height ?? window.innerHeight}px`);
      document.documentElement.style.setProperty('--form-top', `${viewport?.offsetTop ?? 0}px`);
      const field = document.activeElement;
      if (!dialog.open || !field || !dialog.contains(field) || !field.matches('input,textarea,select')) return;
      const box = field.getBoundingClientRect();
      const bounds = dialog.getBoundingClientRect();
      // Scroll the dialog itself, keeping the page behind it stationary.
      const margin = 48;
      if (box.bottom > bounds.bottom - margin) dialog.scrollTop += box.bottom - bounds.bottom + margin;
      else if (box.top < bounds.top + margin) dialog.scrollTop += box.top - bounds.top - margin;
    });
  }
  dialog.addEventListener('focusin', update);
  window.addEventListener('resize', update);
  window.visualViewport?.addEventListener('resize', update);
  window.visualViewport?.addEventListener('scroll', update);
  new MutationObserver(update).observe(dialog, {attributes:true,attributeFilter:['open']});
  update();
})();
