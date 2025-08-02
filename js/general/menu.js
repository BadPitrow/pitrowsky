let bloqueado = false;
let menuAtivo = false;

function ListOn() {
  if (bloqueado) return;
  bloqueado = true;

  const icon = document.querySelector('.header-menu i');

  icon.classList.add('fade-out');

  setTimeout(() => {
    const isBars = icon.classList.contains('fa-bars');
    icon.classList.remove('fade-out');
    icon.classList.remove(isBars ? 'fa-bars' : 'fa-xmark');
    icon.classList.add(isBars ? 'fa-xmark' : 'fa-bars');

    icon.classList.add('fade-in');

    setTimeout(() => {
      icon.classList.remove('fade-in');
      bloqueado = false;
    }, 300);

  }, 300);

  const list = document.querySelector('.header-list');
  list.classList.toggle('on');
  if (list.classList.contains('on')) {
    menuAtivo = true;
  } else {
    menuAtivo = false;
  }
}

function ativarElemento() {
    console.log('Clique efetuado com sucesso');
}

window.addEventListener('click', () => {
    if (menuAtivo) ListOn();
});