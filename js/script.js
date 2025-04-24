function toggleDetalhes(id, btn) {
  const detalhes = document.getElementById(id);
  detalhes.classList.toggle("ativo");
  btn.classList.toggle("rotated");
}
