function recarregarAoMeiaNoite() {
  const agora = new Date();

  // Próxima meia-noite (amanhã, 00:00:00)
  const proximaMeiaNoite = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate() + 1, // amanhã
    0, 0, 0, 0
  );

  const tempoRestante = proximaMeiaNoite - agora; // diferença em ms

  setTimeout(() => {
    window.location.reload();
  }, tempoRestante);
}

window.addEventListener('load', recarregarAoMeiaNoite);