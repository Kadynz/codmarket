const button = document.querySelector('#copy-button');
const code = document.querySelector('#codigo-mercado');
const status = document.querySelector('#copy-status');

button.hidden = false;
button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(code.textContent);
    status.textContent = 'Código copiado.';
    button.textContent = 'Copiado!';
    setTimeout(() => { button.textContent = 'Copiar tudo'; }, 2000);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Código selecionado. Pressione Ctrl+C ou use Copiar no seu dispositivo.';
  }
});
