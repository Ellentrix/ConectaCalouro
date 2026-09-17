/* ===========================================================
   ConectaCalouro — script.js
   Funções utilitárias usadas em várias páginas: navbar
   dinâmica (muda conforme o tipo de usuário logado),
   notificações (toast) e pequenas ajudas de UI.
   =========================================================== */

function ccToast(mensagem, tipo = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${tipo}`;
  toast.textContent = mensagem;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/**
 * Monta a barra de navegação de acordo com o usuário logado.
 * Espera encontrar um elemento <div id="navbar"></div> na página.
 */
function ccRenderNavbar(paginaAtual) {
  const alvo = document.getElementById("navbar");
  if (!alvo) return;

  const usuario = ccUsuarioLogado();

  const linkClasse = (nome) => (nome === paginaAtual ? "active" : "");

  let linksEsquerda = "";
  let areaDireita = "";

  if (usuario) {
    linksEsquerda = `
      <a href="inicio.html" class="${linkClasse('inicio')}">Início</a>
      <a href="materiais.html" class="${linkClasse('materiais')}">Materiais</a>
      <a href="dicas.html" class="${linkClasse('dicas')}">Dicas</a>
      <a href="interacao.html" class="${linkClasse('interacao')}">Mural</a>
      ${usuario.tipo === "admin" ? `<a href="admin.html" class="${linkClasse('admin')}">Administração</a>` : ""}
      <a href="perfil.html" class="${linkClasse('perfil')}">Perfil</a>
    `;
    const badgeClasse = { novato: "badge-novato", veterano: "badge-veterano", admin: "badge-admin" }[usuario.tipo];
    areaDireita = `
      <span class="nav-user">${usuario.nome}<span class="badge-tipo ${badgeClasse}">${ccRotuloTipo(usuario.tipo)}</span></span>
      <button id="btn-logout">Sair</button>
    `;
  } else {
    areaDireita = `
      <a href="login.html">Entrar</a>
      <a href="cadastro.html">Criar conta</a>
    `;
  }

  alvo.innerHTML = `
    <div class="navbar-inner">
      <a class="brand" href="${usuario ? 'inicio.html' : 'index.html'}">Conecta<span class="dot">Calouro</span></a>
      <div class="nav-links">${linksEsquerda}</div>
      <div class="nav-links">${areaDireita}</div>
    </div>
  `;

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      ccLogout();
    });
  }
}

function ccEscapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/**
 * RF06 / Regra de negócio 3 — Denúncias.
 * Qualquer usuário logado pode denunciar um conteúdo (material,
 * dica ou publicação do mural). A denúncia fica registrada como
 * "pendente" até um administrador avaliar (ver admin.js).
 */
function ccDenunciar(tipoConteudo, conteudoId, tituloConteudo) {
  const usuario = ccUsuarioLogado();
  if (!usuario) {
    ccToast("Você precisa estar logado para denunciar.", "error");
    return;
  }

  const motivo = prompt(
    `Descreva o motivo da denúncia para: "${tituloConteudo}"`
  );
  if (motivo === null) return; // usuário cancelou
  if (!motivo.trim()) {
    ccToast("Informe um motivo para a denúncia.", "error");
    return;
  }

  const denuncias = ccGet(CC_KEYS.denuncias);
  denuncias.unshift({
    id: ccProximoId(denuncias),
    tipo: tipoConteudo,
    conteudoId: conteudoId,
    tituloConteudo: tituloConteudo,
    usuarioDenunciante: usuario.nome,
    motivo: motivo.trim(),
    data: ccDataHojeISO(),
    status: "pendente"
  });
  ccSet(CC_KEYS.denuncias, denuncias);
  ccToast("Denúncia registrada. Um administrador irá avaliar.", "success");
}
