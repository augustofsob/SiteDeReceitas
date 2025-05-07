function toggleDetalhes(id, btn) {
  const detalhes = document.getElementById(id);
  detalhes.classList.toggle("ativo");
  btn.classList.toggle("rotated");

}

// ---------- Carrinho --------------//


let carrinho = [];

function alterarQuantidade(botao, valor) {
  const container = botao.closest('.quantidade');
  const span = container.querySelector('.qtd');
  let quantidade = parseInt(span.textContent);

  if (!isNaN(quantidade) && quantidade + valor >= 1) {
    span.textContent = quantidade + valor;
  }
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(nome, quantidade) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += parseInt(quantidade);
  } else {
    carrinho.push({ nome: nome, quantidade: parseInt(quantidade), preco: 20 });
  }

  atualizarCarrinho();
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total-carrinho');
  const contador = document.getElementById('cart-count');

  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nome} - R$ ${item.preco} x ${item.quantidade} 
      <button onclick="aumentarQuantidade('${item.nome}')">+</button>
      <button onclick="diminuirQuantidade('${item.nome}')">-</button>
      <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>`;
    lista.appendChild(li);

    total += item.preco * item.quantidade;
  });

  totalSpan.textContent = total.toFixed(2);
  contador.textContent = `(${carrinho.length})`;
}

function aumentarQuantidade(itemNome) {
  const item = carrinho.find(i => i.nome === itemNome);
  if (item) {
    item.quantidade += 1;
    atualizarCarrinho();
  }
}

function diminuirQuantidade(itemNome) {
  const item = carrinho.find(i => i.nome === itemNome);
  if (item && item.quantidade > 1) {
    item.quantidade -= 1;
    atualizarCarrinho();
  }
}

function removerDoCarrinho(itemNome) {
  carrinho = carrinho.filter(item => item.nome !== itemNome);
  atualizarCarrinho();
}

function abrirCarrinho(event) {
  event.stopPropagation(); 
  document.getElementById('cart-modal').style.display = 'block';
}

function fecharCarrinho() {
  document.getElementById('cart-modal').style.display = 'none';
}

function finalizarCompra() {
  if (carrinho.length > 0) {
    let total = 0;
    carrinho.forEach(item => total += item.preco * item.quantidade);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}. Obrigado pela sua compra!`);
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
  } else {
    alert("Seu carrinho está vazio!");
  }
}



// ---------- LOGIN ---------- //

const loginIcon = document.getElementById('login-icon');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');
const logoutSection = document.getElementById('logout-section');
const userNameDisplay = document.getElementById('user-name-display');
const loggedUser = document.getElementById('logged-user');
const loginBtn = document.getElementById('login-btn');

// Verifica se o usuário está logado ao carregar a página
function checkLogin() {
  const username = localStorage.getItem('username');

  if (username) {
    userNameDisplay.textContent = `Olá, ${username}`;
    loggedUser.textContent = username;
    loginForm.style.display = 'none';
    logoutSection.style.display = 'block';
  } else {
    userNameDisplay.textContent = '';
    loggedUser.textContent = '';
    loginForm.style.display = 'block';
    logoutSection.style.display = 'none';
  }
}

// Abre modal de login
loginIcon.addEventListener('click', () => {
  loginModal.style.display = 'block';
  checkLogin();
});

// Fecha modal ao clicar no botão X
closeModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Fecha modal ao clicar fora
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

// Realiza login
loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username && password) {
    localStorage.setItem('username', username);
    loginModal.style.display = 'none';
    checkLogin();
  } else {
    alert("Preencha nome de usuário e senha.");
  }
});

// Logout
function logout() {
  localStorage.removeItem('username');
  checkLogin();
}

// Verifica login ao abrir página
window.addEventListener('load', checkLogin);

const formComentario = document.getElementById('form-comentario');
const listaComentarios = document.getElementById('lista-comentarios');

// Enviar comentário
formComentario.addEventListener('submit', (e) => {
  e.preventDefault();

  const textoComentario = document.getElementById('comentario-texto').value.trim();
  const username = localStorage.getItem('username');

  if (!username) {
    alert("Você precisa estar logado para comentar.");
    return;
  }

  if (textoComentario === "") {
    alert("Escreva algo antes de comentar.");
    return;
  }

  // Criar elemento de comentário
  const comentarioDiv = document.createElement('div');
  comentarioDiv.classList.add('comentario-item');

  comentarioDiv.innerHTML = `
    <strong>${username}</strong><br>
    <p>${textoComentario}</p>
    <hr>
    <button class="editar-btn">Editar</button>
    <button class="excluir-btn">Excluir</button>
  `;

  // Verifica se o comentário foi feito pelo usuário logado
  if (username === localStorage.getItem('username')) {
    comentarioDiv.classList.add('autor');  // Adiciona classe "autor" se o comentário for do usuário logado
  }

  // Adiciona o comentário na lista
  listaComentarios.appendChild(comentarioDiv);

  // Limpa o campo de texto
  document.getElementById('comentario-texto').value = '';

  // Funcionalidade dos botões (Editar e Excluir)
  const editarBtn = comentarioDiv.querySelector('.editar-btn');
  const excluirBtn = comentarioDiv.querySelector('.excluir-btn');

  // Editar comentário
  editarBtn.addEventListener('click', () => {
    const novoTexto = prompt("Edite seu comentário:", textoComentario);
    if (novoTexto) {
      comentarioDiv.querySelector('p').textContent = novoTexto;
    }
  });

  // Excluir comentário
  excluirBtn.addEventListener('click', () => {
    if (confirm("Tem certeza que deseja excluir este comentário?")) {
      listaComentarios.removeChild(comentarioDiv);
    }
  });
});

// Verifica login ao abrir página
window.addEventListener('load', checkLogin);
// Função para salvar os comentários no localStorage
function salvarComentarios() {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

// Criar array para armazenar os comentários
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

// Enviar comentário
formComentario.addEventListener('submit', (e) => {
  e.preventDefault();

  const textoComentario = document.getElementById('comentario-texto').value.trim();
  const username = localStorage.getItem('username');

  if (!username) {
    alert("Você precisa estar logado para comentar.");
    return;
  }

  // Gerar um ID único para cada comentário
  const comentarioId = Date.now();

  // Adicionar o novo comentário ao array de comentários
  comentarios.push({ id: comentarioId, usuario: username, texto: textoComentario });

  // Salvar os comentários no localStorage
  salvarComentarios();

  // Exibir o comentário na lista
  exibirComentario({ id: comentarioId, usuario: username, texto: textoComentario });

  // Limpar o campo de texto
  document.getElementById('comentario-texto').value = '';
});




