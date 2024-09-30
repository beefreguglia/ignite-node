# API de transações pessoais

> Esse projeto é referente ao desenvolvimento de uma API para dieta diária. Ele foi desenvolvido durante o curso Ignite - Node.js da rocketseat.

## 💻 Tecnologias

- Node.Js
- Typescript
- Fastify
- Tsx
- Eslint
- Knex
- Sqlite3
- Dotenv
- Zod
- Vitest
- Supertest
- Tsup

## Requisitos funcionais

- [x] Deve ser possível criar um usuário;
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta

## Regras de negócio

- [x] Deve ser possível identificar o usuário entre as requisições
- [x] As refeições devem ser relacionadas a um usuário.
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Testes e2e

