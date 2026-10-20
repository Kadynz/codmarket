const sections = [...document.querySelectorAll('main > section')];
const navigation = [...document.querySelectorAll('nav a')];
const status = document.querySelector('#copy-status');

function showStep(focusHeading = false) {
  if (location.hash === '#conteudo') return;
  const selected = sections.find(section => `#${section.id}` === location.hash) || sections[0];
  sections.forEach(section => { section.hidden = section !== selected; });
  navigation.forEach(link => {
    if (link.hash === `#${selected.id}`) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('.intro').hidden = selected !== sections[0];
  status.textContent = '';
  if (focusHeading) {
    selected.querySelector('h2').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

window.addEventListener('hashchange', () => showStep(true));
showStep();

document.querySelectorAll('[data-copy]').forEach(button => {
  const label = button.textContent;
  button.hidden = false;
  button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copy);
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'Código copiado. Cole no arquivo indicado dentro do jogo.';
      button.textContent = 'Copiado!';
      setTimeout(() => { button.textContent = label; }, 2000);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'A cópia automática não foi permitida. Código selecionado: pressione Ctrl+C ou use Copiar no seu dispositivo.';
    }
  });
});
