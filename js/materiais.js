/* ===========================================================
   ConectaCalouro — materiais.js
   RF02 — Compartilhamento de materiais de estudo.
   Novato: apenas visualiza. Veterano/Admin: também publicam.
   =========================================================== */

let ccUsuarioAtualMateriais = null;

function ccInicializarMateriais() {
  ccUsuarioAtualMateriais = ccProtegerPagina();
  if (!ccUsuarioAtualMateriais) return;

  ccRenderNavbar("materiais");

  const podePublicar = ["veterano", "admin"].includes(ccUsuarioAtualMateriais.tipo);
  document.getElementById("bloco-form-material").style.display = podePublicar ? "block" : "none";
  if (!podePublicar) {
    document.getElementById("aviso-permissao").style.display = "block";
  }

  document.getElementById("filtro-disciplina").addEventListener("change", ccRenderMateriais);

  const form = document.getElementById("form-material");
  if (form) form.addEventListener("submit", ccPublicarMaterial);

  ccRenderMateriais();
}

function ccRenderMateriais() {
  const filtro = document.getElementById("filtro-disciplina").value;
  const materiais = ccGet(CC_KEYS.materiais)
    .slice()
    .sort((a, b) => (a.data < b.data ? 1 : -1))
    .filter((m) => !filtro || m.disciplina === filtro);

  const lista = document.getElementById("lista-materiais");

  if (materiais.length === 0) {
    lista.innerHTML = `<div class="empty-state">Nenhum material encontrado para este filtro.</div>`;
    return;
  }

  lista.innerHTML = materiais
    .map(
      (m) => `
    <div class="item-card">
      <span class="tag">${ccEscapeHtml(m.disciplina)}</span>
      <h3>${ccEscapeHtml(m.titulo)}</h3>
      <p class="desc">${ccEscapeHtml(m.descricao)}</p>
      <div class="meta">Categoria: ${ccEscapeHtml(m.categoria)} · por ${ccEscapeHtml(m.autor)} em ${ccFormatarData(m.data)}</div>
      <div class="actions">
        <button class="btn btn-sm btn-outline" onclick="ccDenunciar('material', ${m.id}, '${ccEscapeHtml(m.titulo).replace(/'/g, "\\'")}')">Denunciar</button>
      </div>
    </div>`
    )
    .join("");
}

function ccPublicarMaterial(evento) {
  evento.preventDefault();
  const titulo = document.getElementById("mat-titulo").value.trim();
  const disciplina = document.getElementById("mat-disciplina").value;
  const categoria = document.getElementById("mat-categoria").value.trim();
  const descricao = document.getElementById("mat-descricao").value.trim();

  if (!titulo || !disciplina || !categoria || !descricao) {
    ccToast("Preencha todos os campos do material.", "error");
    return;
  }

  const materiais = ccGet(CC_KEYS.materiais);
  materiais.unshift({
    id: ccProximoId(materiais),
    titulo,
    disciplina,
    categoria,
    descricao,
    autor: ccUsuarioAtualMateriais.nome,
    data: ccDataHojeISO()
  });
  ccSet(CC_KEYS.materiais, materiais);

  document.getElementById("form-material").reset();
  ccToast("Material publicado com sucesso!", "success");
  ccRenderMateriais();
}

document.addEventListener("DOMContentLoaded", ccInicializarMateriais);
