# Registro de Testes — ConectaCalouro (Etapa 3)

Testes manuais executados abrindo o site (`src/index.html`) em um navegador,
usando as contas de demonstração criadas por `dados.js`:

- Novato: `novato@teste.com` / `123456`
- Veterano: `veterano@teste.com` / `123456`
- Administrador: `admin@teste.com` / `admin123`

| Nº | Teste | Passos | Resultado esperado | Resultado obtido |
|---|---|---|---|---|
| T01 | Cadastro de usuário | Acessar `cadastro.html`, preencher nome, e-mail, senha e tipo "Novato", enviar o formulário | Usuário cadastrado e redirecionado para o login | ✅ Aprovado |
| T02 | Cadastro com e-mail duplicado | Tentar cadastrar novamente com `novato@teste.com` | Sistema exibe mensagem de erro e não cria usuário duplicado | ✅ Aprovado |
| T03 | Login correto | Em `login.html`, entrar com `veterano@teste.com` / `123456` | Usuário entra no sistema e é redirecionado para `inicio.html` | ✅ Aprovado |
| T04 | Login incorreto | Entrar com e-mail válido e senha errada | Sistema exibe mensagem "E-mail ou senha incorretos" e mantém o usuário na tela de login | ✅ Aprovado |
| T05 | Novato visualiza materiais | Logar como novato e acessar `materiais.html` | Lista de materiais aparece normalmente, com filtro por disciplina | ✅ Aprovado |
| T06 | Novato tenta publicar material | Logar como novato e acessar `materiais.html` | Formulário de publicação fica oculto; aviso informando que só veteranos/admin podem publicar | ✅ Aprovado |
| T07 | Veterano publica material | Logar como veterano, preencher e enviar o formulário em `materiais.html` | Novo material aparece imediatamente na lista, com autor e data corretos | ✅ Aprovado |
| T08 | Veterano publica dica | Logar como veterano e publicar uma dica em `dicas.html` | Dica criada e listada, com filtro por categoria funcionando | ✅ Aprovado |
| T09 | Novato participa do mural | Logar como novato, publicar uma mensagem e comentar em uma publicação existente em `interacao.html` | Publicação e comentário aparecem no mural imediatamente | ✅ Aprovado |
| T10 | Usuário denuncia conteúdo | Em qualquer tela de conteúdo (materiais, dicas ou mural), clicar em "Denunciar" e informar um motivo | Denúncia registrada com status "pendente", mensagem de confirmação exibida | ✅ Aprovado |
| T11 | Administrador visualiza denúncias | Logar como admin e acessar a aba "Denúncias" em `admin.html` | Lista de denúncias pendentes é exibida, incluindo a denúncia de exemplo pré-cadastrada | ✅ Aprovado |
| T12 | Administrador remove conteúdo denunciado | Em `admin.html`, clicar em "Remover conteúdo" em uma denúncia pendente | Conteúdo denunciado desaparece da tela correspondente (materiais/dicas/mural) e a denúncia passa para "resolvida" | ✅ Aprovado |
| T13 | Administrador gerencia usuários | Em `admin.html`, aba "Usuários", clicar em "Desativar" em um usuário | Usuário passa a "Desativado"; ao tentar logar com essa conta, o sistema bloqueia o acesso | ✅ Aprovado |
| T14 | Acesso negado à área administrativa | Logar como novato ou veterano e tentar abrir `admin.html` diretamente pela URL | Usuário é redirecionado automaticamente para `inicio.html` | ✅ Aprovado |
| T15 | Acesso negado sem login | Sem estar logado, tentar abrir `materiais.html`, `dicas.html`, `interacao.html`, `perfil.html` ou `admin.html` diretamente pela URL | Usuário é redirecionado automaticamente para `login.html` | ✅ Aprovado |
| T16 | Logout | Logado em qualquer perfil, clicar em "Sair" no menu (ou em "Sair da conta" no perfil) | Sessão encerrada e usuário redirecionado para `login.html` | ✅ Aprovado |
| T17 | Responsividade | Reduzir a largura da janela do navegador (ou abrir em um celular) | Menu, cards e formulários se reorganizam sem quebrar o layout | ✅ Aprovado |

## Observações

- Todos os testes foram feitos manualmente, navegando pelo site com o
  DevTools do navegador aberto para conferir o conteúdo salvo em
  `localStorage` durante cada ação.
- Como não há backend, "aprovado" significa que o comportamento esperado foi
  observado na interface e confirmado nos dados salvos em `localStorage`.
- Antes de repetir os testes do zero, é possível limpar todos os dados de
  demonstração apagando o `localStorage` do site (no DevTools: **Application
  → Local Storage → clique com o botão direito → Clear**) e recarregando a
  página — os dados de exemplo são recriados automaticamente.
