/* ===========================================================
   ConectaCalouro — dados.js
   Camada de "banco de dados" simulado com localStorage.
   Nenhum servidor, nenhum banco real: tudo fica salvo no
   navegador do usuário (localStorage), conforme exigido
   pela Etapa 3 (site 100% front-end).
   =========================================================== */

const CC_KEYS = {
  usuarios: "cc_usuarios",
  materiais: "cc_materiais",
  dicas: "cc_dicas",
  publicacoes: "cc_publicacoes",
  denuncias: "cc_denuncias",
  sessao: "cc_usuarioLogadoId",
  seed: "cc_seed_v1"
};

// ---------- Funções genéricas de leitura/escrita ----------
function ccGet(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}
function ccSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function ccProximoId(lista) {
  return lista.length ? Math.max(...lista.map((i) => i.id)) + 1 : 1;
}
function ccDataHojeISO() {
  return new Date().toISOString().slice(0, 10);
}
function ccFormatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

// ---------- Inicialização dos dados de demonstração ----------
function ccInicializarDados() {
  if (localStorage.getItem(CC_KEYS.seed)) return; // já inicializado

  const usuarios = [
    { id: 1, nome: "Ana Novata", email: "novato@teste.com", senha: "123456", tipo: "novato", ativo: true },
    { id: 2, nome: "Bruno Veterano", email: "veterano@teste.com", senha: "123456", tipo: "veterano", ativo: true },
    { id: 3, nome: "Admin do Sistema", email: "admin@teste.com", senha: "admin123", tipo: "admin", ativo: true },
    { id: 4, nome: "Carla Veterana", email: "carla@teste.com", senha: "123456", tipo: "veterano", ativo: true }
  ];

  const materiais = [
    { id: 1, titulo: "Resumo de Funções do 1º grau", disciplina: "Matemática", categoria: "Resumo",
      descricao: "Resumo com fórmulas, exemplos resolvidos e exercícios comentados sobre funções afins.",
      autor: "Bruno Veterano", data: "2026-08-10" },
    { id: 2, titulo: "Roteiro de leitura — Dom Casmurro", disciplina: "Português", categoria: "Roteiro",
      descricao: "Guia de leitura capítulo a capítulo, com os pontos mais cobrados em prova.",
      autor: "Carla Veterana", data: "2026-08-14" },
    { id: 3, titulo: "Linha do tempo — Brasil República", disciplina: "História", categoria: "Esquema",
      descricao: "Linha do tempo com os principais períodos da República brasileira.",
      autor: "Bruno Veterano", data: "2026-08-18" },
    { id: 4, titulo: "Mapas para prova de Geografia", disciplina: "Geografia", categoria: "Material de apoio",
      descricao: "Coletânea de mapas político e físico usados nas últimas avaliações.",
      autor: "Carla Veterana", data: "2026-08-20" },
    { id: 5, titulo: "Lógica de programação — exercícios", disciplina: "Informática", categoria: "Lista de exercícios",
      descricao: "Lista de exercícios básicos de lógica para quem está começando a programar.",
      autor: "Bruno Veterano", data: "2026-08-22" }
  ];

  const dicas = [
    { id: 1, titulo: "Como organizar os estudos na primeira semana", categoria: "Organização",
      conteudo: "Comece anotando o horário de todas as disciplinas e separe um caderno (ou app) só para tarefas e provas. Nos primeiros dias, o mais importante é entender a rotina, não decorar conteúdo.",
      autor: "Bruno Veterano", data: "2026-08-05" },
    { id: 2, titulo: "Como se adaptar mais rápido à escola nova", categoria: "Adaptação",
      conteudo: "Chegue um pouco mais cedo nos primeiros dias, participe dos grupos de turma e não tenha vergonha de perguntar para os veteranos — quase todo mundo lembra como é ser novato.",
      autor: "Carla Veterana", data: "2026-08-06" },
    { id: 3, titulo: "Dicas para a prova de Matemática", categoria: "Disciplinas",
      conteudo: "Refaça os exercícios de sala antes de tentar os novos. A maioria das provas segue o mesmo padrão dos exemplos trabalhados em aula.",
      autor: "Bruno Veterano", data: "2026-08-09" },
    { id: 4, titulo: "Organização para época de provas", categoria: "Organização",
      conteudo: "Divida o conteúdo em blocos menores e estude um pouco todo dia, em vez de tentar ver tudo na véspera. Revisões curtas e frequentes funcionam melhor.",
      autor: "Carla Veterana", data: "2026-08-12" },
    { id: 5, titulo: "Rotina escolar saudável", categoria: "Rotina",
      conteudo: "Durma bem antes das aulas e reserve um horário fixo do dia só para estudar. Rotina previsível reduz o estresse nas primeiras semanas.",
      autor: "Bruno Veterano", data: "2026-08-15" }
  ];

  const publicacoes = [
    { id: 1, autor: "Bruno Veterano", texto: "Pessoal, quem também é novo na turma de Informática pode chamar aqui que a gente forma um grupo de estudos! 🙂", data: "2026-08-11",
      comentarios: [
        { autor: "Ana Novata", texto: "Eu topo! Ainda estou perdida com os horários.", data: "2026-08-11" }
      ] },
    { id: 2, autor: "Ana Novata", texto: "Alguém sabe se a prova de Geografia vai ser com consulta?", data: "2026-08-19",
      comentarios: [
        { autor: "Carla Veterana", texto: "Ano passado não foi, mas vale confirmar com o professor.", data: "2026-08-19" }
      ] },
    { id: 3, autor: "Carla Veterana", texto: "Bem-vindos, calouros! Qualquer dúvida sobre a escola podem postar aqui no mural. 🎉", data: "2026-08-01", comentarios: [] }
  ];

  const denuncias = [
    { id: 1, tipo: "publicacao", conteudoId: 2, tituloConteudo: "Alguém sabe se a prova de Geografia vai ser com consulta?",
      usuarioDenunciante: "Bruno Veterano", motivo: "Denúncia de teste para demonstração do painel administrativo.",
      data: "2026-08-19", status: "pendente" }
  ];

  ccSet(CC_KEYS.usuarios, usuarios);
  ccSet(CC_KEYS.materiais, materiais);
  ccSet(CC_KEYS.dicas, dicas);
  ccSet(CC_KEYS.publicacoes, publicacoes);
  ccSet(CC_KEYS.denuncias, denuncias);
  localStorage.setItem(CC_KEYS.seed, "1");
}

// Executa a inicialização assim que o arquivo é carregado em qualquer página.
ccInicializarDados();
