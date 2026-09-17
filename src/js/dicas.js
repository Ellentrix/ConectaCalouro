/* ===========================================================
   ConectaCalouro — dicas.js
   RF03 — Compartilhamento de dicas por veteranos.
   Novato: apenas visualiza. Veterano/Admin: também publicam.
   =========================================================== */

let ccUsuarioAtualDicas = null;

function ccInicializarDicas() {
  ccUsuarioAtualDicas = ccProtegerPagina();
  if (!ccUsuarioAtualDicas) return;

  ccRenderNavbar("dicas");

  const podePublicar = ["veterano", "admin"].includes(ccUsuarioAtualDicas.tipo);
  document.getElementById("bloco-form-dica").style.display = podePublicar ? "block" : "none";
  if (!podePublicar) {
    document.getElementById("aviso-permissao").style.display = "block";
  }

  document.getElementById("filtro-categoria").addEventListener("change", ccRenderDicas);

  const form = document.getElementById("form-dica");
  if (form) form.addEventListener("submit", ccPublicarDica);

  ccRenderDicas();
}

function ccRenderDicas() {
  const filtro = document.getElementById("filtro-categoria").value;
  const dicas = ccGet(CC_KEYS.dicas)
    .slice()
    .sort((a, b) => (a.data < b.data ? 1 : -1))
    .filter((d) => !filtro || d.categoria === filtro);

  const lista = document.getElementById("lista-dicas");

  if (dicas.length === 0) {
    lista.innerHTML = `<div class="empty-state">Nenhuma dica encontrada para este filtro.</div>`;
    return;
  }

  lista.innerHTML = dicas
    .map(
      (d) => `
    <div class="item-card">
      <span class="tag">${ccEscapeHtml(d.categoria)}</span>
      <h3>${ccEscapeHtml(d.titulo)}</h3>
      <p class="desc">${ccEscapeHtml(d.conteudo)}</p>
      <div class="meta">por ${ccEscapeHtml(d.autor)} em ${ccFormatarData(d.data)}</div>
      <div class="actions">
        <button class="btn btn-sm btn-outline" onclick="ccDenunciar('dica', ${d.id}, '${ccEscapeHtml(d.titulo).replace(/'/g, "\\'")}')">Denunciar</button>
      </div>
    </div>`
    )
    .join("");
}

function ccPublicarDica(evento) {
  evento.preventDefault();
  const titulo = document.getElementById("dica-titulo").value.trim();
  const categoria = document.getElementById("dica-categoria").value.trim();
  const conteudo = document.getElementById("dica-conteudo").value.trim();

  if (!titulo || !categoria || !conteudo) {
    ccToast("Preencha todos os campos da dica.", "error");
    return;
  }

  const dicas = ccGet(CC_KEYS.dicas);
  dicas.unshift({
    id: ccProximoId(dicas),
    titulo,
    categoria,
    conteudo,
    autor: ccUsuarioAtualDicas.nome,
    data: ccDataHojeISO()
  });
  ccSet(CC_KEYS.dicas, dicas);

  document.getElementById("form-dica").reset();
  ccToast("Dica publicada com sucesso!", "success");
  ccRenderDicas();
}

document.addEventListener("DOMContentLoaded", ccInicializarDicas);
