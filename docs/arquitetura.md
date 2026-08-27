# Relatório de Arquitetura e Modelagem - ConectaCalouro

Este documento detalha a rastreabilidade do projeto, as regras de negócio, a estrutura de permissões (RBAC) e os diagramas de modelagem do sistema ConectaCalouro.

---

## 1. Rastreabilidade e Gestão Ágil

- **Quadro Kanban no Trello:** https://trello.com/b/h671ZNLU/conectacalouro-etapa2
- **Repositório e Issues no GitHub:** https://github.com/Ellentrix/ConectaCalouro/issues

---

## 2. Matriz RBAC / Regras de Negócio

Tabela de permissões dos usuários do sistema:

| Ação | Aluno Novato | Aluno Veterano | Administrador |
|---|---|---|---|
| Criar conta / login | ✅ | ✅ | ✅ |
| Visualizar materiais de disciplinas | ✅ | ✅ | ✅ |
| Compartilhar materiais de estudo | ❌ | ✅ | ✅ |
| Publicar dicas para calouros | ❌ | ✅ | ✅ |
| Comentar em postagens | ✅ | ✅ | ✅ |
| Denunciar conteúdo inadequado | ✅ | ✅ | ✅ |
| Moderar/remover conteúdo denunciado | ❌ | ❌ | ✅ |
| Gerenciar usuários | ❌ | ❌ | ✅ |

---

## 3. Regras de Negócio e Segurança

- **Publicação de Conteúdo:** Apenas alunos veteranos e administradores podem compartilhar materiais de estudo ou publicar dicas; alunos novatos podem apenas visualizar e comentar.
- **Moderação Obrigatória:** Nenhuma postagem é publicada automaticamente sem passar antes por validação do sistema de moderação de conteúdo.
- **Política de Denúncias:** Qualquer usuário pode denunciar um conteúdo, mas apenas o administrador tem permissão para removê-lo.
- **Restrição de Acesso:** Apenas o administrador possui acesso total para gerenciar usuários e alterar a estrutura do sistema.

---

## 4. Fluxograma do Processo de Uso

```mermaid
flowchart TD
    A[Aluno acessa a plataforma] --> B{Já possui conta?}
    B -- Não --> C[Cadastro: nome, e-mail, curso/turma]
    B -- Sim --> D[Login]
    C --> D
    D --> E[Tela inicial / Feed]
    E --> F[Buscar materiais por disciplina]
    E --> G[Ver dicas de veteranos]
    E --> H[Espaço de interação entre alunos]
    F --> I[Visualizar/baixar material]
    G --> J[Curtir/comentar dica]
    H --> K[Enviar mensagem ou postagem]
    K --> L{Conteúdo aprovado na moderação?}
    L -- Sim --> M[Conteúdo publicado no feed]
    L -- Não --> N[Conteúdo bloqueado/sinalizado]
```

---

## 5. Modelo de Dados (DER)

```mermaid
erDiagram
    USUARIO ||--o{ POSTAGEM : cria
    USUARIO ||--o{ COMENTARIO : escreve
    USUARIO ||--o{ MATERIAL : compartilha
    DISCIPLINA ||--o{ MATERIAL : possui
    DISCIPLINA ||--o{ POSTAGEM : referencia
    POSTAGEM ||--o{ COMENTARIO : recebe
    POSTAGEM ||--o{ DENUNCIA : pode_ter

    USUARIO {
        int id
        string nome
        string email
        string tipo
        string curso_turma
    }
    DISCIPLINA {
        int id
        string nome
        string professor
    }
    MATERIAL {
        int id
        string titulo
        string arquivo_url
        date data_envio
    }
    POSTAGEM {
        int id
        string conteudo
        date data_criacao
        string status_moderacao
    }
    COMENTARIO {
        int id
        string texto
        date data_criacao
    }
    DENUNCIA {
        int id
        string motivo
        string status
    }
```
