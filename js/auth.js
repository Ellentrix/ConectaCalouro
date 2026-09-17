/* ===========================================================
   ConectaCalouro — auth.js
   Simulação de autenticação 100% no front-end (sem servidor).
   Os "logins" e "sessões" são apenas registros no localStorage
   do navegador — não há segurança real, apenas para fins
   didáticos/apresentação em sala, conforme documentado em
   docs/arquitetura.md.
   =========================================================== */

function ccCadastrarUsuario(nome, email, senha, tipo) {
  const usuarios = ccGet(CC_KEYS.usuarios);

  const emailExiste = usuarios.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (emailExiste) {
    return { ok: false, mensagem: "Já existe uma conta cadastrada com este e-mail." };
  }

  const novoUsuario = {
    id: ccProximoId(usuarios),
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    senha: senha,
    tipo: tipo, // 'novato' | 'veterano'
    ativo: true
  };

  usuarios.push(novoUsuario);
  ccSet(CC_KEYS.usuarios, usuarios);
  return { ok: true, usuario: novoUsuario };
}

function ccLogin(email, senha) {
  const usuarios = ccGet(CC_KEYS.usuarios);
  const usuario = usuarios.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.senha === senha
  );

  if (!usuario) {
    return { ok: false, mensagem: "E-mail ou senha incorretos." };
  }
  if (!usuario.ativo) {
    return { ok: false, mensagem: "Esta conta foi desativada pelo administrador." };
  }

  localStorage.setItem(CC_KEYS.sessao, String(usuario.id));
  return { ok: true, usuario };
}

function ccLogout() {
  localStorage.removeItem(CC_KEYS.sessao);
  window.location.href = "login.html";
}

function ccUsuarioLogado() {
  const id = localStorage.getItem(CC_KEYS.sessao);
  if (!id) return null;
  const usuarios = ccGet(CC_KEYS.usuarios);
  const usuario = usuarios.find((u) => u.id === Number(id));
  if (!usuario || !usuario.ativo) return null;
  return usuario;
}

/**
 * Protege uma página: se não houver usuário logado, redireciona para o login.
 * Se `tiposPermitidos` for informado e o tipo do usuário não estiver na lista,
 * redireciona para a página inicial (acesso negado).
 */
function ccProtegerPagina(tiposPermitidos) {
  const usuario = ccUsuarioLogado();
  if (!usuario) {
    window.location.href = "login.html";
    return null;
  }
  if (tiposPermitidos && !tiposPermitidos.includes(usuario.tipo)) {
    window.location.href = "inicio.html";
    return null;
  }
  return usuario;
}

function ccRotuloTipo(tipo) {
  return { novato: "Aluno Novato", veterano: "Aluno Veterano", admin: "Administrador" }[tipo] || tipo;
}
