Plataforma de integração e apoio para novos alunos — Projeto Integrador II (curso técnico de informática) · Etapa 3 — Execução, validação e entrega final.

## Problema
Alunos que ingressam em uma nova escola ou instituição podem ter dificuldades para se adaptar, conhecer outros alunos, entender a rotina das disciplinas, saber como alguns professores trabalham e encontrar materiais de estudo.

A ideia é criar uma plataforma que ajude os alunos novatos nesse processo de adaptação. Nela, alunos veteranos poderão compartilhar dicas, materiais de estudo e informações sobre as disciplinas, aulas e avaliações, ajudando os novos alunos a chegarem mais preparados e menos perdidos. A plataforma também terá um espaço de interação entre os alunos, facilitando que os novatos conheçam outros estudantes e possam criar novas amizades. Além disso, será planejada uma forma de manter a plataforma segura, evitando conteúdos e conversas que não estejam relacionados ao ambiente escolar.

## Objetivo
Facilitar a adaptação dos alunos novos, ajudando tanto no aspecto acadêmico quanto na integração com outros estudantes.

## Público-alvo
Alunos novos e veteranos de escolas, instituições ou cursos.

## Funcionalidades previstas
- Compartilhamento de materiais de estudo;
- Compartilhamento de dicas e informações por alunos veteranos;
- Informações sobre disciplinas, aulas e avaliações;
- Espaços para interação entre os alunos;
- Mecanismos de segurança e controle dos conteúdos compartilhados.

## Órgãos transversais
O site foi desenvolvido 100% front-end, sem backend, sem servidor e sem banco de dados reais:

- HTML5
- CSS3 (frameworks puros e sem)
- JavaScript (puro/vanilla, sem bibliotecas externas)
- localStorage do navegador para simular a persistência dos dados durante a demonstração/apresentação

Nas etapas anteriores do projeto, planejava-se usar Firebase (Authentication + Firestore). Na Etapa 3 essa decisão foi revista para simplificar a entrega, eliminando dependências externas, sem perder nenhuma das funcionalidades planejadas. Detalhes em docs/arquitetura.md.

## Como executar o projeto

O site já está publicado e pode ser acessado diretamente, sem precisar instalar nada:

🔗 **Acesse aqui:** https://ellentrix.github.io/ConectaCalouro/src/html/index.html

Navegue pelo site normalmente: criar conta, entrar, ver materiais, dicas e o mural.

### Executando localmente (opcional)

1. Baixe/clone este repositório.
2. Abra a pasta `src/html/` e clique duas vezes em `index.html`.
3. Navegue pelo site normalmente.

## Contas de demonstração
Os dados de exemplo (usuários, materiais, dicas, publicações e uma denúncia) são gerados automaticamente na primeira vez que o site é aberto.

| Perfil | E-mail | Senha |
|---|---|---|
| Aluno Novato | novato@teste.com | 123456 |
| Aluno Veterano | veterano@teste.com | 123456 |
| Administrador | admin@teste.com | admin123 |

## Funcionalidades
- Cadastro e login simulados (RF01);
- Materiais de estudo por disciplina, com publicação restrita a veteranos/admin (RF02, RF04);
- Dicas para calouros por categoria, com publicação restrita a veteranos/admin (RF03);
- Mural de interação, aberto a todos os perfis logados (RF05);
- Denúncia de conteúdo por qualquer usuário logado, com moderação restrita ao administrador (RF06);
- Painel administrativo para gerenciamento de usuários e avaliação de denúncias.

Veja a lista completa de requisitos e regras de negócio em docs/requisitos.md.

## Estrutura do projeto

ConectaCalouro/
├── src/            → código-fonte do site (HTML, CSS, JS)
├── docs/           → documentação (requisitos, arquitetura, testes)
└── README.md

Estrutura detalhada e modelo de dados em docs/arquitetura.md.

## Testes
Os testes manuais realizados (cadastro, login, permissões por tipo de usuário, denúncia, moderação, responsividade etc.) estão registrados em docs/testes.md.

## Documentação relacionada
- Trello (planejamento ágil — Etapa 2): https://trello.com/b/h671ZNLU/conectacalouro-etapa2
- Problemas relatados no GitHub: https://github.com/Ellentrix/ConectaCalouro/issues
