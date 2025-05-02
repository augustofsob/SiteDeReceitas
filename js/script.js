function toggleDetalhes(id, btn) {
  const detalhes = document.getElementById(id);
  detalhes.classList.toggle("ativo");
  btn.classList.toggle("rotated");
}



// ---------- comunidade -------- //

document.getElementById('form-comentario').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const texto = document.getElementById('comentario-texto').value.trim();

  if (!nome || !texto) return;

  const comentario = document.createElement('div');
  comentario.className = 'comentario';

  const conteudo = document.createElement('p');
  conteudo.textContent = texto;
  conteudo.className = 'comentario-texto';

  const autor = document.createElement('small');
  autor.textContent = `Autor: ${nome}`;
  autor.className = 'comentario-autor';

  const botoes = document.createElement('div');
  botoes.className = 'comentario-botoes';

  const btnEditar = document.createElement('button');
  btnEditar.textContent = 'Editar';
  btnEditar.addEventListener('click', function () {
    const nomeDigitado = document.getElementById('nome').value.trim();
    if (nomeDigitado === nome) {
      const novoTexto = prompt('Edite seu comentário:', conteudo.textContent);
      if (novoTexto) {
        conteudo.textContent = novoTexto;
      }
    } else {
      alert('Você só pode editar seus próprios comentários!');
    }
  });

  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = 'Excluir';
  btnExcluir.addEventListener('click', function () {
    const nomeDigitado = document.getElementById('nome').value.trim();
    if (nomeDigitado === nome) {
      comentario.remove();
    } else {
      alert('Você só pode excluir seus próprios comentários!');
    }
  });

  botoes.appendChild(btnEditar);
  botoes.appendChild(btnExcluir);

  comentario.appendChild(conteudo);
  comentario.appendChild(autor);
  comentario.appendChild(botoes);

  document.getElementById('lista-comentarios').appendChild(comentario);

  document.getElementById('comentario-texto').value = '';
});
