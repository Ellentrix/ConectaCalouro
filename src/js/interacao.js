/* ===========================================================
   ConectaCalouro — interacao.js
   RF05 — Interação entre alunos (mural/fórum simples, sem chat
   em tempo real). Qualquer aluno logado (novato, veterano ou
   admin) pode publicar no mural, comentar e denunciar — o
   objetivo aqui é justamente ajudar o novato a se aproximar de
   outros alunos, então a publicação não fica restrita a
   veteranos (diferente de materiais e dicas).
   =========================================================== */

let ccUsuarioAtualInteracao = null;

function ccInicializarInteracao() {
  ccUsuarioAtualInteracao = ccProtegerPagina();
  if (!ccUsuarioAtualInteracao) return;

  ccRenderNavbar("interacao");

  const form = document.getElementById("form-publicacao");
  form.addEventListener("submit", ccCriarPublicacao);

  ccRenderPublicacoes();
}

function ccRenderPublicacoes() {
  const publicacoes = ccGet(CC_KEYS.publicacoes).slice().sort((a, b) => (a.data < b.data ? 1 : -1));
  const lista = document.getElementById("lista-publicacoes");

  if (publicacoes.length === 0) {
    lista.innerHTML = `<div class="empty-state">Ainda não há publicações no mural. Seja o primeiro a postar!</div>`;
    return;
  }

  lista.innerHTML = publicacoes
    .map(
      (p) => `
    <div class="post">
      <div class="post-head">
        <span class="autor">${ccEscapeHtml(p.autor)}</span>
        <span class="data">${ccFormatarData(p.data)}</span>
      </div>
      <div class="texto">${ccEscapeHtml(p.texto)}</div>
      <div class="actions">
        <button class="btn btn-sm btn-outline" onclick="ccDenunciar('publicacao', ${p.id}, '${ccEscapeHtml(p.texto).slice(0, 40).replace(/'/g, "\\'")}')">Denunciar</button>
      </div>
      <div class="comentarios" id="comentarios-${p.id}">
        ${p.comentarios
          .map(
            (c) => `<div class="comentario"><b>${ccEscapeHtml(c.autor)}:</b> ${ccEscapeHtml(c.texto)}</div>`
          )
          .join("")}
      </div>
      <form class="comment-form" onsubmit="return ccComentar(event, ${p.id})">
        <input type="text" placeholder="Escreva um comentário..." maxlength="200" required />
        <button class="btn btn-sm btn-primary" type="submit">Comentar</button>
      </form>
    </div>`
    )
    .join("");
}

function ccCriarPublicacao(evento) {
  evento.preventDefault();
  const campo = document.getElementById("novo-texto");
  const texto = campo.value.trim();
  if (!texto) {
    ccToast("Escreva algo antes de publicar.", "error");
    return;
  }

  const publicacoes = ccGet(CC_KEYS.publicacoes);
  publicacoes.unshift({
    id: ccProximoId(publicacoes),
    autor: ccUsuarioAtualInteracao.nome,
    texto,
    data: ccDataHojeISO(),
    comentarios: []
  });
  ccSet(CC_KEYS.publicacoes, publicacoes);

  campo.value = "";
  ccToast("Publicação criada!", "success");
  ccRenderPublicacoes();
}

function ccComentar(evento, publicacaoId) {
  evento.preventDefault();
  const input = evento.target.querySelector("input");
  const texto = input.value.trim();
  if (!texto) return false;

  const publicacoes = ccGet(CC_KEYS.publicacoes);
  const publicacao = publicacoes.find((p) => p.id === publicacaoId);
  publicacao.comentarios.push({
    autor: ccUsuarioAtualInteracao.nome,
    texto,
    data: ccDataHojeISO()
  });
  ccSet(CC_KEYS.publicacoes, publicacoes);

  ccRenderPublicacoes();
  return false;
}

document.addEventListener("DOMContentLoaded", ccInicializarInteracao);
