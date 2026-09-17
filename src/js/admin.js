/* ===========================================================
   ConectaCalouro — admin.js
   RF06 / RNF01 — Painel administrativo: gerenciar usuários e
   moderar (remover) conteúdos denunciados. Acesso restrito ao
   tipo "admin" (ccProtegerPagina cuida disso).
   =========================================================== */

let ccUsuarioAtualAdmin = null;

function ccInicializarAdmin() {
  ccUsuarioAtualAdmin = ccProtegerPagina(["admin"]);
  if (!ccUsuarioAtualAdmin) return;

  ccRenderNavbar("admin");
  ccRenderUsuariosAdmin();
  ccRenderDenunciasAdmin();

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

// ---------- Usuários ----------
function ccRenderUsuariosAdmin() {
  const usuarios = ccGet(CC_KEYS.usuarios);
  const corpo = document.getElementById("tabela-usuarios");

  corpo.innerHTML = usuarios
    .map(
      (u) => `
    <tr>
      <td>${ccEscapeHtml(u.nome)}</td>
      <td>${ccEscapeHtml(u.email)}</td>
      <td><span class="badge-tipo badge-${u.tipo}">${ccRotuloTipo(u.tipo)}</span></td>
      <td>${u.ativo ? '<span style="color:var(--success);font-weight:700;">Ativo</span>' : '<span style="color:var(--danger);font-weight:700;">Desativado</span>'}</td>
      <td>
        ${
          u.tipo === "admin"
            ? '<span style="color:var(--muted);font-size:0.8rem;">—</span>'
            : `<button class="btn btn-sm ${u.ativo ? "btn-danger" : "btn-success"}" onclick="ccAlternarUsuario(${u.id})">
                ${u.ativo ? "Desativar" : "Ativar"}
              </button>`
        }
      </td>
    </tr>`
    )
    .join("");
}

function ccAlternarUsuario(id) {
  const usuarios = ccGet(CC_KEYS.usuarios);
  const usuario = usuarios.find((u) => u.id === id);
  usuario.ativo = !usuario.ativo;
  ccSet(CC_KEYS.usuarios, usuarios);
  ccToast(`Usuário ${usuario.ativo ? "ativado" : "desativado"}.`, "success");
  ccRenderUsuariosAdmin();
}

// ---------- Denúncias ----------
function ccRenderDenunciasAdmin() {
  const denuncias = ccGet(CC_KEYS.denuncias).slice().sort((a, b) => (a.data < b.data ? 1 : -1));
  const lista = document.getElementById("lista-denuncias");

  if (denuncias.length === 0) {
    lista.innerHTML = `<div class="empty-state">Nenhuma denúncia registrada.</div>`;
    return;
  }

  lista.innerHTML = denuncias
    .map(
      (d) => `
    <div class="item-card">
      <span class="tag">${ccEscapeHtml(d.tipo)}</span>
      <h3>${ccEscapeHtml(d.tituloConteudo)}</h3>
      <p class="desc"><b>Motivo:</b> ${ccEscapeHtml(d.motivo)}</p>
      <div class="meta">Denunciado por ${ccEscapeHtml(d.usuarioDenunciante)} em ${ccFormatarData(d.data)} —
        Status: <span class="status-${d.status}">${d.status === "pendente" ? "Pendente" : "Resolvida"}</span>
      </div>
      ${
        d.status === "pendente"
          ? `<div class="actions">
              <button class="btn btn-sm btn-danger" onclick="ccRemoverConteudoDenunciado(${d.id})">Remover conteúdo</button>
              <button class="btn btn-sm btn-outline" onclick="ccDispensarDenuncia(${d.id})">Marcar como resolvida</button>
            </div>`
          : ""
      }
    </div>`
    )
    .join("");
}

const CC_KEY_POR_TIPO = {
  material: CC_KEYS.materiais,
  dica: CC_KEYS.dicas,
  publicacao: CC_KEYS.publicacoes
};

function ccRemoverConteudoDenunciado(denunciaId) {
  const denuncias = ccGet(CC_KEYS.denuncias);
  const denuncia = denuncias.find((d) => d.id === denunciaId);
  if (!denuncia) return;

  const chave = CC_KEY_POR_TIPO[denuncia.tipo];
  if (chave) {
    const lista = ccGet(chave).filter((item) => item.id !== denuncia.conteudoId);
    ccSet(chave, lista);
  }

  denuncia.status = "resolvida";
  ccSet(CC_KEYS.denuncias, denuncias);
  ccToast("Conteúdo removido e denúncia resolvida.", "success");
  ccRenderDenunciasAdmin();
}

function ccDispensarDenuncia(denunciaId) {
  const denuncias = ccGet(CC_KEYS.denuncias);
  const denuncia = denuncias.find((d) => d.id === denunciaId);
  denuncia.status = "resolvida";
  ccSet(CC_KEYS.denuncias, denuncias);
  ccToast("Denúncia marcada como resolvida (conteúdo mantido).", "success");
  ccRenderDenunciasAdmin();
}

document.addEventListener("DOMContentLoaded", ccInicializarAdmin);
